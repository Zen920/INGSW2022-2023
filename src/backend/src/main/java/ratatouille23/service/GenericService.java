package ratatouille23.service;

import ch.qos.logback.classic.Logger;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public abstract class GenericService<T, ID> {
	// Autowire a repository
	protected abstract JpaRepository<T, ID> repository();

	// Validator logger shared for all abstract classes
	protected static final Logger log = 
		(Logger) LoggerFactory.getLogger("Hibernate Validator");

	// Update and Insert
	public T save(T entity){
		return repository().save(entity);
	}
	public <S extends T> List<S> saveAll(Iterable<S> entities){
		return repository().saveAll(entities);
	}

	public T saveAndValidate(T entity){
		String errors = validate(entity);
		if(!errors.isBlank()){
			throw new IllegalArgumentException(errors);
		}
		return repository().save(entity);
		//return new ResponseEntity<>(entity, HttpStatus.OK);


	}

	public <S extends T> List<S> saveAllAndValidate(Iterable<S> entities){
		String errors;
		for(T entity : entities){
			errors = validate(entity);
			if(!errors.isBlank()){
				throw new IllegalArgumentException(errors);
			}
		}
		return repository().saveAll(entities);
		//return new ResponseEntity<>(entities, HttpStatus.OK);

	}
	
	// Validate object
	protected final String validate(T object){
		try(ValidatorFactory validationBuilder = Validation.buildDefaultValidatorFactory()){
			Validator validator = validationBuilder.getValidator();
			StringBuilder errorString = new StringBuilder();

			Set<ConstraintViolation<T>> violations = validator.validate(object);
			for (ConstraintViolation<T> violation: violations)
			{ errorString.append(violation.getMessage()).append(" "); }
			// If any violation occurred
			if (!violations.isEmpty()) {
				log.error(errorString.toString());
				return errorString.toString();
			}
			return errorString.toString();
		}

	}

	public void delete(T entity){
		repository().delete(entity);
	}

	public void deleteById(ID id){
		repository().deleteById(id);
	}

	public void deleteInBatch(List<T> entities){
		repository().deleteAllInBatch(entities);
	}

	public List<T> findAll(){
		Iterable<T> allObjects = repository().findAll();
		List<T> objectList = new ArrayList<>();
		allObjects.forEach(objectList::add);
		return objectList;
	}

	public boolean notEmpty() {
		return ( repository().count() > 0 );
	}
}
