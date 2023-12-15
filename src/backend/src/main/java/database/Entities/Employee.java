package database.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import utility.ResponseEntityErrorCodes;
// import java.util.Collection;
import static utility.ConstantMessages.*;
import static utility.ResponseEntityErrorCodes.*;


/**
 * Employee entity 
 *
 * Identifies an employee or, more specifically, a person inside the system
 */
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "password")
@Entity
@Table(name = "employee")
public class Employee {
	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_generator")
	@SequenceGenerator(name="employee_generator",sequenceName = "employee_seq", allocationSize = 1)
	@Column(name = "id_employee")
	private long idEmployee;

	@Column(name = "username", unique = true)
	@NotBlank(message = EMPLOYEE_USERNAME_IS_NULL)
	@Size(min = 4, max = 20, message = EMPLOYEE_USERNAME_LENGTH)
	private String username;

	@Column(name = "password")
	@JsonIgnore
	@NotBlank(message = EMPLOYEE_PASSWORD_IS_NULL)
	@Size(min = 7,  message = EMPLOYEE_PASSWORD_LENGTH)
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{4,255}$", message = EMPLOYEE_PASSWORD_PATTERN)
	private String password;

	@Column(name = "password_resetted")
	@ColumnDefault("'false'")
	private Boolean passwordResetted = false;

	@Column(name = "enabled")
	@ColumnDefault("'true'")
	private Boolean enabled = true;

	@Column(name = "account_non_expired")
	@ColumnDefault("'true'")
	private Boolean accountNonExpired = true;

	@Column(name = "account_non_locked")
	@ColumnDefault("'true'")
	private Boolean accountNonLocked = true;

	@Column(name = "credentials_non_expired")
	@ColumnDefault("'true'")
	private boolean credentialsNonExpired = true;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "id_role")
	@NotNull(message = EMPLOYEE_ROLE_IS_NULL)
	private Role role;

	public Employee(String username, String password, Role role) {
		this.username = username;
		this.password = PASSWORD_ENCODER.encode(password);
		this.role = role;
	}
}


