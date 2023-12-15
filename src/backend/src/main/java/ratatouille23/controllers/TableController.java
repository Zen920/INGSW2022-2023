package ratatouille23.controllers;

import database.Entities.ClientTable;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ratatouille23.entities.TablesWrapperModel;
import ratatouille23.service.ClientTableService;

import java.util.List;

import static java.lang.Long.parseLong;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/table")
public class TableController {
	private static final Logger logger = LoggerFactory.getLogger(TableController.class);
	private final ClientTableService clientTableService;

	@PostMapping
	public ResponseEntity<ClientTable> createTable(){
		logger.warn("Creating new table");
		return ResponseEntity.status(HttpStatus.CREATED).body(clientTableService.createTable());
	}
	@PostMapping("/batch")
	public ResponseEntity<List<ClientTable>> createBatchTable(@RequestParam int toAdd){
		logger.warn("Creating new tables");
		return  ResponseEntity.status(HttpStatus.CREATED).body(clientTableService.createBatchTable(toAdd));
	}
	@GetMapping("/indexes")
	public ResponseEntity<List<String>> fetchClientTablesIndexes(){
		return ResponseEntity.ok(clientTableService.findAllIndexes());
	}

	@GetMapping
	public ResponseEntity<List<ClientTable>> fetchTablesByUsableAndOrderInProgress(){
		logger.warn("Fetching all client tables.");
		return ResponseEntity.ok(clientTableService.findAllByUsableAndOrderInProgress());
	}


	@PutMapping
	public ResponseEntity<ClientTable> setUnusable (@RequestParam String id, @RequestParam boolean result ){
		return ResponseEntity.ok(clientTableService.updateUsability(id, result));
	}

	@PutMapping("/batch")
	public ResponseEntity<List<ClientTable>> setBatchUnusable (@RequestBody TablesWrapperModel tablesWrapperModel){
		return ResponseEntity.ok(clientTableService.updateBatchUsability(tablesWrapperModel.getIndex(), tablesWrapperModel.getResult()));

	}
	@GetMapping("/table-by-id")
	public ResponseEntity<ClientTable> getTableByID (@RequestParam String id){
		return ResponseEntity.ok(clientTableService.findClientTableByIdTable(parseLong(id)));
	}
	/*@DeleteMapping
	public ResponseEntity<?> deleteLastAddedTable(){
		ClientTable lastTable = clientTableRepository.findFirstByOrderByIdTableDesc();
		if(!lastTable.isOccupied()){
			clientTableRepository.delete((lastTable));
			return ResponseEntity.ok(SUCCESS_MESSAGE);
		}
		return new ResponseEntity<>(ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
	}

		@GetMapping("/table-info")
	public ClientTable getTableInfo(@RequestParam int id){
		logger.warn("Fetching table info");
		return clientTableRepository.findClientTableByTableNumber(id);
	}*/
}
