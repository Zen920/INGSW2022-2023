package ratatouille23.exception;

import static utility.ResponseEntityErrorCodes.EMPLOYEE_ACCOUNT_DISABLED;

public class EmployeeAccountIsDisabledException extends RuntimeException {
	public EmployeeAccountIsDisabledException(){
		super(EMPLOYEE_ACCOUNT_DISABLED);
	}

}