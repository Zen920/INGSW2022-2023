package ratatouille23.entities;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateDishModel {
	String dishName;
	String dishDescription;
	String categoryType;
	String allergens;
	BigDecimal price;
	long index;
	long idDish;
	boolean onSale;
}
