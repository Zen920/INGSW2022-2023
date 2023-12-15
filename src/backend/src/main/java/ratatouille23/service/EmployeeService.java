package ratatouille23.service;

import database.CustomInterfaces.CategoryCount;
import database.CustomInterfaces.DateCount;
import database.Entities.Employee;
import database.Entities.Role;
import database.Enums.EmployeeRole;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ratatouille23.controllers.AdminController;
import ratatouille23.entities.ChangePasswordModel;
import ratatouille23.entities.LoginModel;
import ratatouille23.exception.*;
import ratatouille23.repositories.EmployeeRepository;
import ratatouille23.repositories.RoleRepository;
import ratatouille23.security.JwtTokenGenerator;
import utility.RandomString;

import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

import static utility.ResponseEntityErrorCodes.EMPLOYEE_PASSWORD_LENGTH;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService extends GenericService<Employee, Long> implements UserDetailsService {
	private final EmployeeRepository employeeRepository;

	private final JwtTokenGenerator jwtTokenGenerator;

	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	private final static int defaultPasswordLength = 8;
	private final static int maxPasswordLength = 20;

	private final static String accessCookieName = "accessToken";
	private final static String refreshCookieName = "refreshToken";
	private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

	@Override
	protected EmployeeRepository repository() {
		return employeeRepository;
	}

	@Value("${ratato.jwt.expiration}")
	private long expiration;

	@Value("${ratato.jwt.refreshExpiration}")
	private long refreshExpiration;

	private String extIp	=  System.getenv("RATATO_IP");
	private String ip			= (extIp != null) ? extIp : "localhost";

	@Override
	public UserDetails loadUserByUsername(String username) throws AuthenticationException {
		Employee employee = retrieveAuthenticatedUser(username);
		if (employee == null || !(employee.getAccountNonLocked() && employee.getEnabled() && employee.getAccountNonExpired()))
			throw new UsernameNotFoundException("errors.employee.notFound");
		return new User(employee.getUsername(), employee.getPassword(), true, true,
				true, true, mapRolesToAuthorities(Collections.singletonList(employee.getRole())));
	}

	private Collection<GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
		return roles.stream().map(role ->
						new SimpleGrantedAuthority(role.getEmployeeRole()
								.toString()))
				.collect(Collectors.toList());
	}

	/* Register a new employee by providing a username a role.
	Generated password is set by default as a random 8 chars string, following a set pattern
	*/
	public String registerNewUserAccount(String username, Role selectedRole) {
		if (employeeRepository.existsByUsername(username))
			throw new EmployeeAlreadyExistsException();
		if (selectedRole == null || !roleRepository.existsById(selectedRole.getIdRole()))
			throw new RoleNotFoundException();
		final String token = RandomString.AlphaNumeric(defaultPasswordLength);
		saveAndValidate(new Employee(username, token, selectedRole));
		return token;
	}

	/*
		Retrieve a user by his username
	 */
	public Employee retrieveAuthenticatedUser(String username) {
		return employeeRepository.findEmployeeByUsername(username);
	}


	/*
		Change password by providing a username and a filled ChangePasswordModel containing old and new password.
		Password will be validated and properly updated otherwise an appropriate exception will be thrown.
	 */
	public Employee changePassword(String username, ChangePasswordModel changePasswordModel) {
		Employee employee = employeeRepository.findEmployeeByUsername(username);
		if (!passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword()))
			throw new PasswordMismatchException();

		// Check if the current password is equal to the new password
		if (passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword()))
			throw new PasswordMatchException();

		employee.setPassword(changePasswordModel.getNewpw());
		validatePasswordBeforeEncoding(changePasswordModel, employee);

		// New password is set, employee is activated
		employee.setPassword(passwordEncoder.encode(changePasswordModel.getNewpw()));
		employee.setPasswordResetted(true);
		return saveAndValidate(employee);
	}

	/*
		Validate new password before it gets updated.
	 */
	private void validatePasswordBeforeEncoding(ChangePasswordModel changePasswordModel, Employee employee) {
		String errors = validate(employee);
		if(!errors.isBlank()){
			throw new IllegalArgumentException(errors);
		}

		if (changePasswordModel.getNewpw().length() > maxPasswordLength ) {
			throw new IllegalArgumentException(EMPLOYEE_PASSWORD_LENGTH);
		}
	}

	/*
		Login employee by providing a LoginModel (containing login information) and authenticateManager
		for enhanced security.
		If data are validated, employee will proceed with the login otherwise an appropriated error will
		be shown
	 */
	public List<String> login(LoginModel loginModel, AuthenticationManager authenticateManager) {
		try {
			Authentication authentication = authenticateManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginModel.getUsername(),
							loginModel.getPassword())
			);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			return makeJWTCookie(authentication.getName(), false);

		} catch (AuthenticationException ex) {
			Employee employee = employeeRepository.findEmployeeByUsername(loginModel.getUsername());
			if(employee == null){
				throw new EmployeeNotFoundException();
			}else{
				if(!passwordEncoder.matches(loginModel.getPassword(),employee.getPassword())){
					throw new EmployeePasswordNotValidException();
				}
				throw new EmployeeAccountIsDisabledException();
			}
		}
		//return new ResponseEntity<>(new AuthResponseModel(token, refreshToken), HttpStatus.OK);
	}

	/*
		RefreshToken when accessToken is expired. The current RefreshToken will be used and validated
		in order to generate a new pair of accessToken and RefreshToken.
		If refreshToken is invalid, employee will be logged out
	 */
	public List<String> refreshToken(HttpServletRequest request) {
		String oldRefreshToken = jwtTokenGenerator.getJwtFromHttpOnlyCookie("refreshToken", request);
		if (oldRefreshToken == null || !jwtTokenGenerator.validateToken(oldRefreshToken))
			throw new InvalidRefreshTokenException();
		String username = jwtTokenGenerator.getUsernameFromToken(oldRefreshToken);
		Employee employee = employeeRepository.findEmployeeByUsername(username);
		if (employee == null || !employee.getAccountNonExpired() || !employee.getEnabled() || !employee.getAccountNonLocked() || !employee.isCredentialsNonExpired()) {
			return makeJWTCookie(jwtTokenGenerator.getUsernameFromToken(
					jwtTokenGenerator.getJwtFromHttpOnlyCookie(refreshCookieName, request)), true);
		}
		return makeJWTCookie(username, false);
	}

	/*
		Create a new pair of accessToken and refreshToken and bundle them in the appropriate cookies to send
		to the end user.
	 */
	private List<String> makeJWTCookie(String username, boolean invalidate) {
		String token = jwtTokenGenerator.generateToken(username);
		String refreshToken = jwtTokenGenerator.generateRefreshToken(username);
		ResponseCookie accessCookie = createCookie(accessCookieName, token, invalidate, expiration);
		ResponseCookie refreshCookie = createCookie(refreshCookieName,refreshToken, invalidate, refreshExpiration);
		return new ArrayList<>(Arrays.asList(accessCookie.toString(), refreshCookie.toString()));
	}
	/*
		Create cookies with token infos provided by the parent method, such as name, value,
		invalidate (in order to force the expiration date when logging out), expiration
	 */
	private ResponseCookie createCookie(String cookieName, String value, boolean invalidate, long expiration) {
		return ResponseCookie.from(cookieName, value)
				.httpOnly(true)
				.secure(false)
				.path("/")
				.maxAge(invalidate ? 0 : expiration / 1000)
				.domain(ip)  // Comment this if you want to work on localhost
				// .domain(localIp) // uncomment this to use on localhost rather than o specific ip
				.sameSite("Strict")
						.build();
	}

	/*
		Get employee data while ensuring that the employee is valid
	 */
	public Employee getEmployeeProfile(HttpServletRequest request) {
		try {
			String refreshToken = jwtTokenGenerator.getJwtFromHttpOnlyCookie(refreshCookieName, request);
			if (refreshToken == null || refreshToken.isBlank() || !jwtTokenGenerator.validateToken(refreshToken)) {
				//return null;
				return null;
			}
			return retrieveAuthenticatedUser(jwtTokenGenerator.getUsernameFromToken(refreshToken));
		} catch (AuthenticationException ex) {
			throw new EmployeeNotFoundException();
		}
	}

	/*
		Logout by expiring the current accessToken and refreshToken
	 */
	public List<String> logout(HttpServletRequest request) {
		// Retrieve token
		// To logout via JWT you must expire the token or delete it client side. An implementation is via deny list
		// or by using a table (id, token) to blacklist it. On
			return makeJWTCookie(jwtTokenGenerator.getUsernameFromToken(
					jwtTokenGenerator.getJwtFromHttpOnlyCookie(refreshCookieName, request)), true);
	}

	public Employee findEmployeeByUsername(String username) {
		return employeeRepository.findEmployeeByUsername(username);
	}

	public List<String> fetchUpdatable(){
		return employeeRepository.findAllByRoleNot(roleRepository.findRoleByEmployeeRole(EmployeeRole.ROLE_ADMIN).getIdRole());
	}
	/*
		Disable employees by setting the appropriate parameters to on/off.
	 */
	@Transactional
	public List<Employee> disableEmployee (List<String> employees, Optional<Boolean> lockRadio) {
		List <Employee> toUpdate = employees.stream()
				.map(employeeRepository::findEmployeeByUsername).toList();
		toUpdate
				.forEach(employee -> {
					lockRadio.ifPresent(employee::setAccountNonLocked);
					lockRadio.ifPresent(employee::setEnabled);
					lockRadio.ifPresent(employee::setAccountNonExpired);
					lockRadio.ifPresent(employee::setCredentialsNonExpired);
				});
		return employeeRepository.saveAll(toUpdate);
	}
	/*
		Reset employee password by generating a new random valid password of 8 chars.
	 */
	public String resetEmployeePassword (String username) {
		Employee employee = employeeRepository.findEmployeeByUsername(username);
		if(employee == null)
			throw new EmployeeNotFoundException();
		final String token = RandomString.AlphaNumeric(defaultPasswordLength);
		employee.setPasswordResetted(false);
		employee.setPassword(passwordEncoder.encode(token));
		saveAndValidate(employee);
		return token;
	}
	public List<DateCount> getOrdersInATimeFrame (long to,  long from,  String username){
		return employeeRepository.countDishesPrepared( new java.sql.Date(from), new java.sql.Date(to),
				employeeRepository.findEmployeeByUsername(username).getIdEmployee());
	}

	public List<CategoryCount> getCategoriesPreparedInATimeFrame ( long to,  long from,  String username){
		return employeeRepository.findPreparedOfACategoryFromTo( new java.sql.Date(from),
				new Date(to), employeeRepository.findEmployeeByUsername(username).getIdEmployee());
	}

	public List<String> getAllEmployees (){
		return employeeRepository.findEmployeeByRole2(roleRepository.findRoleByEmployeeRole(EmployeeRole.ROLE_COOK).getIdRole());
	}


}
