package database.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import database.Enums.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import utility.ResponseEntityErrorCodes;

import java.math.BigDecimal;

import static utility.ConstantMessages.PRICE_MESSAGE;
import static utility.ResponseEntityErrorCodes.*;

/**
 * ItemOrderList entity
 *
 * Wrapper for aliments-quantity
 */
@Entity
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class ItemOrderList {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_order_list_generator")
	@SequenceGenerator(name="item_order_list_generator",sequenceName = "item_order_list_seq", allocationSize = 1)
	@Column(name = "id_item")
	private long idItem;

	@Column(name ="additional_notes", columnDefinition = "TEXT")
	private String additionalNotes;

	@NotNull(message = ITEM_ORDER_LIST_QUANTITY_IS_NULL)
	@Positive(message = ITEM_ORDER_LIST_QUANTITY_POSITIVE)
	@Column(name = "quantity")
	private int quantity;
	@Builder.Default
	@NotNull(message = ITEM_ORDER_LIST_STATUS_IS_NULL)
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private StatusEnum status = StatusEnum.WAITING;
	@ManyToOne
	@JoinColumn(name = "id_dish")
	private Dish dish;

	@OneToOne
	@JoinColumn(name = "id_employee")
	private Employee employee;
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idOrder")
	@JsonIdentityReference(alwaysAsId = true)
	@ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	private ClientOrder clientOrder;
}
