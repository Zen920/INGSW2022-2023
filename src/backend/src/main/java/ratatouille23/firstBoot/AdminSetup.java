package ratatouille23.firstBoot;

import database.Entities.Category;
import database.Entities.Dish;
import database.Entities.Employee;
import database.Entities.Role;
import database.Enums.EmployeeRole;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import ratatouille23.repositories.EmployeeRepository;
import ratatouille23.repositories.RoleRepository;
import ratatouille23.service.CategoryService;
import ratatouille23.service.DishService;
import utility.RandomString;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


	/*@Component
@RequiredArgsConstructor
public class AdminSetup implements ApplicationListener<ContextRefreshedEvent> {
	private static final Logger logger = LoggerFactory.getLogger(AdminSetup.class);

	boolean isConfigured = false;
	private final EmployeeRepository employeeRepository;
	private final RoleRepository roleRepository;

	private final CategoryService categoryService;
	private final DishService dishService;
@Override
	@Transactional
	public void onApplicationEvent(ContextRefreshedEvent event) {
		if (isConfigured)
			return;
		logger.info("Checking if the admin account already exists.");
		if(employeeRepository.existsByUsername("admin"))
			return;
		final String token		= RandomString.AlphaNumeric(8);
		logger.info("Passowrd: "+token);
		createRoleIfNotFound(EmployeeRole.ROLE_ADMIN);
		createRoleIfNotFound(EmployeeRole.ROLE_SUPERVISOR);
		createRoleIfNotFound(EmployeeRole.ROLE_WAITER);
		createRoleIfNotFound(EmployeeRole.ROLE_COOK);
		logger.info("Checking if role exists (This will be done only on first boot with a clean DB)");
		Role adminRole = roleRepository.findRoleByEmployeeRole(EmployeeRole.ROLE_ADMIN);
		Role cookRole = roleRepository.findRoleByEmployeeRole(EmployeeRole.ROLE_COOK);
		Employee admin = new Employee("admin", "Password0", adminRole);
		Employee cook = new Employee("cook", "Password0", cookRole);

		admin.setPasswordResetted(true);
		cook.setPasswordResetted(true);
		employeeRepository.save(admin);
		employeeRepository.save(cook);
		List<Category> categories =  new ArrayList<>();

		for(int i = 0; i < 5; i++){
			categories.add(new Category("category"+i, i+1));
		}
		categoryService.saveAll(categories);
		List<Dish> dishes =  new ArrayList<>();
		for(Category category : categories){
			for(int i = 0; i < 5; i++){
				dishes.add(new Dish(i, category.getCategoryType()+".dishName"+i, "description", "", 1,  BigDecimal.valueOf(10), true, category));
			}
		}

		dishService.saveAll(dishes);
		isConfigured = true;
	}

	@Transactional
	void createRoleIfNotFound(EmployeeRole employeeRole) { //  Collection<Privilege> privileges
		Role role = roleRepository.findRoleByEmployeeRole(employeeRole);
		if (role == null) {
			role = new Role(employeeRole);
			roleRepository.save(role);
		}
	}
}*/