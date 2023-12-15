package ratatouille23.controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {
	private static final Logger logger = LoggerFactory.getLogger(RolesController.class);

	@GetMapping
	public ResponseEntity<?> getRoles (){
		logger.warn("Checking health");
		return new ResponseEntity<>("Ratatoapp-backend is alive and running!", HttpStatus.OK);
	}
}
