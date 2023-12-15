package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.ROLE_NOT_FOUND;

public class RoleNotFoundException extends RuntimeException{
	public RoleNotFoundException(){
		super(ROLE_NOT_FOUND);
	}
}
