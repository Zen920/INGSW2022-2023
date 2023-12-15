package ratatouille23.service;

import database.Entities.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ratatouille23.entities.WaiterModel;
import ratatouille23.exception.ClientTableNotFoundException;
import ratatouille23.exception.TransactionNotFoundException;
import ratatouille23.repositories.ClientOrderRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientOrderService extends GenericService<ClientOrder, Long> {
	private final ClientOrderRepository trepository;

	private final ItemOrderListService itemOrderListService;

	private final DishService dishService;
		@Override
		protected ClientOrderRepository repository()
			{ return trepository; }

	@Transactional
	public void makeNewOrderList(List<ItemOrderList> list, ClientOrder clientOrder) {
			List <ItemOrderList> toUpdate = list.stream()
					.map(item -> {
						item.setDish(dishService.findDishByDishName(item.getDish().getDishName()));
						item.setClientOrder(clientOrder);
						return item;
					})
					.toList();
		itemOrderListService.saveAllAndValidate(toUpdate);
	}
}
