export const ROLE_URLS = {
  GET_ROLES: "roles",
};

export const AUTH_URLS = {
  LOGIN_PAGE: "/login",
  LOGOUT_PAGE: "/logout",
  CHANGE_PASSWORD_PAGE: "/change-password",
  GET_EMPLOYEE_DATA: "auth/employee-data",
  POST_LOGIN: "auth/login",
  PUT_CHANGE_PASSWORD: "auth/changepassword",
  POST_LOGOUT: "auth/signout",
};
export const ADMIN_URLs = {
  HOME: "/admin",
  EDIT_PAGE: "/admin/edit",
  NOTIFICATION_PAGE: "/admin/notifications",
  EMPLOYEES_PAGE: "/admin/employees",
  STATISTICS_PAGE: "/admin/statistics",
  GET_FULL_EMPLOYEES: "admin/full-employees",
  POST_REGISTRATION: "admin/register",
  GET_EMPLOYEES: "admin/employees",
  GET_PREPARED_FROM_TO: "admin/prepared-from-to",
  GET_PREAPRED_CATEGORIES_FROM_TO: "admin/prepared-categories-from-to",
  PUT_EMPLOYEE_ACCOUNT: "admin/disable-employees",
  PUT_RESET_EMPLOYEE_PASSWORD: "admin/reset-employee-password",
  GET_EVERYONE_BUT_ADMIN: "admin/employees-to-update",
};

export const NOTIFICATION_URLS = {
  NOTIFICATION_PAGE: "/notifications",
  POST_NOTIFICATIONS: "notifications/send",
  GET_EMPLOYEE_NOTIFICATIONS: "notifications/employee-notifications",
  GET_NOTIFICATION_BODY: "notifications/read",
  GET_NOTIFICATIONS_NUMBER: "notifications/number-notifications",
  PUT_HIDE_NOTIFICATION: "notifications/hide",
};

export const NOTIFICATION_STATUS_URLS = {
  PUT_HIDE_NOTIFICATION: "notification-status/hide",
};

export const COOK_URLS = {
  HOME: "cook/",
  PUT_COOK_ORDERS: "employee/cook",
  GET_COOK_ORDERS: "employee/cook/accepted-orders",
  GET_PENDING_ORDERS: "employee/cook/pending-orders",
  PUT_UPDATE_ORDER_STATUS: "employee/cook",
  PUT_RELEASE_ORDER: "employee/cook/release",
};

export const CATEGORY_URLS = {
  GENERIC_CATEGORY: "category",
  GET_ALL_CATEGORIES: "category/all-categories",
  //GET_CATEGORY_TYPES: 'category/category-types',
  GET_FULL_MENU: "category/categories-dishes",
};

export const TABLE_URLS = {
  BATCH_TABLE: "table/batch",
  GENERIC_TABLE: "table",
  GET_TABLE_BY_ID: "table/table-by-id",
  GET_TABLES_INDEXES: "table/indexes",
};

export const DISH_URLS = {
  GENERIC_DISH: "dish",
  GET_DISHES_OF_CATEGORY: "dish/dishes-of-category",
  POST_AUTOCOMPLETE: "dish/autocomplete",
  PUT_DISHES_CATEGORY: "dish/dishes-category",
};

export const TRANSACTION_URLS = {
  //GET_TRANSACTION: "transaction",
  //POST_TRANSACTION: 'transaction/newtransaction',
  GET_OPEN_TRANSACTIONS: "transaction/get-open-transactions",
  GET_SINGLE_TRANSACTION: "transaction/get-transaction",
  GET_VERIFY_TRANSACTION: "transaction/verify",
  PUT_COMPLETE_TRANSACTION: "transaction/complete",
  POST_FULL_CART: "transaction/full-cart",
  GET_TABLES: "transaction/get-tables",
};

export const WAITER_URLS = {
  HOME: "/waiter",
  ORDERS_PAGE: "/waiter/orders",
  COMPLETE_PAGE: "/waiter/complete",
  POST_NEW_ORDER: "employee/waiter",
};
export const METHODS = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};
