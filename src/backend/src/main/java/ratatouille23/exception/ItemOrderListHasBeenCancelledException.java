package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.ITEM_ORDER_LIST_CANCELLED;

public class ItemOrderListHasBeenCancelledException extends RuntimeException{
	public ItemOrderListHasBeenCancelledException(){
		super(ITEM_ORDER_LIST_CANCELLED);
	}
}
