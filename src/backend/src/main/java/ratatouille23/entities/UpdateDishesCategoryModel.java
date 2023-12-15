package ratatouille23.entities;

import database.Entities.Category;
import database.Entities.Dish;
import lombok.Data;

import java.util.List;

@Data
public class UpdateDishesCategoryModel {
	List<Dish> dishes;
	Category category;
}
