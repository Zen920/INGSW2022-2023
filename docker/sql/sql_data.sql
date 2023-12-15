
CREATE SEQUENCE  IF NOT EXISTS "category_seq";

CREATE SEQUENCE  IF NOT EXISTS "client_order_seq";

CREATE SEQUENCE  IF NOT EXISTS "client_table_seq";

CREATE SEQUENCE  IF NOT EXISTS "dish_seq";

CREATE SEQUENCE  IF NOT EXISTS "employee_seq";

CREATE SEQUENCE  IF NOT EXISTS "item_order_list_seq";

CREATE SEQUENCE  IF NOT EXISTS "notification_seq";

CREATE SEQUENCE  IF NOT EXISTS "notification_status_seq";

CREATE SEQUENCE  IF NOT EXISTS "order_transaction_seq";

CREATE SEQUENCE  IF NOT EXISTS "role_seq";



CREATE TABLE "client_table" ("id_table" BIGINT DEFAULT nextval('client_table_seq') NOT NULL, "is_occupied" BOOLEAN DEFAULT FALSE NOT NULL, "table_number" INTEGER NOT NULL, "usable" BOOLEAN DEFAULT TRUE, CONSTRAINT "client_table_pkey" PRIMARY KEY ("id_table"));

CREATE TABLE "dish" ("id_dish" BIGINT DEFAULT nextval('dish_seq'), "allergens" TEXT, "dish_description" TEXT, "dish_name" TEXT, "index" BIGINT NOT NULL, "on_sale" BOOLEAN DEFAULT TRUE, "price" numeric(38, 2) NOT NULL, "id_category" BIGINT, CONSTRAINT "dish_pkey" PRIMARY KEY ("id_dish"));

CREATE TABLE "employee" ("id_employee" BIGINT DEFAULT nextval('employee_seq') NOT NULL, "account_non_expired" BOOLEAN DEFAULT TRUE, "account_non_locked" BOOLEAN DEFAULT TRUE, "credentials_non_expired" BOOLEAN DEFAULT TRUE, "enabled" BOOLEAN DEFAULT TRUE, "password" VARCHAR(255), "password_resetted" BOOLEAN DEFAULT FALSE, "username" VARCHAR(20), "id_role" BIGINT NOT NULL, CONSTRAINT "employee_pkey" PRIMARY KEY ("id_employee"));

CREATE TABLE "notification_status" ("id_notification_status" BIGINT DEFAULT nextval('notification_status_seq') NOT NULL, "viewed" BOOLEAN DEFAULT FALSE, "id_employee" BIGINT NOT NULL, "id_notification" BIGINT NOT NULL, CONSTRAINT "notification_status_pkey" PRIMARY KEY ("id_notification_status"));

CREATE TABLE "order_transaction" ("id_transaction" BIGINT DEFAULT nextval('order_transaction_seq') NOT NULL, "is_completed" BOOLEAN DEFAULT FALSE NOT NULL, "transaction_date" date NOT NULL, "client_table_id_table" BIGINT, CONSTRAINT "order_transaction_pkey" PRIMARY KEY ("id_transaction"));

CREATE TABLE "category" ("id_category" BIGINT DEFAULT nextval('category_seq') NOT NULL, "category_type" TEXT, "index" INTEGER, CONSTRAINT "category_pkey" PRIMARY KEY ("id_category"));

CREATE TABLE "role" ("id_role" BIGINT DEFAULT nextval('role_seq') NOT NULL, "employee_role" VARCHAR(255) NOT NULL, CONSTRAINT "role_pkey" PRIMARY KEY ("id_role"));

CREATE TABLE "client_order" ("id_order" BIGINT DEFAULT nextval('client_order_seq') NOT NULL, "order_transaction_id_transaction" BIGINT, CONSTRAINT "client_order_pkey" PRIMARY KEY ("id_order"));

CREATE TABLE "item_order_list" ("id_item" BIGINT DEFAULT nextval('item_order_list_seq') NOT NULL, "additional_notes" TEXT, "quantity" INTEGER NOT NULL, "status" VARCHAR(255) NOT NULL, "client_order_id_order" BIGINT, "id_dish" BIGINT, "id_employee" BIGINT, CONSTRAINT "item_order_list_pkey" PRIMARY KEY ("id_item"));

CREATE TABLE "notification" ("id_notification" BIGINT DEFAULT nextval('notification_seq') NOT NULL, "body" TEXT, "title" TEXT, CONSTRAINT "notification_pkey" PRIMARY KEY ("id_notification"));

ALTER TABLE "dish" ADD CONSTRAINT "uk_gv2nha1oyj78a16sit0u93xch" UNIQUE ("dish_name");

ALTER TABLE "employee" ADD CONSTRAINT "uk_im8flsuftl52etbhgnr62d6wh" UNIQUE ("username");

ALTER TABLE "category" ADD CONSTRAINT "uk_7c3243soeeq0cgcerl2jqirit" UNIQUE ("category_type");

ALTER TABLE "role" ADD CONSTRAINT "uk_goef19j5erg9pn7p488hr9ou8" UNIQUE ("employee_role");

ALTER SEQUENCE "category_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by category.id_category;

ALTER SEQUENCE "client_order_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by client_order.id_order;

ALTER SEQUENCE "client_table_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by client_table.id_table;

ALTER SEQUENCE "dish_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by dish.id_dish;
ALTER SEQUENCE "role_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by role.id_role;

ALTER SEQUENCE "employee_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by employee.id_employee;

ALTER SEQUENCE "item_order_list_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by item_order_list.id_item;

ALTER SEQUENCE "notification_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by notification.id_notification;

ALTER SEQUENCE  "notification_status_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by notification_status.id_notification_status;

ALTER SEQUENCE  "order_transaction_seq" AS bigint START WITH 1 INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 owned by order_transaction.id_transaction;


ALTER TABLE "client_order" ADD CONSTRAINT "fk6pbqbbwj9jxkqr9qcp5ydwj7b" FOREIGN KEY ("order_transaction_id_transaction") REFERENCES "order_transaction" ("id_transaction") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "notification_status" ADD CONSTRAINT "fk77ouyu8nl4s1n4m5ps0i7c23i" FOREIGN KEY ("id_notification") REFERENCES "notification" ("id_notification") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "dish" ADD CONSTRAINT "fk7key0vvq4wle50scpjvg1juq4" FOREIGN KEY ("id_category") REFERENCES "category" ("id_category") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "notification_status" ADD CONSTRAINT "fkiv3wacj9eurfvklhbggak6ocd" FOREIGN KEY ("id_employee") REFERENCES "employee" ("id_employee") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "item_order_list" ADD CONSTRAINT "fkm7dcaswgpc8ogiv2cnbt4f1o9" FOREIGN KEY ("id_employee") REFERENCES "employee" ("id_employee") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "item_order_list" ADD CONSTRAINT "fkmb8usxnrcy2a88lun67wmj0fc" FOREIGN KEY ("client_order_id_order") REFERENCES "client_order" ("id_order") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "employee" ADD CONSTRAINT "fknuack8282ftag72johkicpnhl" FOREIGN KEY ("id_role") REFERENCES "role" ("id_role") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "order_transaction" ADD CONSTRAINT "fkqx92arud7em0i9fdscj0x972x" FOREIGN KEY ("client_table_id_table") REFERENCES "client_table" ("id_table") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "item_order_list" ADD CONSTRAINT "fkrkha0a1t8qcl42dhqleenfsc0" FOREIGN KEY ("id_dish") REFERENCES "dish" ("id_dish") ON UPDATE NO ACTION ON DELETE NO ACTION;