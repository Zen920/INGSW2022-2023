import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { List, ListItemButton, ListItemText } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import DishDialog from "./DishDialog";

export default function MobileMenu(props) {
  const { categories, t, addToCart } = props;
  const MainList = ({ item, index, isMain }) => {
    const [open, setOpen] = useState(false);
    const handleListItemClick = (index, item, isMain) => {
      if (!open) {
      }
      if (isMain) {
        setOpen(!open);
      }
    };

    return (
      <>
        <ListItemButton
          key={"MainButton "}
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
              <DishDialog
                addToCart={addToCart}
                dish={dish}
                t={t}
                index={index}
                key={"DishDialog" + index}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  };
  return (
    <>
      <List
        sx={{ width: "100%", display: { xs: "block", md: "none" } }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {categories.map((item, index) => (
          <MainList item={item} index={index} key={"MainList#" + index} />
        ))}
      </List>
    </>
  );
}
