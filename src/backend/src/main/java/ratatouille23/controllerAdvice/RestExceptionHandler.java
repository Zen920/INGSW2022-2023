package ratatouille23.controllerAdvice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ratatouille23.exception.*;

@ControllerAdvice
public class RestExceptionHandler  extends ResponseEntityExceptionHandler{
	public RestExceptionHandler() {
		super();
	}

	@ExceptionHandler(EmployeeNotFoundException.class)
	public ResponseEntity<String> handleNoEmployeeFound (EmployeeNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(TransactionNotFoundException.class)
	public ResponseEntity<String> handleTransactionNotFound (TransactionNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}


	@ExceptionHandler(DishAlreadyExistsException.class)
	public ResponseEntity<String> handleDishAlreadyExists (DishAlreadyExistsException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(EmployeeAlreadyExistsException.class)
	public ResponseEntity<String> handleEmployeeAlreadyExists (EmployeeAlreadyExistsException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	}
	@ExceptionHandler(EmployeePasswordPatternNotValidException.class)
	public ResponseEntity<String> handleEmployeePasswordPatternNotValidException (EmployeePasswordPatternNotValidException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(RoleNotFoundException.class)
	public ResponseEntity<String> handleRoleNotFound (RoleNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(CategoryAlreadyExistsException.class)
	public ResponseEntity<String> handleCategoryAlreadyExists (CategoryAlreadyExistsException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<String> handleCategoryNotFound (CategoryNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(DishNotFoundException.class)
	public ResponseEntity<String> handleDishNotFound (DishNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ExternalAPITimeoutException.class)
	public ResponseEntity<String> handleExternalAPITimeout (ExternalAPITimeoutException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.REQUEST_TIMEOUT);
	}

	@ExceptionHandler(ExternalApiMismatchedTypeException.class)
	public ResponseEntity<String> handleExternalApiMismatchedType (ExternalApiMismatchedTypeException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<String> handleUsernameNotFoundException (UsernameNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(EmployeePasswordNotValidException.class)
	public ResponseEntity<String> handleEmployeePasswordNotValid (EmployeePasswordNotValidException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(ItemOrderListNotFoundException.class)
	public ResponseEntity<String> handleItemOrderListNotFound (ItemOrderListNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(ItemOrderListHasBeenCancelledException.class)
	public ResponseEntity<String> handleItemOrderListHasBeenCancelled (ItemOrderListHasBeenCancelledException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(TransactionAlreadyCompletedException.class)
	public ResponseEntity<String> handleTransactionAlreadyCompleted (TransactionAlreadyCompletedException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(PasswordMismatchException.class)
	public ResponseEntity<String> handlePasswordMismatch (PasswordMismatchException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(PasswordMatchException.class)
	public ResponseEntity<String> handlePasswordMatch (PasswordMatchException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<String> handleIllegalArgumentException (IllegalArgumentException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ClientTableNotFoundException.class)
	public ResponseEntity<String> handleClientTableNotFound (ClientTableNotFoundException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(InvalidRefreshTokenException.class)
	public ResponseEntity<String> handleInvlaidRefreshToken (InvalidRefreshTokenException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(EmployeeAccountIsDisabledException.class)
	public ResponseEntity<String> handleEmployeeAccountIsDisabled (EmployeeAccountIsDisabledException ex){
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
