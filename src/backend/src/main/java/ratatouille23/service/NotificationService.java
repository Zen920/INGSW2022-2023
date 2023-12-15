package ratatouille23.service;

import database.Entities.Employee;
import database.Entities.Notification;
import database.Entities.NotificationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ratatouille23.repositories.NotificationRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService extends GenericService<Notification, Long> {
	private final NotificationRepository trepository;

	private final EmployeeService employeeService;

	private final NotificationStatusService notificationStatusService;

		@Override
		protected NotificationRepository repository()
			{ return trepository; }


	public Notification sendNotification (Notification notification){
		Notification finalNotification = saveAndValidate(notification);
		notificationStatusService.saveAllAndValidate(employeeService.findAll()
				.stream()
				.map(employee -> new NotificationStatus(employee, finalNotification, false)).toList());
		return notification;
	}
	public List<Notification> listNotifications (String username){
		return notificationStatusService.findAllByEmployeesAndViewed(
				employeeService.findEmployeeByUsername(username),
				false).stream().map(NotificationStatus::getNotification).toList();
	}
}
