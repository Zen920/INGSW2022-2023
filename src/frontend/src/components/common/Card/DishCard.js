import { Box, CardActionArea, Typography } from "@mui/material";
import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
export default function DishCard(props) {
  const { dish, setOpens, index } = props;
  const handleOnOpenDialog = () => {
    setOpens(true);
  };
  return (
    <Card elevation={5} key={"Dish#" + dish.dishName + index}>
      <CardActionArea
        onClick={handleOnOpenDialog}
        sx={{
          minHeight: "15rem",
        }}
      >
        <CardContent>
          <Typography
            component="span"
            variant="h4"
            fontWeight={"bold"}
            color={"theme.main.primary"}
          >
            {dish.dishName}
          </Typography>
          <br />
          <Box display="flex" justifyContent="right">
            <Typography component="span" variant="h4" textAlign={"right"}>
              {(Math.round(dish.price * 100) / 100).toFixed(2)} €
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
