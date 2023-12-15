package ratatouille23.service;

import database.Entities.Employee;
import database.Entities.Role;
import database.Enums.EmployeeRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ratatouille23.entities.ChangePasswordModel;
import ratatouille23.exception.EmployeeAlreadyExistsException;
import ratatouille23.exception.PasswordMatchException;
import ratatouille23.exception.PasswordMismatchException;
import ratatouille23.exception.RoleNotFoundException;
import ratatouille23.repositories.EmployeeRepository;
import ratatouille23.repositories.RoleRepository;
import utility.ResponseEntityErrorCodes;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static utility.ResponseEntityErrorCodes.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {
	Role role;
	Employee employee;

	PasswordEncoder pswEncoder = new BCryptPasswordEncoder();

	ChangePasswordModel changePasswordModel;

	@Mock
	RoleRepository roleRepository;

	@Mock
	PasswordEncoder passwordEncoder;
	@Mock
	EmployeeRepository employeeRepository;

	@InjectMocks
	private EmployeeService employeeService;

	@BeforeEach
	void setup ()
	{
		role = new Role(1L, EmployeeRole.ROLE_ADMIN);
		employee = new Employee( "username", "password", role);
		changePasswordModel = new ChangePasswordModel();
		changePasswordModel.setCurrentpw("password");
		changePasswordModel.setNewpw("Password2");
	}

	@Test
	@DisplayName("Test with valid parameters")
	void testValidRegistration() {
		when(roleRepository.existsById(role.getIdRole())).thenReturn(true);
		boolean result = assertDoesNotThrow(() -> { 		employeeService.registerNewUserAccount("username",  role);
			return true; } );
		assertTrue( result);
	}

	@Test
	@DisplayName("Test registerNewUserAccount with a null username")
	void testNullUsername() {
		when(roleRepository.existsById(any())).thenReturn(true);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.registerNewUserAccount(null, role));
		assertEquals(EMPLOYEE_USERNAME_IS_NULL+" " ,exception.getMessage());
	}

	@Test
	@DisplayName("Test registerNewUserAccount with a blank username")
	void testBlankUsername() {
		when(roleRepository.existsById(any())).thenReturn(true);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.registerNewUserAccount(" ".repeat(5), role));
		assertEquals(EMPLOYEE_USERNAME_IS_NULL+" " ,exception.getMessage());
	}

	@Test
	@DisplayName("Test registerNewUserAccount with a username whose length is less than 3 chars")
	void testLessThanThreeCharactersUsername() {
		when(roleRepository.existsById(any())).thenReturn(true);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.registerNewUserAccount("u".repeat(2), role));
		assertEquals(EMPLOYEE_USERNAME_LENGTH+" " ,exception.getMessage());
	}

	@Test
	@DisplayName("Test registerNewUserAccount with a username whose length is more than 20 chars")
	void testMoreThanTwentyCharactersUsername() {
		when(roleRepository.existsById(any())).thenReturn(true);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.registerNewUserAccount("u".repeat(21),
				role));
		assertEquals(EMPLOYEE_USERNAME_LENGTH+" ",exception.getMessage());
	}

	@Test
	@DisplayName("Test registerNewUserAccount with a null role parameter")
	void testNullRole() {
		Exception exception = assertThrows(RoleNotFoundException.class, () -> employeeService.registerNewUserAccount("username",
				null));
		assertEquals("errors.role.notFound", exception.getMessage());
	}

	@Test
	@DisplayName("Test registerNewUserAccount with a role that does not exist")
	void testInvalidRole() {
		Exception exception = assertThrows(RoleNotFoundException.class, () -> employeeService.registerNewUserAccount("username",
				new Role(5L, EmployeeRole.ROLE_ADMIN)));
		assertEquals(ROLE_NOT_FOUND, exception.getMessage());

	}
	@Test
	@DisplayName("Test registerNewUserAccount with a username that already exists")
	void testUsernameAlreadyExists() {
		when(employeeRepository.existsByUsername(any())).thenReturn(true);
		Exception exception = assertThrows(EmployeeAlreadyExistsException.class, () -> employeeService.registerNewUserAccount(null, role));
		assertEquals(EMPLOYEE_ALREADY_EXISTS ,exception.getMessage());
	}
	@Test
	@DisplayName("Test changePassword with valid parameters")
	void testChangePassword() {
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		when(passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword())).thenReturn(true);
		when(passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword())).thenReturn(false);
		when(passwordEncoder.encode(changePasswordModel.getNewpw())).thenReturn((pswEncoder.encode(changePasswordModel.getNewpw())));
		boolean result = assertDoesNotThrow(() -> { 		employeeService.changePassword("username",  changePasswordModel);
			return true; } );
		assertTrue( result);
	}

	@Test
	@DisplayName("Test changePassword with mismatching passwords")
	void testMismatchingPasswords() {
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		Exception exception = assertThrows(PasswordMismatchException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertEquals(PASSWORD_MISMATCH, exception.getMessage());
	}

	@Test
	@DisplayName("Test changePassword with current password set to null")
	void testCurrentPasswordIsNull() {
		changePasswordModel.setCurrentpw(null);
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		Exception exception = assertThrows(PasswordMismatchException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertEquals(PASSWORD_MISMATCH, exception.getMessage());
	}

	@Test
	@DisplayName("Test changePassword with blank new password ")
	void testNewPasswordIsBlank() {
		changePasswordModel.setNewpw(" ".repeat(15));
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		when(passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword())).thenReturn(true);
		when(passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword())).thenReturn(false);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertNotNull(exception.getMessage());
	}

	@Test
	@DisplayName("Test changePassword with nullnew password ")
	void testNewPasswordIsNull() {
		changePasswordModel.setNewpw(null);
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		when(passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword())).thenReturn(true);
		when(passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword())).thenReturn(false);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertNotNull(exception.getMessage());
	}


	@Test
	@DisplayName("Test changePassword with new password length is more than 20 chars")
	void testNewPasswordLengthIsMoreThanTwentyChars() {
		changePasswordModel.setNewpw("INGSWArchLinuxUser2023");
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		when(passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword())).thenReturn(true);
		when(passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword())).thenReturn(false);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertEquals(EMPLOYEE_PASSWORD_LENGTH, exception.getMessage());
	}

	@Test
	@DisplayName("Test changePassword with new password is less than 7 chars")
	void testNewPasswordLengthIsLessThanSevenChars() {
		changePasswordModel.setNewpw("Psw523");
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		when(passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword())).thenReturn(true);
		when(passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword())).thenReturn(false);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertEquals(EMPLOYEE_PASSWORD_LENGTH+" ", exception.getMessage());
	}

	@Test
	@DisplayName("Test changePassword with password not respecting pattern")
	void testNewPasswordDoesNotMatchPattern() {
		changePasswordModel.setNewpw("p".repeat(15));
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		when(passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword())).thenReturn(true);
		when(passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword())).thenReturn(false);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertEquals(EMPLOYEE_PASSWORD_PATTERN+" ", exception.getMessage());
	}


	@Test
	@DisplayName("Test changePassword with new and current password matching")
	void testNewPasswordMatchesCurrent() {
		when(employeeRepository.findEmployeeByUsername(any())).thenReturn(employee);
		when(passwordEncoder.matches(changePasswordModel.getCurrentpw(), employee.getPassword())).thenReturn(true);
		when(passwordEncoder.matches(changePasswordModel.getNewpw(), employee.getPassword())).thenReturn(true);
		Exception exception = assertThrows(PasswordMatchException.class, () -> employeeService.changePassword("username",  changePasswordModel));
		assertEquals(PASSWORD_MATCH, exception.getMessage());
	}
}
