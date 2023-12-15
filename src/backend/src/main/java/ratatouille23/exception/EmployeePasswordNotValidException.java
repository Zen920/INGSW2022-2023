package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.EMPLOYEE_PASSWORD_NOT_VALID;

public class EmployeePasswordNotValidException extends RuntimeException{
	public EmployeePasswordNotValidException(){
		super(EMPLOYEE_PASSWORD_NOT_VALID);
	}
}
