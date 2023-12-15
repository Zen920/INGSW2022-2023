package openfoodfacts.Enums;

public enum CriteriaIncludes {
	DOES_INCLUDE("contains"),
	DOES_NOT_INCLUDE("does_not_contain");

	private final String text;

	CriteriaIncludes(final String text){
		this.text = text;
	}

	@Override
	public String toString(){
		return text;
	}
}
