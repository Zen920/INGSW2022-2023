package ratatouille23.controllers;

import database.Entities.Employee;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ratatouille23.entities.ChangePasswordModel;
import ratatouille23.entities.LoginModel;
import ratatouille23.entities.RegistrationModel;
import ratatouille23.repositories.RoleRepository;
import ratatouille23.service.EmployeeService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	private final AuthenticationManager authenticateManager;

	private final EmployeeService employeeService;


	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody LoginModel loginModel){
		logger.warn("Executing login");
		List<String> cookies = (employeeService.login(loginModel, authenticateManager));
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookies.get(0), cookies.get(1)).build();

		//return new ResponseEntity<>(new AuthResponseModel(token, refreshToken), HttpStatus.OK);
	}

	@GetMapping("refreshtoken")
	public ResponseEntity<?> refreshToken(HttpServletRequest request) {
		List<String> cookies = (employeeService.refreshToken(request));
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookies.get(0), cookies.get(1)).build();
	}
	@GetMapping("employee-data")
	public ResponseEntity<Employee> getEmployeeProfile(HttpServletRequest request){
		return ResponseEntity.ok(employeeService.getEmployeeProfile(request));
	}

	@PostMapping("signout")
	public ResponseEntity<?> logout(HttpServletRequest request){
		logger.warn("Executing logout");
		// Retrieve token
		// To logout via JWT you must expire the token or delete it client side. An implementation is via deny list
		// or by using a table (id, token) to blacklist it. On
		List<String> cookies = (employeeService.logout(request));
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookies.get(0), cookies.get(1)).build();
		//return makeJWTCookie(jwtTokenGenerator.getJwtFromHttpOnlyCookie("refreshToken", request), jwtTokenGenerator.getJwtFromHttpOnlyCookie("refreshToken", request),true);
	}

	@PutMapping("/changepassword")
	public ResponseEntity<?> ChangePassword(@RequestBody ChangePasswordModel changePasswordModel){
		logger.warn("Changing password");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ResponseEntity.ok(employeeService.changePassword(authentication.getName(), changePasswordModel));
	}
}
