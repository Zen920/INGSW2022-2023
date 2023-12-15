package ratatouille23.repositories;

import database.CustomInterfaces.CookTable;
import database.CustomInterfaces.FullCart;
import database.Entities.ClientTable;
import database.Entities.OrderTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderTransactionRepository extends JpaRepository<OrderTransaction, Long> {
    //OrderTransaction findOrderTransactionByIdTransaction(long idTransaction);
    Optional<OrderTransaction> findOrderTransactionByClientTableAndAndIsCompleted(ClientTable clientTable, Boolean isCompleted);

    List<OrderTransaction> findAllByIsCompletedFalse();

    @Query(value = """
select ot.id_transaction as IdTransaction, ct.table_number as TableNumber, co.id_order as IdOrder, iol.id_item as IdItem, d.dish_name as DishName,
 iol.additional_notes as AdditionalNotes, iol.quantity as Quantity
 from order_transaction ot
    INNER JOIN client_table ct on ct.id_table = ot.client_table_id_table
    INNER JOIN client_order co on ot.id_transaction = co.order_transaction_id_transaction
    INNER JOIN item_order_list iol on co.id_order = iol.client_order_id_order
    INNER JOIN dish d on iol.id_dish = d.id_dish
AND iol.status = 'WAITING'
AND (current_date = transaction_date OR transaction_date = current_date - INTERVAL '2 day')
ORDER BY co.id_order;
""", nativeQuery = true)
    List<CookTable> findCookTableWhereEmployeeIsNullAndStatusIsWaiting();
    @Query(value = """
select ot.id_transaction as IdTransaction, ct.table_number as TableNumber, co.id_order as IdOrder, iol.id_item as IdItem, d.dish_name as DishName,
 iol.additional_notes as AdditionalNotes, iol.quantity as Quantity
 from order_transaction ot
    INNER JOIN client_table ct on ct.id_table = ot.client_table_id_table
    INNER JOIN client_order co on ot.id_transaction = co.order_transaction_id_transaction
    INNER JOIN item_order_list iol on co.id_order = iol.client_order_id_order
        INNER JOIN dish d on iol.id_dish = d.id_dish

    WHERE iol.id_employee = ?1
AND iol.status = ?2
AND (current_date = transaction_date OR transaction_date = current_date - INTERVAL '1 day')
ORDER BY co.id_order;
""", nativeQuery = true)
    List<CookTable> findCookTableWhereStatusIsAndEmployeeIs(Long idEmployee, String status);

    @Query(value = """
SELECT d.dish_name as dishName, sum(iol.quantity) as fullquantity, sum(d.price*quantity) as price
FROM order_transaction ot INNER JOIN
    client_order co ON co.order_transaction_id_transaction = ot.id_transaction
    INNER JOIN item_order_list iol on iol.client_order_id_order = co.id_order
    INNER JOIN dish d on d.id_dish = iol.id_dish
    where ot.client_table_id_table = ?1 AND ot.is_completed = false
GROUP BY d.dish_name
""", nativeQuery = true)
    List <FullCart> getFullCart (long idTable);
}
