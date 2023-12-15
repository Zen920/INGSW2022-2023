package openfoodfacts.Enums;

public enum Keys {
	SEARCH("search_terms"),
	SORT_BY("sort_by"),
	MAX_RESULTS("page_size"),
	AS_JSON("json");

	private final String text;

	Keys(final String text){
		this.text = text;
	}

	@Override
	public String toString(){
		return text;
	}
}
