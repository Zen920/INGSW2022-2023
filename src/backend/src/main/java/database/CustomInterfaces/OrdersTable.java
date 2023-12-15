package database.CustomInterfaces;

import database.Entities.ClientOrder;

public interface OrdersTable {
	ClientOrder getClientOrder();
	Long getTransactionId();
	Integer getTableNumber();

}
