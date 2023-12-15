package database.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import database.Enums.CategoryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utility.ResponseEntityErrorCodes;

import java.util.List;

import static utility.ResponseEntityErrorCodes.*;

@Entity
@Data
@NoArgsConstructor
@Setter
@Table(name = "category")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_generator")
	@SequenceGenerator(name = "category_generator",sequenceName = "category_seq", allocationSize = 1)
	@Column(name = "id_category")
	private long idCategory;

	@Column(name = "index")
	private int index;

	@Column(name = "category_type", unique = true, columnDefinition = "TEXT")
	@NotBlank(message = CATEGORY_NAME_BLANK)
	private String categoryType;
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "category")
	private List<Dish> dishes;

	public Category (String categoryType, int index){
		this.categoryType = categoryType;
		this.index = index;

	}
}
