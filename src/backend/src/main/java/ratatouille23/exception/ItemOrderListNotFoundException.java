package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.ITEM_ORDER_LIST_NOT_FOUND;

public class ItemOrderListNotFoundException extends RuntimeException{
	public ItemOrderListNotFoundException(){
		super(ITEM_ORDER_LIST_NOT_FOUND);
	}
}
