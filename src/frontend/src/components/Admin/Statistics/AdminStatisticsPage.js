import { useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getEmployees } from "../../../services/api/EmployeeInformationsRequests";
import SnackBarContext from "../../../services/contexts/SnackBarContext";
import { messages } from "../../../utilities/constants/ConstantMessages";
import StatisticsForm from "./StatisticsForm";
import AdminStatisticsChartComponent from "./AdminStatisticsChartComponent";
export default function StatisticsComponent() {
  const theme = useTheme();
  const [employees, setEmployees] = useState(undefined);
  const [employeeOne, setEmployeeOne] = useState("");
  const [employeeTwo, setEmployeeTwo] = useState("");
  const { t } = useTranslation();
  const [dishesPrepared, setDishesPrepared] = useState(undefined);
  const [categoriesPrepared, setCategoriesPrepared] = useState(undefined);
  const [dishesPrepared2, setDishesPrepared2] = useState();
  const [categoriesPrepared2, setCategoriesPrepared2] = useState(undefined);
  const [comparision, setComparision] = useState(undefined);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);

  const handleFetchCategoriesPrepared = useCallback(async (value, value2) => {
    setCategoriesPrepared(value);
    setCategoriesPrepared2(value2);
  }, []);

  const handleDishesPrepared = useCallback(
    async (value, value2, username, username2) => {
      let message = "";
      var bol = false;
      setDishesPrepared2();
      setDishesPrepared();
      setEmployeeOne();
      setEmployeeTwo();

      if (value.length > 0) {
        setDishesPrepared(value);
        setEmployeeOne(username);
      } else {
        message = t("warningMessages.missingCookData", { n1: username });
        bol = true;
      }
      if (username2) {
        if (value2.length > 0) {
          setDishesPrepared2(value2);
          setEmployeeTwo(username2);
        } else {
          if(bol){
            message = message.concat("\n"+t("warningMessages.missingCookData", { n1: username2 }));
          }else{
            message = t("warningMessages.missingCookData", { n1: username2 });
          }
        }
      }
      if (message !== "") {
        handleSetOpenSnack(true);
        handleMessageInfo(message);
        handleSetSeverity("warning");
      }
    },
    [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]
  );
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmployees(
        await getEmployees(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity
        )
      );
    };
    fetchEmployees();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);

  useEffect(() => {
    if (dishesPrepared && dishesPrepared2) {
      let renamedDishesPrepared = dishesPrepared.map((item) => ({
        x: item.day,
        y: item.dishesprepared,
      }));
      let renamedDishesPrepared2 = dishesPrepared2.map((item) => ({
        x: item.day,
        y: item.dishesprepared,
      }));

      let struct = {
        id: employeeOne,
        data: renamedDishesPrepared,
      };
      let struct2 = {
        id: employeeTwo,
        data: renamedDishesPrepared2,
      };

      setComparision([struct, struct2]);
    }
  }, [dishesPrepared, dishesPrepared2, employeeOne, employeeTwo]);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        width: { xs: "85vw", md: "70vw", lg: "80vw" },
      }}
    >
      <Grid xs={12}>
        <StatisticsForm
          list={employees}
          setCategoriesPrepared={handleFetchCategoriesPrepared}
          setDishesPrepared={handleDishesPrepared}
        />
      </Grid>
      {(dishesPrepared || dishesPrepared2) && (
        <AdminStatisticsChartComponent
          employeeOne={employeeOne}
          employeeTwo={employeeTwo}
          dishesPrepared={dishesPrepared}
          dishesPrepared2={dishesPrepared2}
          categoriesPrepared={categoriesPrepared}
          categoriesPrepared2={categoriesPrepared2}
          theme={theme}
          t={t}
          comparision={comparision}
        />
      )}
    </Grid>
  );
}
