package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.EMPLOYEE_NOT_FOUND;

public class EmployeeNotFoundException extends RuntimeException{

		public EmployeeNotFoundException() {
			super(EMPLOYEE_NOT_FOUND);
		}
	}