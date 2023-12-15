package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.PASSWORD_MATCH;


public class PasswordMatchException extends RuntimeException{
	public PasswordMatchException(){
		super(PASSWORD_MATCH);
	}
}
