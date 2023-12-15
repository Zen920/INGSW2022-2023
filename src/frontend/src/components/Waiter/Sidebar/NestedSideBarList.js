import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
export default function NestedSideBarList(props) {
  const { content, category } = props;
  const handleClickToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const MainList = ({ item, index, isMain }) => {
    const [open, setOpen] = React.useState(false);
    const handleListItemClick = (index, item, isMain) => {
      if (!open) {
        handleClickToSection(item + index);
      }
      if (isMain) {
        setOpen(!open);
      }
    };

    return (
      <>
        <ListItemButton
          key={"MainButton " + category + item + index}
          alignItems="center"
          dense={true}
          onClick={() => handleListItemClick(index, item.categoryType, true)}
        >
          <ListItemText
            disableTypography
            sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            primary={item.categoryType}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ maxHeight: "80vh", overflow: "auto" }}
          >
            {item.dishes.map((dish, index) => (
              <ListItemButton
                key={"SubButton#" + category + dish.dishName + index}
                alignItems="center"
                dense={true}
                sx={{
                  "&:hover": {
                    backgroundColor: "#3f6767",
                  },
                }}
                onClick={() =>
                  handleListItemClick(index, "Dish#" + dish.dishName, false)
                }
              >
                <ListItemText primary={dish.dishName} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <Box
      width="100%"
      display={"flex"}
      flexDirection={"column"}
      justifySelf={"right"}
      alignContent="right"
      justifyItems="right"
      justifyContent="right"
      top={65}
      right={0}
      position="sticky"
    >
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {category}
          </ListSubheader>
        }
      >
        {content.map((item, index) => (
          <MainList item={item} index={index} key={"MainList#" + index} />
        ))}
      </List>
    </Box>
  );
}
