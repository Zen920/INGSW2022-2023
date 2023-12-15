package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.TRANSACTION_ALREADY_COMPLETED;
public class TransactionAlreadyCompletedException extends RuntimeException{

	public TransactionAlreadyCompletedException() {
		super(TRANSACTION_ALREADY_COMPLETED);
	}
}
