package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.DISH_NOT_FOUND;
public class DishNotFoundException extends RuntimeException{
	public DishNotFoundException(){
		super(DISH_NOT_FOUND);
	}
}
