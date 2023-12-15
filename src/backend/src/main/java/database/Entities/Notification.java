package database.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import utility.ResponseEntityErrorCodes;

import static utility.ConstantMessages.BETWEEN_SIZE_MESSAGE;
import static utility.ConstantMessages.NOT_NULL_MESSAGE;
import static utility.ResponseEntityErrorCodes.*;

/**
 * Notification entity
 *
 * Identifies a employee-notification in the system
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "notification")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_generator")
	@SequenceGenerator(name = "notification_generator", sequenceName = "notification_seq", allocationSize = 1)
	@Column(name = "id_notification")
	private long idNotification;
	@NotBlank(message = NOTIFICATION_TITLE_IS_NULL)
	@Size(min = 5, max = 40, message = NOTIFICATION_TITLE_LENGTH)
	@Column(name = "title", columnDefinition = "TEXT")
	private String title;
	@NotBlank(message = NOTIFICATION_BODY_IS_NULL)
	@Size(min = 5, max = 255, message = NOTIFICATION_BODY_LENGTH)
	@Column(name = "body", columnDefinition = "TEXT")
	private String body;

	public Notification(String body, String title) {
		this.title = title;
		this.body = body;
	}
}
