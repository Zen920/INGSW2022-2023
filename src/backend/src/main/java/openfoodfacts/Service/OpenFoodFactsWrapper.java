package openfoodfacts.Service;

import javax.inject.Singleton;

import io.micronaut.http.client.HttpClient;
import openfoodfacts.Client.OpenFoodFactsApiLowLevelClient;
import openfoodfacts.Model.QueryBuilder;
import openfoodfacts.Model.SearchResponse;
import pl.coderion.model.ProductResponse;

@Singleton
final public class OpenFoodFactsWrapper {
	private final OpenFoodFactsApiLowLevelClient client;

	public OpenFoodFactsWrapper() {
		try {
			this.client = new OpenFoodFactsApiLowLevelClient(HttpClient.create(null));
		} catch (Exception e){
			throw new RuntimeException(e);
		}
	}

	public SearchResponse fetchProductsByQuery(QueryBuilder query){
		return client.fetchProductsByQuery(query);
	}

	public ProductResponse fetchProductByCode(String code){
		return client.fetchProductByCode(code);
	}
}
