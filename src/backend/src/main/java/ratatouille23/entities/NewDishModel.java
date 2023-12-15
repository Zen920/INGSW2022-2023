package ratatouille23.entities;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class NewDishModel {
	private String dishName;
	private String dishDescription;
	private String allergens;
	private long index;
	private BigDecimal price;
	private Boolean onSale;
	private String category;
}
