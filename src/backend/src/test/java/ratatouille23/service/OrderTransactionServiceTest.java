package ratatouille23.service;

import database.Entities.ClientTable;
import database.Entities.OrderTransaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import ratatouille23.exception.TransactionAlreadyCompletedException;
import ratatouille23.exception.TransactionNotFoundException;
import ratatouille23.repositories.ClientTableRepository;
import ratatouille23.repositories.ItemOrderListRepository;
import ratatouille23.repositories.OrderTransactionRepository;
import utility.ResponseEntityErrorCodes;

import java.sql.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static utility.ResponseEntityErrorCodes.TRANSACTION_ALREADY_COMPLETED;
import static utility.ResponseEntityErrorCodes.TRANSACTION_NOT_FOUND;

@ExtendWith(MockitoExtension.class)
class OrderTransactionServiceTest {

	OrderTransaction orderTransaction;
	ClientTable clientTable;


	@Mock
	ItemOrderListRepository itemOrderListRepository;
	@Mock
	ItemOrderListService itemOrderListService;
	@Mock
	OrderTransactionRepository orderTransactionRepository;
	@Mock
	ClientTableRepository clientTableRepository;

	@InjectMocks
	private OrderTransactionService orderTransactionService;


	@BeforeEach
	void setup() {
		clientTable = new ClientTable(
				1);
		orderTransaction = new OrderTransaction(1, false, new Date(0), clientTable, null);

	}

	@Test
	@DisplayName("Test valid method parameters")

	void testValidCompleteTransaction() {
		when(orderTransactionRepository.existsById(anyLong())).thenReturn(true);
		boolean result = assertDoesNotThrow(() -> {
			orderTransactionService.completeTransaction(orderTransaction, anyBoolean());
			return true;
		});
		assertTrue(result);
	}
	@Test
	@DisplayName("Test valid method parameters")

	void testValidCompleteTransactionWithAbortUnarrivedOrdersTrue() {
		when(orderTransactionRepository.existsById(anyLong())).thenReturn(true);
		boolean result = assertDoesNotThrow(() -> {
			orderTransactionService.completeTransaction(orderTransaction, true);
			return true;
		});
		assertTrue(result);
	}
	@Test
	@DisplayName("Test completeTransaction with a wrong transaction id")

	void testInvalidTransaction() {
		when(orderTransactionRepository.existsById(anyLong())).thenReturn(false);
		Exception exception = assertThrows(TransactionNotFoundException.class, () -> orderTransactionService.completeTransaction(orderTransaction,  anyBoolean()));
		assertEquals(TRANSACTION_NOT_FOUND, exception.getMessage());
	}

	@Test
	@DisplayName("Test completedTransaction where passed transaction has already been completed")
	void testCompletedTransaction() {
		when(orderTransactionRepository.existsById(anyLong())).thenReturn(true);
		orderTransaction.setCompleted(true);
		Exception exception = assertThrows(TransactionAlreadyCompletedException.class, () -> orderTransactionService.completeTransaction(orderTransaction,  anyBoolean()));
		assertEquals(TRANSACTION_ALREADY_COMPLETED, exception.getMessage());
	}

	@Test
	@DisplayName("Test completeTransaction with a null transaction parameter")
	void testNullTransaction() {
		Exception exception = assertThrows(TransactionNotFoundException.class, () -> orderTransactionService.completeTransaction(null, true));
		assertEquals(TRANSACTION_NOT_FOUND, exception.getMessage());
	}

	@Test
	@DisplayName("Test completeTransaction with a null abortUnarrivedOrders parameter")
	void testNullAbortUnarrivedOrders() {
		when(orderTransactionRepository.existsById(anyLong())).thenReturn(true);
		boolean result = assertDoesNotThrow(() -> {
			orderTransactionService.completeTransaction(orderTransaction, null);
			return true;
		});
		assertTrue(result);
	}
}
