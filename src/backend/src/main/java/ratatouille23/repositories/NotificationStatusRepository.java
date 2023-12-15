package ratatouille23.repositories;

import database.Entities.Employee;
import database.Entities.Notification;
import database.Entities.NotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationStatusRepository extends JpaRepository<NotificationStatus, Long> {
    NotificationStatus findNotificationStatusByIdNotificationStatus(long idNotificationStatus);
    List<NotificationStatus> findAllByEmployeesAndViewed(Employee employee, Boolean viewed);
    NotificationStatus findNotificationStatusByNotificationAndEmployees(Notification notification, Employee employees);

}
