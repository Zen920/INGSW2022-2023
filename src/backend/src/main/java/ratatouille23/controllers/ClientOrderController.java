package ratatouille23.controllers;

import database.Entities.ClientOrder;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ratatouille23.service.ClientOrderService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders/")
public class ClientOrderController {
	private final ClientOrderService clientOrderService;

	private static final Logger logger = LoggerFactory.getLogger(ClientOrderController.class);

	@GetMapping
	public List<ClientOrder> returnOrders (){
		logger.warn("Returning all orders");
		return clientOrderService.findAll();
	}
}
