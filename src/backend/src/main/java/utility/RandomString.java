package utility;
import java.security.SecureRandom;

public class RandomString {
	static final String charset 
		= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	static SecureRandom rnd = new SecureRandom();

	/**
	 * Generate a random, alphanumeric string of length `length`
	 *
	 * @param length 
	 */
	public static String AlphaNumeric(int length) {
		StringBuilder sb = new StringBuilder(length);

		for (int i = 0; i < length; i++)
			sb.append(charset.charAt(rnd.nextInt(charset.length())));
		if(!sb.toString().matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.* ).{4,255}$")){
			sb.append(charset.charAt(rnd.nextInt(0,9))).append(charset.charAt(rnd.nextInt(10,35))).append(charset.charAt(rnd.nextInt(36, charset.length())));
		}
		return sb.toString();
	}
}
