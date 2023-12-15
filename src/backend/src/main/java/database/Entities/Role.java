package database.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import database.Enums.EmployeeRole;
import utility.ResponseEntityErrorCodes;

import static utility.ConstantMessages.NOT_NULL_MESSAGE;
import static utility.ResponseEntityErrorCodes.ROLE_EMPLOYEE_ROLE_IS_NULL;

/**
 * Role Entity
 *
 * Identifies the specific role which a specific employee has
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "role")
public class Role {
	@Id
	@SequenceGenerator(name = "role_generator", sequenceName = "role_seq",allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_generator")
	@Column(name = "id_role")

	private Long idRole;
	@Enumerated(EnumType.STRING)
	@NotNull(message = ROLE_EMPLOYEE_ROLE_IS_NULL)

	@Column(name = "employee_role", unique = true)
	private EmployeeRole employeeRole;

	public Role(EmployeeRole employeeRole) {
		this.employeeRole = employeeRole;
	}
}
