package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.EMPLOYEE_PASSWORD_PATTERN;

public class EmployeePasswordPatternNotValidException extends RuntimeException{
	public EmployeePasswordPatternNotValidException(){
		super(EMPLOYEE_PASSWORD_PATTERN);
	}
}
