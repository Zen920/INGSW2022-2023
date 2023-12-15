package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.EXTERNAL_API_TIMEOUT;
public class ExternalAPITimeoutException extends RuntimeException{
	public ExternalAPITimeoutException() {
		super(EXTERNAL_API_TIMEOUT);
	}
}
