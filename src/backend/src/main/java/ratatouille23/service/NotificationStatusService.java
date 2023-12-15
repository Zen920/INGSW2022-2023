package ratatouille23.service;

import database.Entities.Employee;
import database.Entities.NotificationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import ratatouille23.repositories.NotificationStatusRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationStatusService extends GenericService<NotificationStatus, Long> {
	private final NotificationStatusRepository trepository;

	private final EmployeeService employeeService;

		@Override
		protected NotificationStatusRepository repository()
			{ return trepository; }

	public List<NotificationStatus> findAllByEmployeesAndViewed (Employee employee, boolean value) {
			return trepository.findAllByEmployeesAndViewed(employee, value);
	}
	public NotificationStatus hideNotification (@RequestBody NotificationStatus notificationStatus){
		notificationStatus.setViewed(true);
		return saveAndValidate(notificationStatus);
	}

	public List<NotificationStatus> listNotifications (String username){
		return trepository.findAllByEmployeesAndViewed(
				employeeService.retrieveAuthenticatedUser(username),
				false);
	}

	public int howManyNotifications (String username) {
		return 	trepository.findAllByEmployeesAndViewed(
				employeeService.retrieveAuthenticatedUser(username),
				false).size();
	}

}
