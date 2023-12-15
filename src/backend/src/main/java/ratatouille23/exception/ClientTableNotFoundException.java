package ratatouille23.exception;
import static utility.ResponseEntityErrorCodes.CLIENT_TABLE_NOT_FOUND;
public class ClientTableNotFoundException extends RuntimeException{
	public ClientTableNotFoundException(){
		super(CLIENT_TABLE_NOT_FOUND);
	}
}
