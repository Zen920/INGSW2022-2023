package ratatouille23.controllers;

import database.Entities.OrderTransaction;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ratatouille23.entities.WaiterModel;
import ratatouille23.exception.TransactionNotFoundException;
import ratatouille23.service.ClientOrderService;
import ratatouille23.service.OrderTransactionService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee/waiter")
public class WaiterController {
	private static final Logger logger = LoggerFactory.getLogger(WaiterController.class);

	private final ClientOrderService clientOrderService;
	private final OrderTransactionService orderTransactionService;


	@PostMapping
	public ResponseEntity<OrderTransaction> registerOrderParam (@RequestBody WaiterModel waiterModel) throws TransactionNotFoundException {
		logger.warn("Creating new client order");

		return  ResponseEntity.status(HttpStatus.CREATED).body(orderTransactionService.registerOrder(waiterModel));
	}

}
