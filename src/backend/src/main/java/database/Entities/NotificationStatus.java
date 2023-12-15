package database.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.context.annotation.Lazy;
import utility.ResponseEntityErrorCodes;

import static utility.ConstantMessages.NOT_NULL_MESSAGE;
import static utility.ResponseEntityErrorCodes.NOTIFICATION_STATUS_EMPLOYEE_IS_NULL;
import static utility.ResponseEntityErrorCodes.NOTIFICATION_STATUS_NOTIFICATION_IS_NULL;

/**
 * NotificationStatus entity
 *
 * Identifies whether or not a specific employee has visualized the specific notification
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "notification_status")
public class NotificationStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_status_generator")
	@SequenceGenerator(name="notification_status_generator",sequenceName = "notification_status_seq", allocationSize = 1)
	@Column(name = "id_notification_status")
	private long idNotificationStatus;

	@Column(name = "viewed")
	@ColumnDefault("'false'")
	private Boolean viewed;

	@NotNull(message = NOTIFICATION_STATUS_EMPLOYEE_IS_NULL)
	@Lazy
	@ManyToOne
	@JoinColumn(name = "id_employee")
	private Employee employees;

	@NotNull(message = NOTIFICATION_STATUS_NOTIFICATION_IS_NULL)
	@OneToOne(cascade = CascadeType.MERGE)
	@Lazy
	@JoinColumn(name = "id_notification")
	private Notification notification;

	public NotificationStatus(Employee employees, Notification notification, Boolean viewed) {
		this.notification = notification;
		this.employees = employees;
		this.viewed = viewed;
	}
}
