package ratatouille23.service;

import database.Entities.*;
import database.Enums.EmployeeRole;
import database.Enums.StatusEnum;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import ratatouille23.exception.EmployeeNotFoundException;
import ratatouille23.exception.ItemOrderListNotFoundException;
import ratatouille23.repositories.EmployeeRepository;
import ratatouille23.repositories.ItemOrderListRepository;
import ratatouille23.repositories.OrderTransactionRepository;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ItemOrderListServiceTest {
	Employee employee;
	ClientOrder clientOrder;
	Role role;
	Dish dish;

	ItemOrderList itemOrderList;

	@Mock
	EmployeeRepository employeeRepository;
	@Mock
	ItemOrderListRepository itemOrderListRepository;
	@Mock
	OrderTransactionRepository orderTransactionRepository;


	@InjectMocks
	private ItemOrderListService itemOrderListService;


	@BeforeEach
	void setup() {
		role = new Role(1L, EmployeeRole.ROLE_ADMIN);
		employee = new Employee("username", "password", role);
		itemOrderList = new ItemOrderList(1L, "Notes", 1, StatusEnum.WAITING, dish, employee, clientOrder);
	}

	@Test
	@DisplayName("Test updateOrder with valid arguments")
	void testUpdateOrder() {
		when(itemOrderListRepository.findItemOrderListByIdItem(anyLong())).thenReturn(itemOrderList);
		when(employeeRepository.findEmployeeByUsername(anyString())).thenReturn(employee);

		boolean result = assertDoesNotThrow(() -> {
			itemOrderListService.updateOrder(1L, StatusEnum.IN_PROGRESS, "username", 255);
			return true;
		});
		assertTrue(result);

	}

	@Test
	@DisplayName("Test updateOrder with valid arguments")
	void testUpdateOrderWithQuantityBetweenMaxAndMinAndStatusInProgress() {
		itemOrderList.setQuantity(3);
		when(itemOrderListRepository.findItemOrderListByIdItem(anyLong())).thenReturn(itemOrderList);
		when(employeeRepository.findEmployeeByUsername(anyString())).thenReturn(employee);

		boolean result = assertDoesNotThrow(() -> {
			itemOrderListService.updateOrder(1L, StatusEnum.IN_PROGRESS, "username", 2);
			return true;
		});
		assertTrue(result);

	}
	@Test
	@DisplayName("Test updateOrder with a wrong ItemOrderList id")

	void testUpdateOrderItemOrderListDoesNotExistsWithGivenID() {
		//when(itemOrderListRepository.findItemOrderListByIdItem(anyLong())).thenReturn(itemOrderList);
		Exception exception = assertThrows(ItemOrderListNotFoundException.class, () -> itemOrderListService.updateOrder(5, StatusEnum.WAITING, "username", -1));
		assertEquals("errors.itemOrderList.notFound", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateOrder with order status null")
	void testUpdateOrderStatusNull() {
		when(itemOrderListRepository.findItemOrderListByIdItem(anyLong())).thenReturn(itemOrderList);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> itemOrderListService.updateOrder(1, null, "username", -1));
		assertNull(exception.getMessage());
	}

	@Test
	@DisplayName("Test updateOrder with parameters employee null and orderStatus is WAITING, while ItemOrderList status is IN_PROGRESS")
	void testUpdateOrderEmployeeNullWithStatusWaitingItemOrderListStatusInProgress() {
		itemOrderList.setStatus(StatusEnum.IN_PROGRESS);
		when(itemOrderListRepository.findItemOrderListByIdItem(anyLong())).thenReturn(itemOrderList);
		boolean result = assertDoesNotThrow(() -> {
			itemOrderListService.updateOrder(1, StatusEnum.WAITING, null, -1);
			return true;
		});
		assertTrue(result);
	}

	@Test
	@DisplayName("Test updateOrder with parameters employee null and orderStatus is WAITING, while ItemOrderList status is not IN_PROGRESS")
	void testUpdateOrderEmployeeNullWithStatusWaitingItemOrderListStatusNotInProgress() {
		itemOrderList.setStatus(StatusEnum.READY);
		when(itemOrderListRepository.findItemOrderListByIdItem(anyLong())).thenReturn(itemOrderList);

		Exception exception = assertThrows(IllegalArgumentException.class, () -> itemOrderListService.updateOrder(1, StatusEnum.WAITING, null, -1));
		assertNull(exception.getMessage());
	}

	@Test
	@DisplayName("Test updateOrder with parameters employee null and orderStatus is not WAITING")
	void testUpdateOrderEmployeeNullAndStatusNotWaiting() {
		when(itemOrderListRepository.findItemOrderListByIdItem(anyLong())).thenReturn(itemOrderList);
		Exception exception = assertThrows(EmployeeNotFoundException.class, () -> itemOrderListService.updateOrder(1, StatusEnum.READY, null, -1));
		assertEquals("errors.employee.notFound", exception.getMessage());
	}
}