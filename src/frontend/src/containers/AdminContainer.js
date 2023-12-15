import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "../components/common/Loading/LoadingScreen";
import AdminMiniDrawer from "../components/Admin/Toolbar/AdminToolbar";
import { useTranslation } from "react-i18next";
export default function AdminComponent() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Box display="flex" alignContent="center" justifyContent="center">
      <Box maxWidth="10vw" maxHeight="200px">
        <AdminMiniDrawer
          supervisorPages={t("main.supervisorsidebar.pages", {
            returnObjects: true,
          })}
          supervisorRefs={["edit", "notifications"]}
          adminPages={t("main.adminsidebar.pages", { returnObjects: true })}
          adminRefs={["statistics", "employees"]}
        />
      </Box>
      <Box
        width="80vw"
        display="flex"
        alignContent="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
