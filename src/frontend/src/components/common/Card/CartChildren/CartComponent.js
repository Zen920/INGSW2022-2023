import * as React from "react";

import {
  Badge,
  Button,
  IconButton,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Fragment } from "react";

export default function CartComponent(props) {
  const {
    cart,
    getNumberInCart,
    state,
    t,
    removeItem,
    transaction,
    sendData2,
  } = props;
  const ItemOrderList = (props) => {
    const theme = useTheme();
    const { element, index, removeItem } = props;
    const [localQuantity, setLocalQuantity] = useState(element.quantity);
    const increaseQuantity = (index) => {
      cart[index].quantity = cart[index].quantity + 1;
      setLocalQuantity(localQuantity + 1);
    };
    const decreaseQuantity = (index) => {
      if (localQuantity - 1 === 0) {
        removeItem(element.dish.dishName, element.additionalNotes);
      }
      cart[index].quantity = cart[index].quantity - 1;
      setLocalQuantity(localQuantity - 1);
    };
    return (
      <Fragment key={"Blocker" + index}>
        <ListItemText
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
          disableTypography
          primary={element.dish.dishName}
          key={`${element.dish.dishName}`}
        />

        <ListItemText
          disableTypography
          primary={element.additionalNotes}
          key={`Notes#${index}`}
        />
        <ListItem disablePadding>
          <IconButton
            autoFocus
            size={"large"}
            onClick={() => decreaseQuantity(index)}
          >
            <RemoveCircleOutline fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
            }}
          >
            {localQuantity}
          </Typography>
          <IconButton
            autoFocus
            size={"large"}
            onClick={() => increaseQuantity(index)}
          >
            <AddCircleOutline fontSize="small" />
          </IconButton>
        </ListItem>

        <ListItemText
          disableTypography
          primary = {(Math.round(element.dish.price * 100) / 100).toFixed(2) + " €"}
          key={`Price#${index}`}
        />

        <Button
          key={`DeleteButton#${index}`}
          variant="outlined"
          onClick={() =>
            removeItem(element.dish.dishName, element.additionalNotes)
          }
        >
          <DeleteIcon key={`DeleteIcon#+ ${index} `} size="large" />
        </Button>
        <Divider sx={{ marginTop: 3 }} />
      </Fragment>
    );
  };

  return (
    <Card elevation={9} key="mainCard">
      <CardContent key="Card content">
        <List
          sx={{
            width: "100%",
            position: "relative",
            overflow: "auto",
            maxHeight: { xs: 250, sm: 250, md: 350 },
            minHeight: { xs: 125, sm: 125, md: 150 },
            "& ul": { padding: 0 },
          }}
          subheader={
            <ListSubheader sx={{ fontSize: "15px" }} key="SubHeader">
              {transaction
                ? t("main.waiter.cart.transaction") +
                  "#" +
                  transaction.idTransaction
                : t("main.waiter.cart.empty")}
              <Badge
                sx={{
                  mr: "10px",
                }}
                color={"primary"}
                badgeContent={getNumberInCart()}
                showZero
              >
                <ShoppingBagIcon fontSize="small" />
              </Badge>
              {t("main.waiter.cart.title") +
                " " +
                t("main.waiter.cart.table") +
                " " +
                state.tableNumber}
            </ListSubheader>
          }
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {cart.map((element, index) => (
            <ItemOrderList
              key={
                "ItemOrderList" +
                element.dish.dishName +
                element.additionalNotes
              }
              element={element}
              index={index}
              removeItem={removeItem}
            />
          ))}
        </List>
        <Button
          variant="colored-submit"
          disabled={getNumberInCart() > 0 ? false : true}
          onClick={sendData2}
        >
          {t("main.form.submit")}
        </Button>
      </CardContent>
    </Card>
  );
}
