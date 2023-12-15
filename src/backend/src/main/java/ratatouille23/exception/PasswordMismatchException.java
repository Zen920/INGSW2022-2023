package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.PASSWORD_MISMATCH;


public class PasswordMismatchException extends RuntimeException{
	public PasswordMismatchException(){
		super(PASSWORD_MISMATCH);
	}
}
