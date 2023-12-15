package ratatouille23.repositories;

import database.Entities.Role;
import database.Enums.EmployeeRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Role findRoleByIdRole(long idRole);
	Role findRoleByEmployeeRole(EmployeeRole employeeRole);
	Optional<Role> findByEmployeeRole(EmployeeRole employeeRole);

	@Query(value = """
SELECT employee_role
FROM role;
""", nativeQuery = true)
	List<String> findAllRoles();
}
