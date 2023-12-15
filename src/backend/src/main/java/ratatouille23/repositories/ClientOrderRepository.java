package ratatouille23.repositories;

import database.Entities.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientOrderRepository extends JpaRepository<ClientOrder, Long> {
    @Query(value = """
        select exists(select co.id_order
        from order_transaction ot
            INNER JOIN client_order co
            ON co.order_transaction_id_transaction = ot.id_transaction
        where ot.id_transaction = ?1 AND
        co.id_order IN (select distinct iol.client_order_id_order from item_order_list iol where iol.status != 'READY'))
""", nativeQuery = true)
    Boolean allOrdersCompleted(long id);
}
