package ratatouille23.entities;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChangePasswordModel {
	private String currentpw;

	@NotBlank
	private String newpw;
}
