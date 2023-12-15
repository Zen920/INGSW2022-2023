import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getEveryEmployeeButAdmin } from "../../../services/api/EmployeeInformationsRequests";
import EditEmployeeForm from "./EditEmployee/EditEmployeePage";
import ResetEmployeePasswordForm from "./EditEmployee/ResetEmployeePasswordPage";
import LoadingScreen from "../../common/Loading/LoadingScreen";
import Registration from "./Registration/RegistrationPage";
import SnackBarContext from "../../../services/contexts/SnackBarContext";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminEmployeeManagementComponent() {
  const [value, setValue] = useState(0);
  const [employeeTab, setEmployeeTab] = useState(0);
  const [employees, setEmployees] = useState(undefined);
  const [refreshEmployees, setRefreshEmployees] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);

  const handleEmployeeUsernames = useCallback((registeredEmployee) => {
    setRefreshEmployees(true)
    //setEmployees(...employees, registeredEmployee )
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchEmployees = async () => {
    setEmployees(
      await getEveryEmployeeButAdmin(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity
      )
    );
  };
  useEffect(() => {
    fetchEmployees();

    setLoading(false);
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);

  useEffect(() => {
    if(refreshEmployees){
      fetchEmployees();
      setRefreshEmployees(false)
    }
  }, [refreshEmployees])
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Box
      maxWidth={"3000px"}
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      mt={3}
      padding={0.5}
    >
      <Tabs value={value} onChange={handleChange} aria-label="Category panel">
        <Tab
          sx={{
            fontSize: "11px",
          }}
          label={t("main.admin.employees.tabs.registration")}
          {...a11yProps(0)}
          onClick={() => setEmployeeTab(0)}
        />
        <Tab
          sx={{
            fontSize: "11px",
          }}
          label={t("main.admin.employees.tabs.edit")}
          {...a11yProps(1)}
          onClick={() => setEmployeeTab(1)}
        />
      </Tabs>
      {employeeTab === 0 && <Registration handleEmployeeUsernames={handleEmployeeUsernames}/>}
      {employeeTab === 1 && (
        <Box width="100%" display="flex" flexDirection={"column"}>
          <EditEmployeeForm employees={employees} />
          <ResetEmployeePasswordForm employees={employees} />
        </Box>
      )}
    </Box>
  );
}
