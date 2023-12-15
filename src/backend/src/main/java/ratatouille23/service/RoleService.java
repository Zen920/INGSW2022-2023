package ratatouille23.service;

import database.Entities.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ratatouille23.repositories.RoleRepository;

import java.util.List;
@Service
@RequiredArgsConstructor
public class RoleService extends GenericService<Role, Long> {
	private final RoleRepository trepository;
	@Override
	protected RoleRepository repository() {
		return trepository;
	}

	public List<String> findAllRoles(){
		return trepository.findAllRoles();
	}
}
