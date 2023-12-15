package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.EXTERNAL_API_MISMATCHED_TYPE;
public class ExternalApiMismatchedTypeException extends RuntimeException{
	public ExternalApiMismatchedTypeException(){
		super(EXTERNAL_API_MISMATCHED_TYPE);
	}
}
