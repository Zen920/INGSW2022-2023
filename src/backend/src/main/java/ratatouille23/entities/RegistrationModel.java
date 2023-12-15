package ratatouille23.entities;

import database.Enums.EmployeeRole;
import lombok.Data;

@Data
public class RegistrationModel {
	private String username;
	private EmployeeRole role;
}
