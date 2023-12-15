package database.CustomInterfaces;

public interface CookTable {
	long getIdTransaction();

	Integer getTableNumber();

	long getIdOrder();

	long getIdItem();

	String getDishName();

	String getAdditionalNotes();

	Integer getQuantity();
}
