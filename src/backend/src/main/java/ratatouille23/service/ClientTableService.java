package ratatouille23.service;

import database.Entities.ClientTable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ratatouille23.repositories.ClientTableRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientTableService extends GenericService<ClientTable, Long> {
	private final ClientTableRepository trepository;
	@Override
	protected ClientTableRepository repository() {
		return trepository;
	}


	public ClientTable createTable () {
		ClientTable lastTable = trepository.findFirstByOrderByIdTableDesc();
		if(lastTable == null){
			return save(defaultNewClientTable(1));
		}
		return save(defaultNewClientTable(lastTable.getTableNumber()+1));
	}

	public ClientTable updateUsability (String id, Boolean result) {
		ClientTable clientTable = trepository.findClientTableByTableNumber(Integer.parseInt(id));
		clientTable.setUsable(result);
		return  saveAndValidate(clientTable);
	}

	public List<ClientTable> updateBatchUsability (List<String> ids, Boolean result) {
		List <ClientTable> list = new ArrayList<>();
		ClientTable clientTable;
		for(String id: ids){
			clientTable = trepository.findClientTableByTableNumber(Integer.parseInt(id));
			clientTable.setUsable(result);
			list.add(clientTable);
		}
		return saveAllAndValidate(list);
	}
	public List<ClientTable> createBatchTable (int toAdd) {
		ClientTable lastTable = trepository.findFirstByOrderByIdTableDesc();
		List<ClientTable> list = new ArrayList<>();
		if(lastTable == null){
			list.add(defaultNewClientTable( 1));
		}else {
			list.add(defaultNewClientTable( lastTable.getTableNumber() + 1));
		}
		lastTable = list.get(0);
		for(int i = 1; i < toAdd; i++){
			list.add(defaultNewClientTable( lastTable.getTableNumber() + 1));
			lastTable = list.get(i);
		}
		return saveAll(list);
	}

	private static ClientTable defaultNewClientTable(int tableNumber) {
		return ClientTable.builder()
				.usable(true)
				.tableNumber(tableNumber)
				.build();
	}

	public List<String> findAllIndexes(){
		return trepository.findAllIndexes();
	}

	public List<ClientTable> findAllByUsableAndOrderInProgress(){
		return trepository.findAllByUsableAndOrderInProgress();
	}

	public ClientTable findClientTableByIdTable(long idTable){
		return trepository.findClientTableByIdTable(idTable);

	}

}
