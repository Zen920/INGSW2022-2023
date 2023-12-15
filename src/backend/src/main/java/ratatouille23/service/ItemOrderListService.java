package ratatouille23.service;

import database.Entities.Employee;
import database.Entities.ItemOrderList;
import database.Enums.StatusEnum;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import ratatouille23.exception.EmployeeNotFoundException;
import ratatouille23.exception.ItemOrderListHasBeenCancelledException;
import ratatouille23.exception.ItemOrderListNotFoundException;
import ratatouille23.repositories.EmployeeRepository;
import ratatouille23.repositories.ItemOrderListRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemOrderListService extends GenericService<ItemOrderList, Long>{
	private final ItemOrderListRepository itemOrderListRepository;

	private final EmployeeRepository employeeRepository;
	@Override
	protected ItemOrderListRepository repository() {
		return itemOrderListRepository;
	}

	@Transactional
	public ItemOrderList updateOrder (long id, StatusEnum status, String username, int quantity){
		Employee employee = employeeRepository.findEmployeeByUsername(username);
		ItemOrderList itemOrderList = itemOrderListRepository.findItemOrderListByIdItem(id);
		validateItemOrderList(status, employee, itemOrderList);
		if(itemOrderList.getStatus() == StatusEnum.CANCELLED)
			throw new ItemOrderListHasBeenCancelledException();
		ItemOrderList splittedOrder = splitOrder(status, quantity, itemOrderList);
		itemOrderList.setStatus(status);
		itemOrderList.setEmployee(employee);
		saveAndValidate(itemOrderList);
		return splittedOrder;
	}

	private ItemOrderList splitOrder(StatusEnum status, int quantity, ItemOrderList itemOrderList) {
		if(status.equals(StatusEnum.IN_PROGRESS) && (quantity > 0 && quantity < itemOrderList.getQuantity())){
			ItemOrderList itemOrderList1 = new ItemOrderList();
			BeanUtils.copyProperties(itemOrderList, itemOrderList1);
			itemOrderList1.setQuantity(itemOrderList.getQuantity()- quantity);
			itemOrderList.setQuantity(quantity);
			itemOrderList1.setIdItem(0L);
			return itemOrderListRepository.save(itemOrderList1);
		}
		return null;
	}

	private static void validateItemOrderList(StatusEnum status, Employee employee, ItemOrderList itemOrderList) {
		if(itemOrderList == null){
			throw new ItemOrderListNotFoundException();
		}
		if(status == null){
			throw new IllegalArgumentException();
		}
		if(!status.equals(StatusEnum.WAITING) && employee == null){
		   throw new EmployeeNotFoundException();
	   }
		if(status.equals(StatusEnum.WAITING) && !itemOrderList.getStatus().equals(StatusEnum.IN_PROGRESS)){
			throw new IllegalArgumentException();
		}
	}

	public List<ItemOrderList> getAcceptedOrders (StatusEnum status, String username){
		return repository().findItemOrderListByEmployeeAndStatus(
				employeeRepository.findEmployeeByUsername(username),
				status);
	}

	public List<ItemOrderList> findItemOrderListByEmployeeIsNullAndStatusIs(){
		return itemOrderListRepository.findItemOrderListByEmployeeIsNullAndStatusIs(StatusEnum.WAITING);
	}

}