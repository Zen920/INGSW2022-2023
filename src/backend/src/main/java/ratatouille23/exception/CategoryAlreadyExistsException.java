package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.CATEGORY_ALREADY_EXISTS;
public class CategoryAlreadyExistsException extends RuntimeException{
	public CategoryAlreadyExistsException(){
		super(CATEGORY_ALREADY_EXISTS);
	}
}
