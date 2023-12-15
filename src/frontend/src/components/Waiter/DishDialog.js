import { useTheme } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  DialogActions,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import DishCard from "../common/Card/DishCard";

export default function DishDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { dish, index, t, addToCart } = props;
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [opens, setOpens] = useState(false);
  const onOpenDialog = useCallback(() => setOpens(true), []);
  const onCloseDialog = () => setOpens(false);
  return (
    <>
      <DishCard
        dish={dish}
        setOpens={onOpenDialog}
        index={index}
        key={"DishCard" + index}
      />
      <Dialog
        fullScreen={fullScreen}
        open={opens}
        onClose={onCloseDialog}
        aria-labelledby="responsive-dialog-title"
        id={"Dialog#" + dish.dishName + index}
        key={"Dialog#" + dish.dishName + index}
      >
        <DialogTitle
          id={"dialog" + dish.dishName}
          sx={{ maxHeight: "50px", padding: 0 }}
        >
          <DialogActions height="10px" sx={{ maxHeight: "50px" }}>
            <Typography variant="body2" mr="15px">
              {dish.dishName}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onCloseDialog}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="span" variant="body2" fontStyle={"italic"}>
              {t("main.form.dish.description")}
            </Typography>
            <br />
            <Typography component="span" variant="h4">
              {dish.dishDescription}
            </Typography>
            <br />

            <Typography component="span" variant="h5" fontStyle={"italic"}>
              {t("main.form.dish.allergens")}
            </Typography>
            <br />
            <Typography component="span" variant="h4">
              {dish.allergens}
            </Typography>
            <br />
            <br />
            <br />
            <Typography component="span" variant="h7" fontStyle={"italic"}>
              {t("main.cook.table.additionalNotes")}
            </Typography>
            <br />
          </DialogContentText>
          <TextField fullWidth onChange={(e) => setNotes(e.target.value)} />
          <Box
            display="flex"
            alignContent="center"
            justifyItems="center"
            justifyContent="center"
            alignItems="center"
            mb={4}
            mt={2}
          >
            <IconButton
              autoFocus
              size={"large"}
              onClick={() => setCount(count - 1)}
              disabled={count <= 1}
            >
              <RemoveCircleIcon fontSize="large" />
            </IconButton>
            <Typography fontSize={"20px"} textAlign="center" ml={4} mr={4}>
              {count}
            </Typography>

            <IconButton
              autoFocus
              size={"large"}
              onClick={() => setCount(count + 1)}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Box>
        </DialogContent>
        <Button
          m={2}
          size="large"
          variant="colored-submit"
          sx={{
            borderRadius: 0,
          }}
          onClick={() => {
            addToCart(count, dish, notes);
            setCount(1);
            onCloseDialog();
          }}
        >
          {t("main.form.submit")}
        </Button>
      </Dialog>
    </>
  );
}
