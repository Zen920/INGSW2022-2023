package ratatouille23.repositories;

import database.Entities.ClientTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ClientTableRepository extends JpaRepository<ClientTable, Long> {
	ClientTable findClientTableByIdTable(long id);
	ClientTable findFirstByOrderByIdTableDesc();
	ClientTable findClientTableByTableNumber(int tableNumber);

	@Query(value = """

         SELECT *
         FROM client_table ct
         WHERE ct.id_table IN
            (SELECT ot.client_table_id_table
            FROM order_transaction ot
            WHERE ot.is_completed = 'false')
            OR ct.usable = 'true'
            ORDER BY ct.table_number ASC
""", nativeQuery = true)
	List<ClientTable> findAllByUsableAndOrderInProgress();

	@Query(value = """
	SELECT ct.table_number
	FROM client_table as ct
	ORDER BY ct.table_number ASC
""", nativeQuery = true)
	List<String> findAllIndexes();

}
