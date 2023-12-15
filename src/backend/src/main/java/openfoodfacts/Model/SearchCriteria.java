package openfoodfacts.Model;

import lombok.Data;
import openfoodfacts.Enums.Criteria;
import openfoodfacts.Enums.CriteriaIncludes;

@Data
public class SearchCriteria implements Parameter {
	private static final String format = "tagtype_%%d=%s&tag_contains_%%d=%s&tag_%%d=%s";
	private Criteria term;
	private CriteriaIncludes includes;
	private String value;

	public SearchCriteria(Criteria term, CriteriaIncludes includes, String value) {
		this.term = term;
		this.includes = includes;
		this.value = value;
	}

	@Override
	public String toString(){
		return httpString();
	}

	@Override
	public String httpString(){
		return String.format(SearchCriteria.format, this.term, this.includes, this.value);
	}

	@Override
	public int hashCode(){
		return this.term.hashCode();
	}

	@Override
	public boolean equals(Object o){
		if (this == o) return true;
		if (o == null) return false;
		if (this.getClass() != o.getClass()) return false;

		SearchCriteria searchcriteria = (SearchCriteria) o;
		return this.term == searchcriteria.term;
	}
}
