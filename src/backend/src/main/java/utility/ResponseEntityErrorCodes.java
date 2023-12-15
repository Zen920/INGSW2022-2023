package utility;

import jakarta.validation.constraints.NotNull;

public class ResponseEntityErrorCodes {


	/*
		==== Token ====

	*/
	public static final String INVALID_REFRESH_TOKEN = "errors.token.refreshNotValid";

	/*
		==== Employee ====
	*/
	public static final String EMPLOYEE_ALREADY_EXISTS = "errors.employee.alreadyExists";
	public static final String EMPLOYEE_ACCOUNT_DISABLED = "errors.employee.accountDisabled";

	public static final String EMPLOYEE_NOT_FOUND = "errors.employee.notFound";
	public static final String EMPLOYEE_PASSWORD_NOT_VALID = "errors.employee.passwordNotValid";
	public final static String PASSWORD_MISMATCH = "errors.employee.passwordMismatch";
	public final static String PASSWORD_MATCH = "errors.employee.passwordMatch";
	public final static String EMPLOYEE_USERNAME_IS_NULL = "errors.employee.usernameIsNull";
	public final static String EMPLOYEE_USERNAME_LENGTH = "errors.employee.usernameLength{4}{20}";
	public final static String EMPLOYEE_PASSWORD_IS_NULL = "errors.employee.passwordIsNull";
	public final static String EMPLOYEE_PASSWORD_LENGTH = "errors.employee.passwordLength{7}{20}";
	public final static String EMPLOYEE_PASSWORD_PATTERN = "errors.employee.pattern";

	public final static String EMPLOYEE_ROLE_IS_NULL = "errors.employee.roleIsNull";

	/*


		==== Role ====
	*/
	public static final String ROLE_NOT_FOUND = "errors.role.notFound";
	public static final String ROLE_EMPLOYEE_ROLE_IS_NULL = "errors.role.employeeRoleIsNull";
	/*
		==== Transaction ====
	*/
	public static final String TRANSACTION_NOT_FOUND = "errors.transaction.notFound";
	public static final String TRANSACTION_ALREADY_COMPLETED = "errors.transaction.alreadyCompleted";
	public static final String TRANSACTION_IS_COMPLETED_IS_NULL = "errors.transaction.isCompletedIsNull";
	public static final String TRANSACTION_DATE_IS_NULL = "errors.transaction.dateIsNull";


	/*
		==== Dish ====
	*/
	public static final String DISH_ALREADY_EXISTS = "errors.dish.alreadyExists";
	public static final String DISH_NOT_FOUND = "errors.dish.notFound";

	public static final String DISH_NAME_IS_NULL = "errors.dish.nameIsNull";
	public static final String DISH_NAME_LENGTH = "errors.dish.nameLength{3}{80}";
	public static final String DISH_DESCRIPTION_IS_NULL = "errors.dish.descriptionIsNull";
	public static final String DISH_DESCRIPTION_LENGTH = "errors.dish.descriptionLength{3}{80}";
	public static final String DISH_ALLERGENS_LENGTH = "errors.dish.allergensLength{0}{255}";

	public static final String DISH_INDEX_IS_NULL = "errors.dish.indexIsNull";
	public static final String DISH_INDEX_POSITIVE = "errors.dish.indexPositive";

	public static final String DISH_PRICE_IS_NULL = "errors.dish.priceIsNull";
	public static final String DISH_PRICE_POSITIVE = "errors.dish.pricePositive";
	/*

	==== Category ====
	*/
	public static final String CATEGORY_ALREADY_EXISTS = "errors.category.alreadyExists";
	public static final String CATEGORY_NOT_FOUND = "errors.category.notFound";
	public static final String CATEGORY_NAME_IS_NULL = "errors.category.nameIsNull";

	public static final String CATEGORY_NAME_BLANK = "errors.category.nameIsBlank";

	/*
	==== OFF ====
	*/
	public static final String EXTERNAL_API_TIMEOUT = "errors.externalAPI.timeout";
	public static final String EXTERNAL_API_MISMATCHED_TYPE = "errors.externalAPI.mismatch";

	/*
	==== ItemOrderList ====
	*/

	public static final String ITEM_ORDER_LIST_NOT_FOUND = "errors.itemOrderList.notFound";
	public static final String ITEM_ORDER_LIST_CANCELLED = "errors.itemOrderList.cancelled";

	public static final String ITEM_ORDER_LIST_QUANTITY_IS_NULL = "errors.itemOrderList.quantityIsNull";
	public static final String ITEM_ORDER_LIST_QUANTITY_POSITIVE = "errors.itemOrderList.quantityPositive";

	public static final String ITEM_ORDER_LIST_STATUS_IS_NULL = "errors.itemOrderList.statusIsNull";


		/*
	==== ClientTable ====
	*/

	public static final String CLIENT_TABLE_NOT_FOUND = "errors.clientTable.notFound";

	public static final String CLIENT_TABLE_INDEX_IS_NULL = "errors.clientTable.indexIsNull";

	public static final String CLIENT_TABLE_INDEX_POSITIVE = "errors.clientTable.indexPositive";
	public static final String CLIENT_TABLE_IS_OCCUPIED_IS_NULL = "errors.clientTable.isOccupiedIsNull";



		/*
	==== NOTIFICATION ====
	*/

	public static final String NOTIFICATION_TITLE_IS_NULL = "errors.notification.titleIsNull";
	public static final String NOTIFICATION_TITLE_LENGTH = "errors.notification.titleLength{3}{40}";
	public static final String NOTIFICATION_BODY_IS_NULL = "errors.notification.bodyIsNull";
	public static final String NOTIFICATION_BODY_LENGTH = "errors.notification.bodyLength{3}{255}";


		/*
	==== NOTIFICATION STATUS====
	*/

	public static final String NOTIFICATION_STATUS_EMPLOYEE_IS_NULL = "errors.notificationStatus.employeeIsNull";
	public static final String NOTIFICATION_STATUS_NOTIFICATION_IS_NULL = "errors.notificationStatus.notificationIsNull";
}
