package ratatouille23.service;

import database.CustomInterfaces.DishesWithCategory;
import database.Entities.Category;
import database.Entities.Dish;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import openfoodfacts.Enums.Keys;
import openfoodfacts.Model.KeyValue;
import openfoodfacts.Model.QueryBuilder;
import openfoodfacts.Model.SearchResponse;
import openfoodfacts.Service.OpenFoodFactsWrapper;
import org.springframework.stereotype.Service;
import pl.coderion.model.Product;
import ratatouille23.entities.NewDishModel;
import ratatouille23.entities.OpenFoodFactRequest;
import ratatouille23.entities.UpdateDishModel;
import ratatouille23.exception.*;
import ratatouille23.repositories.CategoryRepository;
import ratatouille23.repositories.DishRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DishService extends GenericService<Dish, Long> {
	private final DishRepository trepository;
	private final CategoryRepository categoryRepository;
	private static final String OFF_FILTER = "unique_scans";
	final private OpenFoodFactsWrapper openFoodFactsWrapper = new OpenFoodFactsWrapper();
	@Override
	protected DishRepository repository() {
		return trepository;
	}

	public Dish addEntry(NewDishModel newDishModel) throws DishAlreadyExistsException {
		if (!doesExist(newDishModel.getDishName())) {
			Category category;
			if ((category = categoryRepository.findCategoryByCategoryType(newDishModel.getCategory())) == null)
				throw new CategoryNotFoundException();
			long correctIndex = newDishModel.getIndex() > 0 ? newDishModel.getIndex() : trepository.findMaxIndex(category.getIdCategory());
					Dish dish = Dish.builder()
					.dishName(newDishModel.getDishName())
					.dishDescription(newDishModel.getDishDescription())
					.index(correctIndex)
					.allergens(newDishModel.getAllergens())
					.price(newDishModel.getPrice())
					.category(category)
					.onSale(newDishModel.getOnSale())
					.build();

			return saveAndValidate(dish);
		} else {
			throw new DishAlreadyExistsException();

		}
	}

	public List<DishesWithCategory> findAllDishes(){
		return trepository.findAllDishes();

	}
	public boolean doesExist(String dishName) {
		return (!dishName.isBlank() && trepository.findDishByDishName(dishName) != null);
	}

	/*
		Convert results extracted fromm OFF to Dish object while ensuring that they are appropriate.
	 */

	public List<Dish> offToDish(Product[] results, int n) {
		List<Dish> dishes = new ArrayList<>();
		for (int i = 0; (i < results.length && dishes.size() < n) ; i++){
			if (offDishIsInvalid(results, i)) continue;
			Dish dish = new Dish();
			dish.setDishName(results[i].getProductName());
			dish.setAllergens(results[i].getAllergensFromIngredients());
			dish.setDishDescription(getValidDescription(results[i]));
			dishes.add(dish);
		}
		return dishes;
	}

	private static String getValidDescription(Product result) {
		if (result.getIngredientsText() == null) {
			return "";
		} else {
			if (result.getIngredientsText().length() > 255) {
				return result.getIngredientsText().substring(0, 254);
			}
			return result.getIngredientsText();
		}
	}
	/*
		Ensure the product from OFF is a valid candidate to be a Dish
	 */
	private static boolean offDishIsInvalid(Product[] results, int i) {
		return (results[i].getProductName() == null ||
				(results[i].getAllergensFromIngredients() == null && results[i].getIngredientsText() == null)) ||
				(results[i].getProductName().isBlank());
	}

	/*
	Update dish by passing DishModel containing information relative to the Dish to update
	 */
	public Dish updateDish(UpdateDishModel dishModel) {
		Category category = categoryRepository.findCategoryByCategoryType(dishModel.getCategoryType());
		if (category == null) {
			throw new CategoryNotFoundException();
		}
		Dish selectedDish = trepository.findDishByIdDish(dishModel.getIdDish());
		if (selectedDish == null) {
			throw new DishNotFoundException();
		}
		selectedDish.setDishName(dishModel.getDishName());
		selectedDish.setDishDescription(dishModel.getDishDescription());
		if(dishModel.getIndex() > 0){
			selectedDish.setIndex(dishModel.getIndex());
		}else{
			selectedDish.setIndex(trepository.findMaxIndex(category.getIdCategory()));
		}
		selectedDish.setAllergens(dishModel.getAllergens());
		selectedDish.setPrice(dishModel.getPrice());
		selectedDish.setCategory(category);
		selectedDish.setOnSale(dishModel.isOnSale());
		return saveAndValidate(selectedDish);
	}

	/*
	Update dishes category in bulk (or a single category)
	 */
	@Transactional
	public List<Dish> updateDishesCategory(List<Dish> dishes, Category category) {
		List<Dish> toUpdate = dishes.stream()
				.map(dish -> {dish.setCategory(category); return dish;})
				.toList();
		return saveAllAndValidate(toUpdate);
	}

	/*
	Request products from the Open Food Fact API
	 */
	public List<Dish> openFoodFactSearch (OpenFoodFactRequest request) {
		List<Dish> newDishes = new ArrayList<>();
		request.setMax_results(request.getMax_results());
		QueryBuilder queryBuilder = buildOFFQuery(request);
		SearchResponse result;
		try {
			result = openFoodFactsWrapper.fetchProductsByQuery(queryBuilder);
		}catch(Exception e){
			throw new ExternalAPITimeoutException();
		}
		if(result == null)
			throw new ExternalApiMismatchedTypeException();
		if(result.getCount() > 0)
			newDishes.addAll(offToDish(result.getProducts(), request.getMax_results()/2));
		return newDishes;
	}

	/*
		Query builder helper used with OFF search method
	 */
	private static QueryBuilder buildOFFQuery(OpenFoodFactRequest request) {
		QueryBuilder queryBuilder = new QueryBuilder();
		queryBuilder.add(new KeyValue(Keys.SEARCH, request.getValue().replace(" ","+")));
		queryBuilder.add(new KeyValue(Keys.MAX_RESULTS, request.getMax_results().toString()));
		queryBuilder.add(new KeyValue(Keys.SORT_BY, OFF_FILTER));
		return queryBuilder;
	}

	public Dish  findDishByDishName(String dishName){
		return  trepository.findDishByDishName(dishName);
	}

	public List<Dish> dishesOfCategory(String categoryType){
		Category category = categoryRepository.findCategoryByCategoryType(categoryType);
		return trepository.findAllByCategoryAndOnSaleTrue(category);
	}


}
