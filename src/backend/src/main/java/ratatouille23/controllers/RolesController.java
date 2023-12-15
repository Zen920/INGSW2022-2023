package ratatouille23.controllers;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ratatouille23.service.RoleService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roles")
public class RolesController {
	private static final Logger logger = LoggerFactory.getLogger(RolesController.class);

	private final RoleService roleService;

	@Cacheable(value="roles")
	@GetMapping
	public ResponseEntity<List<String>> getRoles (){
		logger.warn("Fetching roles");

		return ResponseEntity.ok(roleService.findAllRoles());
	}

}
