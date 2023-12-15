package ratatouille23.controllers;

import database.CustomInterfaces.DishesWithCategory;
import database.Entities.Dish;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CachePut;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratatouille23.entities.NewDishModel;
import ratatouille23.entities.OpenFoodFactRequest;
import ratatouille23.entities.UpdateDishModel;
import ratatouille23.entities.UpdateDishesCategoryModel;
import ratatouille23.service.DishService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dish")
public class DishController {

	private static final Logger logger = LoggerFactory.getLogger(DishController.class);

	private final DishService dishService;

	@GetMapping
	public ResponseEntity<List<DishesWithCategory>> fetchDishes () {
		return ResponseEntity.ok(dishService.findAllDishes());
	}
	@PutMapping
	public ResponseEntity<Dish> updateDish(@RequestBody UpdateDishModel updateDishModel){
		return ResponseEntity.ok(dishService.updateDish(updateDishModel));
	}

	@CachePut("dishes")
	@GetMapping("/dishes-of-category")
	public ResponseEntity<List<Dish>> dishesOfCategory(@RequestParam String categoryType){
		logger.info("Fetching dishes of a given category.");
		return ResponseEntity.ok(dishService.dishesOfCategory(categoryType));
	}

	@PostMapping
	public ResponseEntity<Dish> AddNewEntry (@RequestBody NewDishModel newDishModel){
		logger.warn("Adding new entry in the menu");
		return  ResponseEntity.status(HttpStatus.CREATED).body(dishService.addEntry(newDishModel));
	}

	@PutMapping("/dishes-category")
	public ResponseEntity<List<Dish>> updateDishesCategory (@RequestBody UpdateDishesCategoryModel updateDishesCategoryModel){
		logger.warn("Updating dishes category");
		return ResponseEntity.ok(dishService.updateDishesCategory(updateDishesCategoryModel.getDishes(), updateDishesCategoryModel.getCategory()));
	}
	@PostMapping("/autocomplete")
	public ResponseEntity<List<Dish>> openfoodfacts (@RequestBody OpenFoodFactRequest request){
		logger.warn("Searching from OFF");
		return  ResponseEntity.status(HttpStatus.CREATED).body(dishService.openFoodFactSearch(request));
	}


}
