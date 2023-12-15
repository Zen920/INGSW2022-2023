package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.CATEGORY_NOT_FOUND;
public class CategoryNotFoundException extends  RuntimeException{
	public CategoryNotFoundException(){
		super(CATEGORY_NOT_FOUND);
	}
}
