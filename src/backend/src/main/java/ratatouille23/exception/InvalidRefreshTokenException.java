package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.INVALID_REFRESH_TOKEN;

public class InvalidRefreshTokenException extends RuntimeException{
	public InvalidRefreshTokenException(){
		super(INVALID_REFRESH_TOKEN);
	}
}
