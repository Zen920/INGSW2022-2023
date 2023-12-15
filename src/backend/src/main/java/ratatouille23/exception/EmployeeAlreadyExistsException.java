package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.EMPLOYEE_ALREADY_EXISTS;

public class EmployeeAlreadyExistsException extends RuntimeException {
	public EmployeeAlreadyExistsException(){
			super(EMPLOYEE_ALREADY_EXISTS);
		}

	}
