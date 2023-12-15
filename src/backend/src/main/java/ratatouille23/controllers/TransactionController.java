package ratatouille23.controllers;

import database.CustomInterfaces.CookTable;
import database.CustomInterfaces.FullCart;
import database.Entities.ClientTable;
import database.Entities.OrderTransaction;
import database.Enums.StatusEnum;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ratatouille23.exception.TransactionNotFoundException;
import ratatouille23.service.OrderTransactionService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transaction")
public class TransactionController {
	private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

	private final OrderTransactionService orderTransactionService;

	@GetMapping("/getAll")
	public List<OrderTransaction> getTransactions() {
		return orderTransactionService.findAll();
	}

	@GetMapping("/get-open-transactions")
	public ResponseEntity<List<OrderTransaction>> getOpenTransaction() {
		return ResponseEntity.ok(orderTransactionService.getOpenTransaction());
	}

	@GetMapping("/get-tables")
	public ResponseEntity<List<CookTable>> getAcceptedOrders(@RequestParam StatusEnum statusEnum) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ResponseEntity.ok(orderTransactionService.getTables(authentication.getName(), statusEnum));
	}

	@PostMapping("/get-transaction")
	public ResponseEntity<OrderTransaction> getSingleTransaction(@RequestBody ClientTable clientTable) {
		return ResponseEntity.ok(orderTransactionService.getSingleTransaction(clientTable));
	}

	@PutMapping("/complete")
	public ResponseEntity<OrderTransaction> completeTransaction(@RequestBody OrderTransaction transaction,
																@RequestParam(value = "abortUnarrivedOrders", defaultValue = "false") Boolean abortUnarrivedOrders) throws TransactionNotFoundException {
		return ResponseEntity.ok(orderTransactionService.completeTransaction(transaction, abortUnarrivedOrders));
	}

	@PostMapping("/full-cart")
	public ResponseEntity<List<FullCart>> getFullCart(@RequestBody ClientTable clientTable) {
		return  ResponseEntity.ok(orderTransactionService.getFullCart(clientTable));
	}

	@PostMapping
	public ResponseEntity<OrderTransaction> getTransaction(@RequestBody ClientTable clientTable) throws TransactionNotFoundException {
		return  ResponseEntity.ok(orderTransactionService.getTransaction(clientTable));
	}

	@PostMapping("/verify")
	public ResponseEntity<Boolean> allDishesArrived(@RequestBody ClientTable clientTable) throws TransactionNotFoundException {
		return  ResponseEntity.ok(orderTransactionService.allDishesArrived(clientTable));
	}

	/*@DeleteMapping
	public ResponseEntity<String> deleteTransaction (@RequestBody ClientTable clientTable){
		clientTable.setOccupied(false);
		clientTableRepository.save(clientTable);

		return null;
	}*/
}
