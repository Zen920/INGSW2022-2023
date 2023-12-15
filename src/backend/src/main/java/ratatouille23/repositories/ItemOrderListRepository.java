package ratatouille23.repositories;

import database.Entities.Employee;
import database.Entities.ItemOrderList;
import database.Enums.StatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemOrderListRepository extends JpaRepository<ItemOrderList, Long> {
	List<ItemOrderList> findAllByEmployeeIsNull();

	/*@Query(value = """
	EXPLAIN SELECT *
	FROM item_order_list iol INNER JOIN order_transaction ot on ot.id_transaction
	WHERE iol.id_employee != null AND iol.status = ?1 
""", nativeQuery = true)
	List<ItemOrderList> findItemOrderListByEmployeeIsNullAndStatusIs2(StatusEnum status);*/

	List<ItemOrderList> findItemOrderListByEmployeeIsNullAndStatusIs(StatusEnum status);
	ItemOrderList findItemOrderListByIdItem(long id);
	List<ItemOrderList> findItemOrderListByEmployeeAndStatus(Employee employee, StatusEnum status);
	@Query(value = """
 	select * from client_order
""", nativeQuery = true)
	List<ItemOrderList> fetchOrders(long idTransaction, StatusEnum status);
	@Query(value = """
 	SELECT iol.id_item, iol.additional_notes, iol.price, iol.quantity, iol.status, iol.client_order_id_order, iol.id_dish, iol.id_employee FROM order_transaction ot
 	INNER JOIN
    client_order co ON co.order_transaction_id_transaction = ot.id_transaction
    INNER JOIN
     item_order_list iol ON iol.client_order_id_order = co.id_order
    WHERE ot.id_transaction = ?1 AND iol.status = ?2
    ORDER BY client_order_id_order
""", nativeQuery = true)
	List<ItemOrderList> pendingOrders(long idTransaction, StatusEnum status);
	@Query(value = """
 	SELECT * FROM item_order_list WHERE item_order_list.id_item IN
    (SELECT iol.id_item FROM order_transaction ot JOIN
    client_order co ON co.order_transaction_id_transaction = ot.id_transaction
    JOIN item_order_list iol ON iol.client_order_id_order = co.id_order
    WHERE ot.id_transaction = ?1 AND iol.status != 'READY')
""", nativeQuery = true)
	List<ItemOrderList> unarrivedDishes(long idTransaction);
}
