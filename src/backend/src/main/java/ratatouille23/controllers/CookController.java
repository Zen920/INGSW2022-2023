package ratatouille23.controllers;

import database.Entities.ItemOrderList;
import database.Enums.StatusEnum;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ratatouille23.service.ItemOrderListService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee/cook")
public class CookController {

	private static final Logger logger = LoggerFactory.getLogger(CookController.class);
	private final ItemOrderListService itemOrderListService;

	@GetMapping("/accepted-orders")
	public List<ItemOrderList> getAcceptedOrders (@RequestParam StatusEnum status){
		logger.warn("Fetching all " + status+ " orders for a user");
		return itemOrderListService.getAcceptedOrders(status, SecurityContextHolder.getContext().getAuthentication().getName());
	}
	@PutMapping
	public ResponseEntity<?> acceptOrders (@RequestParam long id, @RequestParam StatusEnum status, @RequestParam(required = false,
			defaultValue = "-1", value = "quantity") int quantity){
		return ResponseEntity.ok(itemOrderListService.updateOrder(id, status, SecurityContextHolder.getContext().getAuthentication().getName(), quantity));
	}
	@GetMapping("/pending-orders")
	public List<ItemOrderList> pendingOrders (){

		logger.warn("Fetching pending orders.");
		return itemOrderListService.findItemOrderListByEmployeeIsNullAndStatusIs();
	}

	@PutMapping("/release")
	public ResponseEntity<ItemOrderList> releaseOrder (@RequestParam long id){
		logger.warn("Updating order with new StatusEnum");
		return ResponseEntity.ok(itemOrderListService.updateOrder(id, StatusEnum.WAITING, null, -1));
	}
}
