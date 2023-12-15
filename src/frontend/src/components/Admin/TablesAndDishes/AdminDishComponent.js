import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WebSocketContext from "../../../hooks/MyWebSocket";
import { getCategories } from "../../../services/api/CategoriesRequests";
import { getDishes } from "../../../services/api/DishRequests";
import { getTableNumbers } from "../../../services/api/TableRequests";
import AuthContext from "../../../services/contexts/AuthContext";
import SnackBarContext from "../../../services/contexts/SnackBarContext";
import LoadingScreen from "../../common/Loading/LoadingScreen";
import CategoriesComponent from "./Categories/CategoriesComponent";
import DishesComponent from "./Dishes/DishesComponent";
import TableComponent from "./Tables/TableComponent";
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
export default function DishComponent() {
  const { t } = useTranslation();
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tables, setTables] = useState([]);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [categoryTab, setCategoryTab] = useState(0);
  const [tableTab, setTableTab] = useState(0);
  const [isManual, setIsManual] = useState(0);
  const [loading, setLoading] = useState(true);
  const { employee } = useContext(AuthContext);
  const { updates } = useContext(WebSocketContext);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);
  const handleSetCategories = useCallback((value, operation) => {
    if (operation === "delete") {
      setCategories(value);
    } else {
      setCategories(value);
    }
  }, []);

  const handleSetDishes = useCallback((value) => {
    setDishes(value);
  }, []);

  const handleSetTables = useCallback((value) => {
    setTables(value);
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  const handleChange3 = (event, newValue) => {
    setValue3(newValue);
  };

  useEffect(() => {
    setLoading(false);

    const fetchTables = async () => {
      setTables(
        await getTableNumbers(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity
        )
      );
    };
    const fetchCategories = async () => {
      setCategories(
        await getCategories(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          {
            fetchAll: true,
          }
        )
      );
    };
    const fetchDishes = async () => {
      setDishes(
        await getDishes(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity
        )
      );
    };
    fetchDishes();
    fetchCategories();
    fetchTables();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);

  useEffect(() => {
    if (updates.setter !== "" && updates?.setter !== employee.username) {
      handleSetOpenSnack(true);
      handleMessageInfo(
        t(
          "warnings.dishes.correctUpdate." +
            updates.modified +
            "." +
            updates.operation,
          { updated: updates.updated }
        )
      );
      handleSetSeverity("warning");
    }
  }, [updates, handleSetOpenSnack, handleMessageInfo, handleSetSeverity, t]);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Grid
      container
      display="flex"
      justifyContent={"center"}
      flexWrap="wrap"
      mt={3}
      padding={1}
      sx={{
        color: "primary.main",
        minWidth: { xs: "100%" },
        maxWidth: "3000px",
        minHeight: { xs: "100%" },
      }}
    >
      <Grid
        padding={1}
        xs={12}
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        md={6}
      >
        <TableComponent
          tables={tables}
          handleSetTables={handleSetTables}
          a11yProps={a11yProps}
          t={t}
          handleChange={handleChange3}
          value={value3}
        />
      </Grid>

      <Grid
        padding={1}
        xs={12}
        md={6}
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
      >
        <CategoriesComponent
          categories={categories}
          handleSetCategories={handleSetCategories}
          a11yProps={a11yProps}
          t={t}
          handleChange={handleChange2}
          value={value2}
        />
      </Grid>
      <Grid
        padding={1}
        xs={12}
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
      >
        <DishesComponent
          categories={categories}
          handleSetDishes={handleSetDishes}
          dishes={dishes}
          handleSetCategories={handleSetCategories}
          a11yProps={a11yProps}
          t={t}
          handleChange={handleChange}
          value={value}
        />
      </Grid>
    </Grid>
  );
}
