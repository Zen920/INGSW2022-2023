package ratatouille23.entities;

import lombok.Data;

@Data
public class OpenFoodFactRequest {
	private String value;
	private Integer max_results;
}
