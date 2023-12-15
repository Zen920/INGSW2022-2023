package database.CustomInterfaces;

import java.math.BigDecimal;

public interface Menu {
	
	String getCategoryType();

	
	 String getDishName();
	
	 String getDishDescription();
	
	 String getAllergens();

	 BigDecimal getPrice();
}
