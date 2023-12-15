

-- Tavoli disponibili del ristorante
INSERT INTO client_table (is_occupied, table_number, usable) VALUES
	(false, 1, true), 
	(false, 2, true), 
	(false, 3, true), 
	(false, 4, false),
	(false, 5, true); 

-- Categorie alimentari
INSERT INTO category (category_type, index) VALUES 
	('Antipasti', 1),
	('Primi piatti', 2), 
	('Secondi piatti', 3), 
	('Pizze, fritti e panuozzi', 4), 
	('Dolci', 5), 
	('Frutta', 6), 
	('Bevande light', 7), 
	('Alcolici e Liquori', 8);

-- Pietanze disponibili
INSERT INTO dish (allergens, dish_description, dish_name, index, on_sale, price, id_category) VALUES
	('', 'Patatine fritte artigianali tagliate e fritte al momento', 'Patatine fritte', 1, true, 3.50, 1),
	('', 'Involitini primavera', 'Involtini primavera', 1, true, 4.50, 1),

	-- Primi piatti
	('Solfiti, molluschi', 'Spaghetti alle vongole con pasta fatta in casa', 'Spaghetti alle vongole', 1, true, 8.50, 2),
	('Glutine', 'Tagliatelle con ragù alla bolognese', 'Tagliatelle alla bolognese', 1, true, 7.50, 2),

	-- Secondi piatti
	('Solfiti, molluschi', 'La bistecca alla fiorentina è una specialità tipica toscana. Il taglio proposto è di 300g.', 'Bistecca alla fiorentina', 1, true, 18.50, 3),
	('Glutine, pollo', 'Cotoletta di pollo, ideale per i bambini.', 'Cotoletta di pollo', 1, true, 5.50, 3),
	
	-- Pizze e panuozzi
	('Glutine, latticini', 'Pizza margherita tradizionale napoletana.', 'Pizza margherita', 1, true, 4.50, 4),
	('Glutine, latticini', 'Pizza marinara tradizionale napoletana', 'Pizza marinara', 1, true, 3.50, 4),
	('Glutine, latticini', 'Panuozzo mozzarella e cotto', 'Panuozzo mozzarella e cotto', 1, true, 3.00, 4),
	('Glutine, latticini', 'Pizza fritta cicoli e ricotta', 'Pizza fritta cigoli e ricotta', 1, true, 4.50, 4),
	('Glutine, latticini', 'Frittata di maccheroni con ripieno a scelta tra patatine e wurstel, guanciale, friarielli.', 'Frittata di maccheroni', 1, true, 4.50, 4),

	-- Dolci
	('Uova, latticini, frutta a guscio', 'Tiramisù proposto in coppetta.', 'Tiramisù', 1, true, 5.50, 5),
	('Uova, latticini, glutine, frutta secca', 'Fetta di crostata di mele', 'Crostata di mele', 1, true, 3.50, 5),
	('Uova, latticini, glutine, frutta secca', 'Fetta di sbriciolata di nocciole', 'Sbriciolata', 1, true, 4.50, 5),

	-- Frutta
	('Frutta', 'Frutta stagionale a cubetti in vaschetta', 'Macedonia stagionale a cubetti', 6, true, 4.50, 7),
	('Frutta', 'Frutta tropicale ed importata', 'Macedonia tropicale', 6, true, 3.50, 7),

	-- Bevande light
	('', 'Bottiglia in vetro di acqua naturale RATATOUILLE da 0.75L', 'Acqua naturale', 6, true, 2.50, 7),
	('', 'Bottiglia in vetro di acqua frizzante RATATOUILLE da 0.75L', 'Acqua frizzante', 6, true, 2.50, 7),
	('Aspartame', 'Coca Cola Light 0.33L', 'Coca Cola Light', 6, true, 3, 7),
	('', 'Coca Cola 0.33L', 'Coca Cola', 6, true, 3, 7),
	('', 'Fanta 0.33L', 'Fanta', 6, true, 3, 7),
	('', 'Sprite 0.33L', 'Sprite', 6, true, 3, 7),

	-- Bevande alcoliche
	('SO2 e solfiti', 'Grappa tipica toscana in porzione da 100ml pensata per più persone', 'Grappa toscana', 7, true, 6.00, 8),
	('SO2 e solfiti', 'Vino Rosso artiginale RATATOUILLE, caraffa da 1L', 'Vino Rosso', 7, true, 8.35, 8),
	('SO2 e solfiti', 'Vino Bianco artiginale RATATOUILLE, caraffa da 1L', 'Vino Bianco', 7, true, 12.63, 8),
	('SO2 e solfiti', 'shot di meloncello', 'Meloncello', 7, true, 2, 8),
	('SO2 e solfiti', 'shot di limoncello', 'Limoncello', 7, true, 2, 8),
	('Glutine, luppolo', 'Birra RATATOUILLE alla spina 0.33L 8%', 'Birra 0.33L', 7, true, 4.50, 8),
	('Glutine, luppolo', 'Birra RATATOUILLE alla spina 1.0L 8%', 'Birra 1.0L', 7, true, 6, 8);

-- Ruoli
INSERT INTO role (employee_role) VALUES
	('ROLE_ADMIN'), ('ROLE_SUPERVISOR'), ('ROLE_COOK'), ('ROLE_WAITER');

-- Dipendenti registrati
INSERT INTO employee (account_non_expired, account_non_locked, credentials_non_expired, enabled, password, password_resetted, username, id_role) VALUES
	(true, true, true, true, '$2a$10$IaUH4tmBJPWs31hPna8ax.sSLwFmue9U/SfEzn6w7DWMAGSOrIkNa', false, 'admin', 1);
