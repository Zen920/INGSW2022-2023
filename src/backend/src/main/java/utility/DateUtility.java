package utility;

import java.util.Calendar;
import java.util.Date;

public class DateUtility {
	public Date advanceDate (int days){
		Date dt = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(dt);
		c.add(Calendar.DATE, days);
		return c.getTime();
	}
}
