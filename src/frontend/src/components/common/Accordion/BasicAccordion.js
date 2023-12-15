import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useContext } from "react";
import { hideNotification } from "../../../services/api/NotificationsRequests";
import AuthContext from "../../../services/contexts/AuthContext";
export default function BasicAccordion(props) {
  const { handleNotificationNumber } = useContext(AuthContext);
  const {
    items,
    SetNotificationStatus,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t,
  } = props;
  const hideClickedNotification = async (notificationStatus) => {
    if (
      await hideNotification(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        notificationStatus
      )
    ) {
      handleSetNotificationStatus(notificationStatus);
      handleNotificationNumber("hide");
    }
  };
  const handleSetNotificationStatus = (notificationStatus) => {
    const array = items.filter((data) => data !== notificationStatus);
    SetNotificationStatus(array);
  };
  return (
    <Box id="accordion-box" name="accordion-box">
      {items.map((item, index) => (
        <Accordion
          key={"Accordion#" + item.idNotificationStatus+" "+ index}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={"panel1a-header"+ item.idNotificationStatus+" "+ index}
          >
            <Typography>{item.notification.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography textAlign={"right"}>
              {item.notification.body}
            </Typography>
            <Button
              onClick={() => hideClickedNotification(item)}
              variant="colored-submit"
            >
              <Typography textAlign={"right"}>
                {" "}
                {t("main.employeeNotifications.hide")}
              </Typography>
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
