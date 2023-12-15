package ratatouille23.repositories;

import database.CustomInterfaces.DishesWithCategory;
import database.Entities.Category;
import database.Entities.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long> {
    Dish findDishByIdDish(long id);
    Dish findDishByDishName(String name);

    List<Dish> findAllByCategory(Category category);
    List<Dish> findAllByCategoryAndOnSaleTrue(Category category);
    @Query(value = """

	SELECT COALESCE(max(d.index), 1)
	from Dish d
	where d.id_category = ?1
""", nativeQuery = true)
    Integer findMaxIndex(long idCategory);


    @Query(value = """
SELECT d.id_dish as idDish, d.dish_name as dishName, d.dish_description as dishDescription, d.allergens as allergens, d.index as index, d.price as price, d.on_sale as onSale, c.category_type as categoryType
    FROM dish d LEFT JOIN
        category c ON c.id_category = d.id_category;
""", nativeQuery = true)
    List<DishesWithCategory> findAllDishes();

    @Query(value = """
        select exists(select * from dish d where d.on_sale = 'true' and d.id_category = ?1 LIMIT 1);
""", nativeQuery = true)
    Boolean validCategory (long idCategory);
}
