package openfoodfacts.Model;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;
import pl.coderion.model.Product;

@Data
@Builder
@Jacksonized
public class SearchResponse {
	private Product[] products;
	private Integer count;
	private Integer page_count;
	private Integer page_size;
	private Integer skip;
}
