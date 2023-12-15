package ratatouille23.service;

import database.Entities.Category;
import database.Entities.Dish;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ratatouille23.exception.CategoryAlreadyExistsException;
import ratatouille23.exception.CategoryNotFoundException;
import ratatouille23.repositories.CategoryRepository;
import ratatouille23.repositories.DishRepository;
import utility.ConstantMessages;

import java.util.List;
import java.util.stream.Collectors;

import static utility.ConstantMessages.*;

@Service
@RequiredArgsConstructor
public class CategoryService extends GenericService<Category, Long> {
	private final CategoryRepository categoryRepository;
	private final DishRepository dishRepository;
	@Override
	protected CategoryRepository repository() {
		return categoryRepository;
	}

	/*
	Reorded categories' indexes upon adding or deleting a category.
	 */
	public void reorderIndexes (int n, String operation){
		List<Category> toUpdate = categoryRepository.findAllCategoriesWithTopOffset(n-1);
		int offset = 1;

		if(operation.equals(ConstantMessages.DELETE_OPERATION))
			offset = -1;
		for(Category category : toUpdate){
			category.setIndex(category.getIndex()+offset);
		}
		if(operation.equals(ConstantMessages.DELETE_OPERATION)) {
			categoryRepository.saveAll(toUpdate);
		}else {
			for(int x=toUpdate.size()-1; x > -1; x--){
				categoryRepository.save(toUpdate.get(x));
			}
		}


	}

	public int getNextInSequence (){
		if(categoryRepository.count() > 0)
			return categoryRepository.findMaxIndex()+1;
		 return 1;
	}

	public Category addNewCategory (String categoryType, int index) {
		if(categoryRepository.findCategoryByCategoryType(categoryType) != null)
			throw new CategoryAlreadyExistsException();
		if(index > 0){
			reorderIndexes(index, UPDATE_OPERATION);
		}else {
			index = getNextInSequence();
		}
		return saveAndValidate(new Category(categoryType,index));
	}

	@Transactional
	public String deleteCategory (String categoryType){
		Category category = categoryRepository.findCategoryByCategoryType(categoryType);
		if(category == null)
			throw new CategoryNotFoundException();
		List<Dish> dishes = dishRepository.findAllByCategory(category);
		for(Dish dish : dishes ){
			dish.setCategory(null);
		}
		dishRepository.saveAllAndFlush(dishes);
		int index = category.getIndex();
		categoryRepository.delete(category);
		reorderIndexes(index, DELETE_OPERATION);
		return SUCCESS_MESSAGE;
	}

	@Transactional
	public Category updateCategory (Category category, int index, String newCategoryType) {
		if(index > 0){
			//reorderIndexes(index, UPDATE_OPERATION);
			//if(categoryRepository.findMaxIndex() > index)
				category.setIndex(index);
		}
		if(newCategoryType != null){
			if(categoryRepository.findCategoryByCategoryType(newCategoryType) != null){
				throw new CategoryAlreadyExistsException();
			}
			category.setCategoryType(newCategoryType);
		}
		return saveAndValidate(category);
	}
	public List<Category> getCategoriesDishes(boolean fetchAll) {
		if (!fetchAll) {
			List<Category> categories = categoryRepository.findAllByDishesNotNullOrderByIndex()
					.stream().filter(category -> dishRepository.validCategory(category.getIdCategory())).toList();
			for (Category c : categories) {
				c.getDishes().removeIf(x -> !x.isOnSale());}
			return categories;
		}
		return findAll();
	}
}
