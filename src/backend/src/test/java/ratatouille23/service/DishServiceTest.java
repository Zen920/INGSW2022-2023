package ratatouille23.service;

import database.Entities.Category;
import database.Entities.Dish;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import ratatouille23.entities.UpdateDishModel;
import ratatouille23.exception.CategoryNotFoundException;
import ratatouille23.exception.DishNotFoundException;
import ratatouille23.repositories.CategoryRepository;
import ratatouille23.repositories.DishRepository;
import utility.ResponseEntityErrorCodes;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static utility.ResponseEntityErrorCodes.*;

@ExtendWith(MockitoExtension.class)

class DishServiceTest {

	Dish dish;
	Category category;

	UpdateDishModel updateDishModel;


	@Mock
	CategoryRepository categoryRepository;
	@Mock
	DishRepository dishRepository;


	@InjectMocks
	private DishService dishService;

	@BeforeEach
	void setup() {
		category = new Category("Category", 1);
		category.setIdCategory(1L);
		dish = new Dish();
		updateDishModel = new UpdateDishModel();
		dish.setIdDish(1);
		dish.setDishDescription("Description");
		dish.setDishName("Name");
		dish.setIndex(1);
		dish.setAllergens("");
		dish.setCategory(category);
		dish.setOnSale(true);
		dish.setPrice(BigDecimal.valueOf(10));
		updateDishModel.setIdDish(1);
		updateDishModel.setDishDescription("Description");
		updateDishModel.setDishName("Name");
		updateDishModel.setIndex(1);
		updateDishModel.setAllergens("");
		updateDishModel.setCategoryType(category.getCategoryType());
		updateDishModel.setOnSale(true);
		updateDishModel.setPrice(BigDecimal.valueOf(10));
	}

	@Test
	@DisplayName("Test updateDish with valid parameters")
	void testUpdateDish() {
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		boolean result = assertDoesNotThrow(() -> {
			dishService.updateDish(updateDishModel);
			return true;
		});
		assertTrue(result);
	}
	@Test
	@DisplayName("Test updateDish with valid parameters")
	void testUpdateDishNoIndex() {
		updateDishModel.setIndex(-1);
		when(dishRepository.findMaxIndex(anyLong())).thenReturn(1);
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		boolean result = assertDoesNotThrow(() -> {
			dishService.updateDish(updateDishModel);
			return true;
		});
		assertTrue(result);
	}

	@Test
	@DisplayName("Test updateDish with a category that does not exist")
	void testCategoryNotFound() {
		Exception exception = assertThrows(CategoryNotFoundException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(CATEGORY_NOT_FOUND, exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish that does not exist")
	void testDishNotFound() {
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		Exception exception = assertThrows(DishNotFoundException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_NOT_FOUND, exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose name is less than 3 chars")
	void testLessThanThreeCharactersDishName() {
		updateDishModel.setDishName("a".repeat(2));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_NAME_LENGTH + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose name is more than 80 chars")
	void testMoreThanEightyCharactersDishName() {
		updateDishModel.setDishName("a".repeat(81));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_NAME_LENGTH + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose name is blank")
	void testBlankDishName() {
		updateDishModel.setDishName(" ".repeat(55));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_NAME_IS_NULL + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose name is null")
	void testNullDishName() {
		updateDishModel.setDishName(null);
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_NAME_IS_NULL+ " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose description is less than 5 chars")
	void testLessThanFiveCharactersDishDescription() {
		updateDishModel.setDishDescription("a".repeat(4));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_DESCRIPTION_LENGTH + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose description is more than 255 chars")
	void testMoreThanTwoHundredFiftyFiveCharactersDishDescription() {
		updateDishModel.setDishDescription("a".repeat(256));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_DESCRIPTION_LENGTH + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose description is blank")
	void testBlankDishDescription() {
		updateDishModel.setDishDescription(" ".repeat(55));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_DESCRIPTION_IS_NULL + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose description is null")
	void testNullDishDescription() {
		updateDishModel.setDishDescription(null);
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_DESCRIPTION_IS_NULL + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose allergens are null")
	void testAllergensNull() {
		updateDishModel.setAllergens(null);
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		boolean result = assertDoesNotThrow(() -> {
			dishService.updateDish(updateDishModel);
			return true;
		});
		assertTrue(result);
	}

	@Test
	@DisplayName("Test updateDish with a dish whose allergens is more than 255 chars")
	void testMoreThanTwoHundredFiftyFiveCharactersAllergens() {
		updateDishModel.setAllergens("a".repeat(256));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_ALLERGENS_LENGTH + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose price is negative (-1)")
	void testNegativePrice() {
		updateDishModel.setPrice(BigDecimal.valueOf(-1));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_PRICE_POSITIVE + " ", exception.getMessage());
	}


	@Test
	@DisplayName("Test updateDish with a dish whose price is zero (0)")
	void testZeroPrice() {
		updateDishModel.setPrice(BigDecimal.valueOf(0));
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_PRICE_POSITIVE + " ", exception.getMessage());
	}

	@Test
	@DisplayName("Test updateDish with a dish whose price is null")
	void testNullPrice() {
		updateDishModel.setPrice(null);
		when(categoryRepository.findCategoryByCategoryType(any())).thenReturn(category);
		when(dishRepository.findDishByIdDish(anyLong())).thenReturn(dish);
		Exception exception = assertThrows(IllegalArgumentException.class, () -> dishService.updateDish(updateDishModel));
		assertEquals(DISH_PRICE_IS_NULL + " ", exception.getMessage());
	}

}
