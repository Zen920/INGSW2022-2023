import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TableForm from "./TableForm";
import UpdateTableForm from "./UpdateTablesForm";

const TableComponent = ({
  tables,
  handleSetTables,
  t,
  handleChange,
  a11yProps,
  value
}) => {
  const [tableTab, setTableTab] = useState(0);
  return (
    <Paper sx={{ padding: 1, minWidth: "100%", minHeight: "100%" }}>
    <Tabs
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Table panel"
    >
      <Tab
        label={t("main.admin.tables.tabs.add")}
        {...a11yProps(7)}
        onClick={() => setTableTab(0)}
      />
      <Tab
        label={t("main.admin.tables.tabs.update")}
        {...a11yProps(8)}
        onClick={() => setTableTab(1)}
      />
    </Tabs>
    {tableTab === 0 && (
      <TableForm setTables={handleSetTables} tables={tables} />
    )}
    {tableTab === 1 && (
      <UpdateTableForm tables={tables} setTables={handleSetTables} />
    )}
  </Paper>
  );
};
export default TableComponent;
