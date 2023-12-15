package openfoodfacts.Model;

import lombok.Data;
import openfoodfacts.Enums.Keys;

@Data
public class KeyValue implements Parameter {
	public final static KeyValue JSON = new KeyValue(Keys.AS_JSON, "1");

	private static final String format = "%s=%s";
	private Keys key;
	private String value;

	public KeyValue(Keys key, String value){
		this.key = key;
		this.value = value;
	}

	@Override
	public String toString(){
		return httpString();
	}

	@Override
	public String httpString(){
		return String.format(KeyValue.format, this.key, this.value);
	}

	@Override
	public int hashCode(){
		return this.key.hashCode();
	}

	@Override
	public boolean equals(Object o){
		if (this == o) return true;
		if (o == null) return false;
		if (this.getClass() != o.getClass()) return false;

		KeyValue keyvalue = (KeyValue) o;
		return this.key == keyvalue.key;
	}
}
