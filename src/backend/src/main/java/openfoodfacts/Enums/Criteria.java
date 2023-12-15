package openfoodfacts.Enums;

public enum Criteria {
	BRANDS("brands"),
	CATEGORIES("categories"),
	PACKAGING("packaging"),
	LABELS("labels"),
	ORIGINS("origins"),
	MANUFACTURING_PLACES("manufacturing_places"),
	EMB_CODES("emb_codes"),
	PURCHASE_PLACES("purchaes_places"),
	STORES("stores"),
	COUNTRIES("countries"),
	INGREDIENTS("ingredients"),
	ADDITIVES("additives"),
	ALLERGENS("allergens"),
	TRACES("traces"),
	NUTRITION_GRADES("nutrition_grades"),
	NOVA_GROUPS("nova_groups"),
	LANGUAGES("languages"),
	CREATOR("creator"),
	EDITORS("editors"),
	STATES("states");

	private final String text;

	Criteria(final String text){
		this.text = text;
	}

	@Override
	public String toString(){
		return text;
	}
}
