package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.TRANSACTION_NOT_FOUND;

public class TransactionNotFoundException extends RuntimeException{

	public TransactionNotFoundException() {
		super(TRANSACTION_NOT_FOUND);
	}
}
