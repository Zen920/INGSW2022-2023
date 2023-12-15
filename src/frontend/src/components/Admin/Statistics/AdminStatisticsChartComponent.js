import { Grid } from "@mui/material";
import MyResponsiveBar from "./Charts/ResponsiveBar";
import MyResponsivePie from "./Charts/ResponsivePie";
import MyResponsiveLine from "./Charts/ResponsiveLineChart";
const AdminStatisticsChartComponent = ({
  dishesPrepared,
  dishesPrepared2,
  categoriesPrepared,
  categoriesPrepared2,
  comparision,
  theme,
  employeeOne,
  employeeTwo,
  t,
}) => {

  return (
    <>
    <Grid
      container
      alignContent="center"
      justifyItems="center"
      justifyContent="center"
      minWidth={"100%"}
      maxWidth={"2000px"}
    >
      {dishesPrepared && dishesPrepared?.length > 0 && (
        <Grid item xs={12} sm={12} md={12} lg={6} height="350px">
          <MyResponsiveBar
            data={dishesPrepared}
            username={employeeOne}
            theme={theme}
            legendLabel={t("main.admin.statistics.charts.bar.legendLabel", {
              cook: employeeOne,
            })}
            bottomLabel={t("main.admin.statistics.charts.bar.bottomLabel")}
          />
        </Grid>
      )}

      {dishesPrepared2 && dishesPrepared2?.length > 0 && (
        <Grid item xs={12} sm={12} md={12} lg={6} height="350px">
          <MyResponsiveBar
            data={dishesPrepared2}
            username={employeeTwo}
            theme={theme}
            legendLabel={t("main.admin.statistics.charts.bar.legendLabel", {
              cook: employeeTwo,
            })}
            bottomLabel={t("main.admin.statistics.charts.bar.bottomLabel")}
          />
        </Grid>
      )}
      {categoriesPrepared && dishesPrepared?.length > 0 && (
        <Grid item xs={12} sm={12} md={12} lg={6} height="350px">
          <MyResponsivePie
            data={categoriesPrepared}
            username={employeeOne}
            theme={theme}
          />
        </Grid>
      )}
      {categoriesPrepared2 && (
        <Grid item xs={12} sm={12} md={12} lg={6} maxHeight="350px">
          <MyResponsivePie
            data={categoriesPrepared2}
            username={employeeTwo}
            theme={theme}
          />
        </Grid>
      )}

      {comparision && comparision?.length > 0 && dishesPrepared && dishesPrepared2  && (
        <Grid item xs={12} sm={12} md={12} lg={6} height="450px">
          <MyResponsiveLine
            data={comparision}
            theme={theme}
            bottomLabel={t("main.admin.statistics.charts.bar.bottomLabel")}
            lineLabel={t("main.admin.statistics.charts.line.legendLabel", {
              cook: employeeOne,
              cook2: employeeTwo,
            })}
          />
        </Grid>
      )}
    </Grid>
    </>
  );
};
export default AdminStatisticsChartComponent;
