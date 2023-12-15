package ratatouille23.repositories;

import database.CustomInterfaces.CategoryCount;
import database.CustomInterfaces.DateCount;
import database.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findEmployeeByIdEmployee(long idEmployee);
    Employee findEmployeeByUsername(String username);
    Optional<Employee> findByUsername(String username);
    Boolean existsByUsername(String username);

    @Query(value = """
    
SELECT ot.transaction_date as day, sum(iol.quantity) as dishesprepared
FROM item_order_list iol
    INNER JOIN client_order co ON co.id_order = iol.client_order_id_order
    INNER JOIN order_transaction ot ON co.order_transaction_id_transaction = ot.id_transaction
WHERE ot.transaction_date >= ?1
    AND ot.transaction_date <= ?2
    AND iol.id_employee = ?3
    AND iol.status = 'READY'
GROUP BY ot.transaction_date
""", nativeQuery = true)
    List<DateCount> countDishesPrepared(Date from, Date to, long id);


    @Query(value = """
    SELECT w.username
    FROM employee w
    WHERE w.id_role != ?1
""", nativeQuery = true)
List<String> findAllByRoleNot(long idRole);
    @Query(value = """
    
      SELECT sum(iol.quantity)
        FROM item_order_list iol
            INNER JOIN client_order co ON
                co.id_order = iol.client_order_id_order
            INNER JOIN order_transaction ot ON
                co.order_transaction_id_transaction = ot.id_transaction
        WHERE ot.transaction_date = ?1
            AND ot.transaction_date = ?2
            AND iol.id_employee = ?3
            AND iol.id_dish = ?4
""", nativeQuery = true)
    int countGivenDishPrepared( Date from, Date to, long idEmployee, long idDish);
    @Query(value = """
    SELECT w.username
    FROM employee w
    WHERE w.id_role = ?1
""", nativeQuery = true)

    List<String> findEmployeeByRole2(long id);

    @Query(value = """
    SELECT  c.category_type as id, c.category_type as label, sum(iol.quantity) as value
    FROM item_order_list iol
    INNER JOIN client_order co ON co.id_order = iol.client_order_id_order
    INNER JOIN order_transaction ot ON co.order_transaction_id_transaction = ot.id_transaction
    INNER JOIN dish d ON d.id_dish = iol.id_dish
    INNER JOIN category c ON c.id_category = d.id_category
WHERE ot.transaction_date >= ?1
    AND ot.transaction_date <= ?2
    AND iol.id_employee = ?3
    AND iol.status = 'READY'
GROUP BY c.category_type;

""", nativeQuery = true)
    List<CategoryCount> findPreparedOfACategoryFromTo( Date from, Date to, long idEmployee);
}
