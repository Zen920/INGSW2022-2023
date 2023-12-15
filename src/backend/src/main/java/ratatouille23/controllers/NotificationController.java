package ratatouille23.controllers;

import database.Entities.Notification;
import database.Entities.NotificationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ratatouille23.service.NotificationService;
import ratatouille23.service.NotificationStatusService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
	private final NotificationService notificationService;
	private final NotificationStatusService notificationStatusService;

	// Using @RequestParam for testing.
	// Will be changed later on to @RequestBody if needed

	// Supervisor+ exclusive


	/*@MessageMapping("/myNotifications")
	@SendTo("/notifications/getAll")
	public int getNotifications (int update){
		return update+1;
	}*/
	@PostMapping("/send")
	public ResponseEntity<Notification> sendNotification (@RequestBody Notification notification){
		return ResponseEntity.ok(notificationService.sendNotification(notification));
	}

	// Authenticated users
	@GetMapping("/employee-notifications")
	public ResponseEntity<List<NotificationStatus>> listNotifications2 (){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ResponseEntity.ok(notificationStatusService.listNotifications(authentication.getName()));
	}

	@GetMapping("/employee-notifications2")
	public ResponseEntity<List<Notification>> listNotifications (){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ResponseEntity.ok(notificationService.listNotifications(authentication.getName()));
	}

	@GetMapping("/number-notifications")
	public ResponseEntity<Integer> howManyNotifications () {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return 	ResponseEntity.ok(notificationStatusService.howManyNotifications(authentication.getName()));
	}
	/*@GetMapping("read/{notificationId}")
	public ResponseEntity<Notification> readNotification (@PathVariable long notificationId){
		return ResponseEntity.ok(notificationRepository.findNotificationByIdNotification(notificationId));
	}*/




}
