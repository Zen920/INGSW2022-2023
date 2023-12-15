import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DishesCategoryForm from "./DishesCategoryForm";
import EditExistingDish from "./EditExistingDish";
import NewFoodApiForm from "./FoodApiForm";
import NewGenericForm from "./InsertDishForm";

const DishesComponent = ({
  categories,
  handleSetCategories,
  dishes,
  handleSetDishes,
  t,
  handleChange,
  a11yProps,
  value
}) => {
  const [isManual, setIsManual] = useState(0);
  return (
    <Paper
      sx={{
        padding: 1,
        width: "100%",
        minHeight: "100%",
        overflow: "auto",
      }}
    >
      <Tabs
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Insert dish"
      >
        <Tab
          {...a11yProps(0)}
          label={t("main.admin.dishes.tabs.manual")}
          onClick={() => setIsManual(0)}
        />
        <Tab
          label={t("main.admin.dishes.tabs.off")}
          {...a11yProps(1)}
          onClick={() => setIsManual(1)}
        />
        <Tab
          label={t("main.admin.dishes.tabs.update")}
          {...a11yProps(2)}
          onClick={() => setIsManual(2)}
        />
        <Tab
          label={t("main.admin.dishes.tabs.batchCategories")}
          {...a11yProps(3)}
          onClick={() => setIsManual(3)}
        />
      </Tabs>
      {isManual === 0 && (
        <NewGenericForm
          categories={categories}
          dishes={dishes}
          handleSetDishes={handleSetDishes}
        />
      )}
      {isManual === 1 && (
        <NewFoodApiForm
          categories={categories}
          dishes={dishes}
          handleSetDishes={handleSetDishes}
        />
      )}
      {isManual === 2 && (
        <EditExistingDish
          categories={categories}
          dishes={dishes}
          handleSetDishes={handleSetDishes}
        />
      )}

      {isManual === 3 && (
        <DishesCategoryForm
          categories={categories}
          setCategories={handleSetCategories}
          dishes={dishes}
          handleSetDishes={handleSetDishes}
        />
      )}
    </Paper>
  );
};
export default DishesComponent;
