package ratatouille23.service;

import database.CustomInterfaces.CookTable;
import database.CustomInterfaces.FullCart;
import database.Entities.*;
import database.Enums.StatusEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ratatouille23.entities.WaiterModel;
import ratatouille23.exception.ClientTableNotFoundException;
import ratatouille23.exception.TransactionAlreadyCompletedException;
import ratatouille23.exception.TransactionNotFoundException;
import ratatouille23.repositories.*;

import java.sql.Date;
import java.util.Calendar;
import java.util.List;

import static utility.ConstantMessages.SUCCESS_MESSAGE;

@Service
@RequiredArgsConstructor
public class OrderTransactionService extends GenericService<OrderTransaction, Long> {
	private final OrderTransactionRepository trepository;
	private final EmployeeRepository employeeRepository;
	private final ClientTableRepository clientTableRepository;

	private final ClientOrderRepository clientOrderRepository;

	private final ItemOrderListService itemOrderListService;
	private final ClientTableService clientTableService;
	private final ClientOrderService clientOrderService;


	private final ItemOrderListRepository itemOrderListRepository;


	@Override
	protected OrderTransactionRepository repository() {
		return trepository;
	}




	public OrderTransaction getTransaction (ClientTable clientTable) throws TransactionNotFoundException {
		return trepository.findOrderTransactionByClientTableAndAndIsCompleted(clientTable, false).orElseThrow(TransactionNotFoundException::new);
	}

	@Transactional
	public OrderTransaction newTransaction (ClientTable clientTable) {
		if (tableIsNotEligible(clientTable))
			return null;
		OrderTransaction orderTransaction = OrderTransaction.builder()
				.transactionDate(new Date(Calendar.getInstance().getTimeInMillis()))
				.clientTable(clientTable)
				.build();
		clientTable.setOccupied(true);
		clientTableRepository.save(clientTable);
		orderTransaction = trepository.save(orderTransaction);
		return orderTransaction;
	}

	private boolean tableIsNotEligible(ClientTable clientTable) {
		return trepository.findOrderTransactionByClientTableAndAndIsCompleted(clientTable, false).isPresent()
				|| clientTable.isOccupied()
				|| clientTableRepository.findClientTableByIdTable(clientTable.getIdTable()) == null;
	}

	@Transactional
	public OrderTransaction completeTransaction(OrderTransaction transaction, Boolean abortUnarrivedOrders) throws TransactionNotFoundException {
		if (transaction == null || !trepository.existsById(transaction.getIdTransaction()))
			throw new TransactionNotFoundException();
		if(transaction.isCompleted())
			throw new TransactionAlreadyCompletedException();
		if(abortUnarrivedOrders == null){
			abortUnarrivedOrders = false;
		}
		if(abortUnarrivedOrders){
			List<ItemOrderList> unarrived = itemOrderListRepository.unarrivedDishes(transaction.getIdTransaction());
			int index = 0;
			for (ItemOrderList item : unarrived){
				item.setStatus(StatusEnum.CANCELLED);
				unarrived.set(index++, item);
			}
			itemOrderListService.saveAllAndValidate(unarrived);
		}
		ClientTable clientTable = transaction.getClientTable();
		transaction.setCompleted(true);
		clientTable.setOccupied(false);
		clientTableRepository.save(clientTable);

		//orderTransaction.setTotal();
		return saveAndValidate(transaction);
	}

	public List<CookTable> getTables (String username, StatusEnum statusEnum) {
		Employee employee = employeeRepository.findEmployeeByUsername(username);
		if (!statusEnum.equals(StatusEnum.WAITING)) {
			return trepository.findCookTableWhereStatusIsAndEmployeeIs(
					employee.getIdEmployee(), statusEnum.toString());
		}
		return trepository.findCookTableWhereEmployeeIsNullAndStatusIsWaiting();
	}

	public List<OrderTransaction> getOpenTransaction() {
		return trepository.findAllByIsCompletedFalse();
	}
	public OrderTransaction getSingleTransaction(ClientTable clientTable) {
		return trepository.findOrderTransactionByClientTableAndAndIsCompleted(clientTable, false).orElseThrow(TransactionNotFoundException::new);
	}
	public List<FullCart> getFullCart(ClientTable clientTable) {
		return trepository.getFullCart(clientTable.getIdTable());
	}

	public boolean allDishesArrived(ClientTable clientTable) {
		return clientOrderRepository.allOrdersCompleted(getTransaction(clientTable).getIdTransaction());
	}
	public OrderTransaction registerOrder (WaiterModel waiterModel) {
		OrderTransaction orderTransaction;
		ClientTable clientTable = clientTableService.findClientTableByIdTable(waiterModel.getClientTable().getIdTable());
		if(clientTable == null)
			throw new ClientTableNotFoundException();
		orderTransaction = clientTable.isOccupied()
				?  getTransaction(clientTable)
				: newTransaction(clientTable);
		if(orderTransaction == null){
			throw new TransactionNotFoundException();
		}
		//return new ResponseEntity<>(ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
		if(waiterModel.getList() != null){
			ClientOrder clientOrder = clientOrderService.save(ClientOrder.builder()
					.orderTransaction(orderTransaction)
					.build());
			clientOrderService.makeNewOrderList(waiterModel.getList(), clientOrder);
		}
		return orderTransaction;
	}
}

