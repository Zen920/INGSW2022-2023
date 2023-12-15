package ratatouille23.controllers;

import database.CustomInterfaces.CategoryCount;
import database.CustomInterfaces.DateCount;
import database.Entities.Employee;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratatouille23.entities.RegistrationModel;
import ratatouille23.repositories.RoleRepository;
import ratatouille23.service.EmployeeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	private final EmployeeService employeeService;
	private final RoleRepository roleRepository;

	@GetMapping("/prepared-from-to")
	public ResponseEntity<List<DateCount>> getOrdersInATimeFrame (@RequestParam long to, @RequestParam long from, @RequestParam String username){
			logger.warn("Getting all dishes prepared by a employee");
		return ResponseEntity.ok(employeeService.getOrdersInATimeFrame(to, from ,username));
	}
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegistrationModel registration){
		logger.warn("Registering new user");
		return  ResponseEntity.status(HttpStatus.CREATED).body(employeeService.registerNewUserAccount(registration.getUsername(),roleRepository.findRoleByEmployeeRole(registration.getRole())));
	}
	@GetMapping("/prepared-categories-from-to")
	public ResponseEntity<List<CategoryCount>> getCategoriesPreparedInATimeFrame (@RequestParam long to, @RequestParam long from, @RequestParam String username){
		logger.warn("Getting all categories prepared by a employee");
		return ResponseEntity.ok(employeeService.getCategoriesPreparedInATimeFrame(to, from ,username));
	}

	@GetMapping("/full-employees")
	public ResponseEntity<List<Employee>> fetchEmployees (){
		return ResponseEntity.ok(employeeService.findAll());
	}
	@GetMapping("/employees")
	public ResponseEntity<List<String>> getAllEmployees (){
		return ResponseEntity.ok(employeeService.getAllEmployees());
	}


	@GetMapping("/employees-to-update")
	public ResponseEntity<List<String>> fetchUpdatable(){
		return ResponseEntity.ok(employeeService.fetchUpdatable());
	}
	@PutMapping("/disable-employees")
	public ResponseEntity<List<Employee>> disableEmployee (@RequestBody List<String> employees, @RequestParam Optional<Boolean> lockRadio) {
		return ResponseEntity.ok(employeeService.disableEmployee(employees, lockRadio));
	}

	@PutMapping("/reset-employee-password")
	public ResponseEntity<String> resetEmployeePassword (@RequestParam String username) {
		return ResponseEntity.ok(employeeService.resetEmployeePassword(username));
	}
}
