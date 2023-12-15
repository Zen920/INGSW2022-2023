package ratatouille23.controllers;

import database.Entities.NotificationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ratatouille23.service.NotificationStatusService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification-status")
public class NotificationStatusController {
	private final NotificationStatusService notificationStatusService;


	@PutMapping("/hide")
	public ResponseEntity<NotificationStatus> hideNotification (@RequestBody NotificationStatus notificationStatus){
		return ResponseEntity.ok(notificationStatusService.hideNotification(notificationStatus));
	}
}
