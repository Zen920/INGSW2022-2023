package ratatouille23.entities;

import database.Entities.ClientTable;
import database.Entities.ItemOrderList;
import lombok.Data;

import java.util.List;

@Data
public class WaiterModel {
	List<ItemOrderList> list;
	ClientTable clientTable;
}
