import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCategories } from "../services/api/CategoriesRequests";
import CartCard from "../components/common/Card/CartCard";
import CartPopup from "../components/common/Card/CartPopup";
import LoadingScreen from "../components/common/Loading/LoadingScreen";
import SnackBarContext from "../services/contexts/SnackBarContext";
import NestedSideBarList from "../components/Waiter/Sidebar/NestedSideBarList";

import { useSyncExternalStore } from "react";
import DishDialog from "../components/Waiter/DishDialog";
import MobileMenu from "../components/Waiter/MobileMenu";
import { useLocation } from "react-router-dom";
import { getTableByID } from "../services/api/TableRequests";
import { getSingleTransaction } from "../services/api/OrderTransactionRequests";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export function useWindowDimensions() {
  // the 3rd parameter is optional and only needed for server side rendering
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function getServerSnapshot() {
  return {
    width: 0,
    height: 0,
  };
}
export default function WaiterOrderCompoent() {
  const { state } = useLocation();
  const { t } = useTranslation();
  const [table, setTable] = useState();
  const [transaction, setTransaction] = useState(undefined);
  const [categories, setCategories] = useState();
  const [cart, setCart] = useState([]);
  const { handleSetOpenSnack, handleMessageInfo, handleSetSeverity } =
    useContext(SnackBarContext);

  const handleCartUpdate = useCallback((localCart) => {}, []);
  const addToCart = (qty, dish, notes) => {
    const isDishPreset = (element) =>
      element.dish.dishName === dish.dishName &&
      element.additionalNotes === notes;
    const result = cart.findIndex(isDishPreset);
    if (result === -1) {
      setCart([
        ...cart,
        ...[
          {
            quantity: qty,
            dish: dish,
            additionalNotes: notes,
          },
        ],
      ]);
    } else {
      let cartCopy = [...cart];
      cartCopy[result].quantity = cartCopy[result].quantity + qty;
      setCart(cartCopy);
    }
  };
  const handleCleanCart = useCallback(() => {
    setCart([]);
  }, []);
  const getNumberInCartCallback = () => {
    let number = 0;
    cart.map((item) => (number += item.quantity));
    return number;
  };
  const removeFromCartCallback = useCallback(
    (dishName, notes) => {
      const array = cart.filter(
        (data) =>
          data.dish.dishName !== dishName || data.additionalNotes !== notes
      );
      setCart(array);
    },
    [cart]
  );
  const fetchTransaction = async () => {
    setTransaction(
      await getSingleTransaction(
        handleSetOpenSnack,
        handleMessageInfo,
        handleSetSeverity,
        state
      )
    );
  };
  const handleSetTransaction = useCallback((transaction) => {
    setTransaction(transaction);
  }, []);
  useEffect(() => {
    if (table && table.occupied) {
      console.log("Table occupied");
      fetchTransaction();
    }
  }, [table]);
  useEffect(() => {
    const fetchNewData = async () => {
      setCategories(
        (
          await getCategories(
            handleSetOpenSnack,
            handleMessageInfo,
            handleSetSeverity,
            {
              fetchAll: false,
            }
          )
        ).sort((category1, category2) =>
          category1.index - category2.index
        )
      );
    };
    const fetchTable = async () => {
      setTable(
        await getTableByID(
          handleSetOpenSnack,
          handleMessageInfo,
          handleSetSeverity,
          {
            id: state.idTable,
          }
        )
      );
    };
    fetchNewData();
    fetchTable();
  }, [handleSetOpenSnack, handleMessageInfo, handleSetSeverity]);
  if (!categories) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Grid
        container
        sx={{
          paddingTop: { xs: "0px", md: "30px" },
          paddingBottom: { xs: "0px", md: "30px" },
        }}
        key={"parent"}
        display="inline-flex"
        width="100%"
        //flexDirection="column"
        flexWrap="wrap"
      >
        <Grid
          width="100%"
          height="100vh"
          xs={2}
          position={"sticky"}
          display="flex"
          justifyItems="left"
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <MobileMenu t={t} categories={categories} addToCart={addToCart} />
        </Grid>
        <Grid
          xs={2}
          position={"sticky"}
          display="flex"
          justifyItems="left"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <NestedSideBarList
            content={categories}
            category={t("main.categories")}
            key="NestedSideBar"
          />
        </Grid>
        <Grid xs={12} sm={12} md={8} container>
          <Grid
            display="flex"
            container
            padding={1}
            rowSpacing={10}
            columnSpacing={getSnapshot().width <= 900 ? 0 : 2}
            sx={{ display: { xs: "none", md: "flex" } }}
            justifyItems="center"
            key="GridDishContainer"
            xs={12}
            sm={12}
            md={12}
            lg={16}
          >
            {categories.map((category, index) => (
              <Fragment key={"OrderComponentFragment#" + index}>
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  xs={12}
                  key={category.categoryType + index}
                  id={category.categoryType + index}
                >
                  <Paper variant="colored" key={"Item" + index}>
                    <Typography component="span" variant="h3">
                      {category.categoryType}
                    </Typography>
                  </Paper>
                </Grid>
                {category.dishes
                  .sort((dish1, dish2) => (dish1.index - dish2.index))
                  .map((dish, index) => (
                    <Grid
                      xs={12}
                      md={6}
                      lg={4}
                      id={dish.dishName + index}
                      key={dish.dishName + index}
                    >
                      <Item key={"Item2#" + index}>
                        <DishDialog
                          addToCart={addToCart}
                          dish={dish}
                          t={t}
                          index={index}
                          key={"DishDialog" + index}
                        />
                      </Item>
                    </Grid>
                  ))}
              </Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid
          alignContent={"right"}
          justifyContent="right"
          md={2}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          {table && (
            <CartCard
              handleNumberInCart={getNumberInCartCallback}
              handleCartUpdate={handleCartUpdate}
              cart={cart}
              transaction={transaction}
              handleSetTransaction={handleSetTransaction}
              table={table}
              removeItem={removeFromCartCallback}
              cleanCart={handleCleanCart}
              handleMessageInfo={handleMessageInfo}
              handleSetSeverity={handleSetSeverity}
              handleSetOpenSnack={handleSetOpenSnack}
              t={t}
              key="CartCard"
            />
          )}
        </Grid>

        <Grid
          justifyContent={"center"}
          sx={{
            width: { xs: "100%" },
            height: { xs: "1%" },
            position: { xs: "fixed" },
            top: { xs: 0 },
            left: { xs: 0 },
            right: { xs: 0 },
            bottom: { xs: 0 },
            display: { sm: "block", md: "none" },
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          <CartPopup
            handleSetTransaction={handleSetTransaction}
            transaction={transaction}
            table={table}
            handleNumberInCart={getNumberInCartCallback}
            cart={cart}
            removeItem={removeFromCartCallback}
            cleanCart={handleCleanCart}
            handleMessageInfo={handleMessageInfo}
            handleSetSeverity={handleSetSeverity}
            handleSetOpenSnack={handleSetOpenSnack}
            t={t}
            key="CartPopup"
          />
        </Grid>
      </Grid>
    </>
  );
}
