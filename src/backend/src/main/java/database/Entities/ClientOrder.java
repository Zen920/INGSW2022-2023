package database.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

import static utility.ConstantMessages.NOT_NULL_MESSAGE;

/**
 * ClientOrder entity
 *
 * Identifies an order entry for a specific transaction
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
@Table(name = "client_order")
public class ClientOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "client_order_generator")
	@SequenceGenerator(name = "client_order_generator", sequenceName = "client_order_seq", allocationSize = 1)
	@Column(name = "id_order")
	private long idOrder;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "clientOrder", cascade = CascadeType.REMOVE)
	private List<ItemOrderList> itemOrderLists;


	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idTransaction")
	@JsonIdentityReference(alwaysAsId = true)
	@ManyToOne
	private OrderTransaction orderTransaction;

}
