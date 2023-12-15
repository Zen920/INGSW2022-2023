package database.CustomInterfaces;

import java.math.BigDecimal;

public interface DishesWithCategory {
	long getIdDish();
	String getDishName();
	String getDishDescription();
	String getAllergens();
	BigDecimal getPrice();
	long getIndex();
	boolean getOnSale();
	String getCategoryType();
}
