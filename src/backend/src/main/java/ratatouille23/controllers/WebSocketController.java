package ratatouille23.controllers;

import jakarta.annotation.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class WebSocketController {
	@Autowired
	private SimpMessageSendingOperations messagingTemplate;
	private static final Logger logger = LoggerFactory.getLogger(WebSocketController.class);

	@MessageMapping("/myOrders")
	@SendTo("/orders/getAll")
	public String getOrders (SimpMessageHeaderAccessor sha, String refetchAll){
		return (refetchAll.equals("refetch") ? refetchAll : Objects.requireNonNull(sha.getUser()).getName());
	}
	@MessageMapping("/userHealth")
	public String alive (SimpMessageHeaderAccessor sha){
		return  Objects.requireNonNull(sha.getUser()).getName();
	}
	@MessageMapping("/tables")
	@SendTo("/table/getAll")
	public String getTables (SimpMessageHeaderAccessor sha){
		return Objects.requireNonNull(sha.getUser()).getName();
	}

	@MessageMapping("/updateDishes")
	@SendTo("/dishes/getAll")
	public List<String> updateDishes(SimpMessageHeaderAccessor sha, List<String> values){
		return Arrays.asList(Objects.requireNonNull(sha.getUser()).getName(), values.get(0), values.get(1), values.get(2));
		//return Objects.requireNonNull(sha.getUser()).getName();
	}
	@MessageMapping("/myNotifications")
	@SendTo("/notifications/getAll")
	public String updateNotificationNumber(SimpMessageHeaderAccessor sha){
		return  Objects.requireNonNull(sha.getUser()).getName();
	}

	@MessageMapping("/forceLogout")
	@SendToUser("/queue/logout")
	public void processMessageFromClient(
			@Payload String username)  {
		messagingTemplate.convertAndSendToUser(username, "/queue/logout", username);
	}
	/*@MessageMapping("/updateNotifications")
	public void updateEmployee( @Header("simpSessionId") String sessionId, SimpMessageHeaderAccessor sha, @Payload String employeeUsername){
			simpMessagingTemplate.convertAndSendToUser("sub-1", "/queue/updateNot", "eregerergerger"); //4
	}*/

}
