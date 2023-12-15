package ratatouille23.repositories;

import database.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	Category findCategoryByCategoryType(String categoryType);

	@Query(value = """
		SELECT
			*
		FROM
			category
		ORDER BY
			index
		OFFSET ?1 ROWS
""", nativeQuery = true)


	List<Category> findAllCategoriesWithTopOffset(int offset);


	@Query(value = """
	SELECT coalesce(max(index), 1)
	from Category
""", nativeQuery = true)
	Integer findMaxIndex();

	List<Category> findAllByDishesNotNullOrderByIndex();

	@Query(value = """


    SELECT category.category_type FROM category
""", nativeQuery = true)
	List<String> findAllCategoryTypes();
	@Query(value = """
    SELECT * FROM ratato.public.category c 
    ORDER BY c.index
""", nativeQuery = true)
	List<Category> findAllCategoriesOrderByCategoryIndexAndDishIndex();
}
