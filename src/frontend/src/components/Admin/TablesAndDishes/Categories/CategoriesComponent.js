import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import DeleteCategoryForm from "./DeleteCategoryForm";
import EditCategoryForm from "./EditCategoryForm";

const CategoriesComponent = ({
  categories,
  handleSetCategories,
  t,
  handleChange,
  a11yProps,
  value,
}) => {
  const [categoryTab, setCategoryTab] = useState(0);
  return (
    <Paper sx={{ padding: 1, minWidth: "100%", minHeight: "100%" }}>
      <Tabs
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Category panel"
      >
        <Tab
          label={t("main.admin.categories.tabs.add")}
          {...a11yProps(5)}
          onClick={() => setCategoryTab(0)}
        />
        <Tab
          label={t("main.admin.categories.tabs.delete")}
          {...a11yProps(4)}
          onClick={() => setCategoryTab(1)}
        />
        <Tab
          label={t("main.admin.categories.tabs.update")}
          {...a11yProps(6)}
          onClick={() => setCategoryTab(2)}
        />
      </Tabs>
      {categoryTab === 0 && (
        <CategoryForm
          categories={categories}
          setCategories={handleSetCategories}
        />
      )}
      {categoryTab === 1 && (
        <DeleteCategoryForm
          categories={categories}
          setCategories={handleSetCategories}
        />
      )}
      {categoryTab === 2 && (
        <EditCategoryForm
          categories={categories}
          setCategories={handleSetCategories}
        />
      )}
    </Paper>
  );
};
export default CategoriesComponent;