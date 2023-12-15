package openfoodfacts.Client;

import javax.inject.Singleton;

import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.MediaType;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import pl.coderion.model.ProductResponse;

import openfoodfacts.Model.KeyValue;
import openfoodfacts.Model.QueryBuilder;
import openfoodfacts.Model.SearchResponse;

@Singleton
public class OpenFoodFactsApiLowLevelClient {
	private static final String USER_AGENT = "Ratatouille23";
	private static final String API_PRODUCT_URL = "https://world.openfoodfacts.org/api/v0/product/%s.json";
	private static final String API_SEARCH_URL	= "https://world.openfoodfacts.org/cgi/search.pl?%s";

	private static final String API_SEARCH_URL_V2 = "https://it.openfoodfacts.org/api/v2/search?%s";

	private static final String API_SEARCH_URL_IT	= "https://it.openfoodfacts.org/cgi/search.pl?%s";

	private final HttpClient client;

	public OpenFoodFactsApiLowLevelClient(@Client HttpClient client) throws Exception {
		this.client = client;
	}

	public ProductResponse fetchProductByCode(String code){
		String reqURL = String.format(API_PRODUCT_URL, code);
	
		HttpRequest<?> request = HttpRequest.GET(reqURL)
			.header(HttpHeaders.USER_AGENT, OpenFoodFactsApiLowLevelClient.USER_AGENT)
			.header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_JSON);

		ProductResponse response = client.toBlocking().retrieve(request, ProductResponse.class);
		return response;
	}

	public SearchResponse fetchProductsByQuery(QueryBuilder query){
		// Force Search to return JSON if available
		query.set(KeyValue.JSON);
		String reqURL = String.format(API_SEARCH_URL_IT, query);

		HttpRequest<?> request = HttpRequest.GET(reqURL)
			.header(HttpHeaders.USER_AGENT, OpenFoodFactsApiLowLevelClient.USER_AGENT)
				.header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_JSON);

		try {
			return client.toBlocking().retrieve(request, SearchResponse.class);
		}catch(RuntimeException ex){
			System.out.println(ex.getMessage());
			return null;
		}
	}
}
