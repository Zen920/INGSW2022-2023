package ratatouille23.controllers;

import database.Entities.Category;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratatouille23.repositories.CategoryRepository;
import ratatouille23.service.CategoryService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
	private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

	private final CategoryRepository categoryRepository;

	private final CategoryService categoryService;

	@Cacheable(value ="categoriesType")
	@GetMapping("/all-categories")
	public List<String> getAllCategories( ){
		return categoryRepository.findAllCategoryTypes();
	}
	//@Cacheable(value ="categories")
	@GetMapping("/categories-dishes")
	public ResponseEntity<List<Category>> getCategoriesDishes(@RequestParam (value="fetchAll", defaultValue = "true") Boolean fetchAll){
		return ResponseEntity.ok(categoryService.getCategoriesDishes(fetchAll));
	}
	@CacheEvict(value="categories", allEntries = true)
	@PostMapping
	public ResponseEntity<Category> addCategory(@RequestParam String categoryType, @RequestParam (value="index", required = false, defaultValue = "0") int index){
		logger.warn("Adding new category");
		return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addNewCategory(categoryType, index));
	}

	@CacheEvict(value="categories")
	@PutMapping
	public ResponseEntity<Category> updateCategory(@RequestBody Category category, @RequestParam(value="index", required = false, defaultValue = "-1") int index,
											@RequestParam(value ="newCategoryType", required = false) String newCategoryType){
		logger.warn("Updating a category");
		return ResponseEntity.ok(categoryService.updateCategory(category, index, newCategoryType));
	}

	@CacheEvict(value="categories")
	@DeleteMapping
	public ResponseEntity<String> deleteCategory (@RequestParam String categoryType){
		logger.warn("Deleting a category");
		return ResponseEntity.ok(categoryService.deleteCategory(categoryType));
	}
}
