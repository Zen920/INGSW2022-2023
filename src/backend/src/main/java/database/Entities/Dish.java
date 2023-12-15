package database.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import database.Enums.CategoryType;
import org.hibernate.annotations.ColumnDefault;
import utility.ResponseEntityErrorCodes.*;

import java.math.BigDecimal;

import static utility.ConstantMessages.*;
import static utility.ResponseEntityErrorCodes.*;

/**
 * Dish entity
 * <p>
 * Identifies an aliment which is available for serving
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "dish")
public class Dish {
	// If false menù will be ordered by Index, else by category
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dish_generator")
	@SequenceGenerator(name = "dish_generator",sequenceName = "dish_seq", allocationSize = 1)
	@Column(name = "id_dish")
	private long idDish;

	@NotBlank(message = DISH_NAME_IS_NULL)
	@Size(min = 3, max = 80, message = DISH_NAME_LENGTH)
	@Column(name = "dish_name", unique = true, columnDefinition = "TEXT")
	private String dishName;

	@NotBlank(message = DISH_DESCRIPTION_IS_NULL)
	@Size(min = 5, max = 255, message = DISH_DESCRIPTION_LENGTH)
	@Column(name = "dish_description", columnDefinition = "TEXT")
	private String dishDescription;

	@Column(name = "allergens", columnDefinition = "TEXT")
	@Size(max = 255, message = DISH_ALLERGENS_LENGTH)
	private String allergens;

	@NotNull(message = DISH_INDEX_IS_NULL)
	@Positive(message = DISH_INDEX_POSITIVE)
	@Column(name = "index")
	private long index;

	@NotNull(message = DISH_PRICE_IS_NULL)
	@Positive(message = DISH_PRICE_POSITIVE)
	@Column(name = "price")
	private BigDecimal price;

	@Builder.Default
	@Column(name = "on_sale")
	@ColumnDefault("'true'")
	private boolean onSale = true;
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "id_category")
	private Category category;


}
