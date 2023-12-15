package database.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.common.aliasing.qual.Unique;
import org.hibernate.annotations.ColumnDefault;
import utility.ResponseEntityErrorCodes;

import static utility.ConstantMessages.NOT_NULL_MESSAGE;
import static utility.ResponseEntityErrorCodes.*;

/**
 * ClientTable entity
 *
 * Identifies the ‹phyisical table› which holds the transaction
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "client_table")
public class ClientTable {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "client_table_generator")
	@SequenceGenerator(name = "client_table_generator",sequenceName = "client_table_seq", allocationSize = 1)
	@Column(name = "id_table")
	private long idTable;
	@Column(name = "table_number",  unique = true)
	@NotNull(message = CLIENT_TABLE_INDEX_IS_NULL)
	@Positive(message = CLIENT_TABLE_INDEX_POSITIVE)
	private int tableNumber;

	@Builder.Default
	@Column(name ="usable")
	@ColumnDefault("'true'")
	private boolean usable = true;
	@NotNull(message = CLIENT_TABLE_IS_OCCUPIED_IS_NULL)
	@Column(name = "is_occupied")
	@ColumnDefault("'false'")
	private boolean isOccupied;

	public ClientTable (int tableNumber){
		this.tableNumber = tableNumber;
	}
}
