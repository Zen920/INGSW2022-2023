package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.DISH_ALREADY_EXISTS;

public class DishAlreadyExistsException extends RuntimeException{
	public DishAlreadyExistsException() {
		super(DISH_ALREADY_EXISTS);
	}

}
