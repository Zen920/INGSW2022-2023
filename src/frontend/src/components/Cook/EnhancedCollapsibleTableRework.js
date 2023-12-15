import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, TextField, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import {
  releaseOrder,
  updateOrderStatus,
} from "../../services/api/ClientOrdersRequests";
import { misc } from "../../utilities/constants/ConstantMessages";
import getWindowDimensions from "../../utilities/GetWindowDimensions";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const primaryHeadCells = [
  {
    id: "idTable",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "idOrder",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "idTransaction",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];
const headCells = [
  {
    id: "idItem",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "dishName",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "additionalNotes",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "confirm",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "release",
    numeric: true,
    disablePadding: false,
    label: "",
    hide: true,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, mode, headCells, tableType } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  let sliceTo = 0;
  if (tableType !== "collapsible") {
    switch (mode) {
      case "completed":
        sliceTo = 2;
        break;
      case "pending":
        sliceTo = 1;
        break;
      default:
        break;
    }
  }

  return (
    <TableHead overflow="hidden">
      <TableRow overflow="hidden">
        <TableCell sx={{ width: "2%" }} />
        {headCells.slice(0, headCells.length - sliceTo).map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              color: "white",
              overflow: "hidden",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="body1">{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.mode === "dark" ? "white" : "black",
}));
const MobileCollapsibleRow = (props) => {
  const tabState = JSON.parse(sessionStorage.getItem("orderId"));
  const { t, index, array, list, handleReleaseOrder, handleUpdateOrder, mode } =
    props;
  const [quantity, setQuantity] = useState();
  const [open, setOpen] = useState(
    tabState?.idOrder === list.idOrder && mode === tabState?.mode ? true : false
  );
  //sessionStorage.removeItem("orderId");
  const sameOrderItems = array
    .slice(index)
    .filter((item) => item.idOrder === list.idOrder);
  headCells.map((cell) => (cell.label = t("main.cook.table.".concat(cell.id))));
  let sliceTo = 0;
  switch (mode) {
    case "completed":
      sliceTo = 2;
      break;
    case "pending":
      sliceTo = 1;
      break;
    default:
      break;
  }
  const materialUITextFieldProps = {
    fullWidth: false,
    variant: "outlined",
    name: "quantity",
    id: "formatted-numberformat-input",
    InputLabelProps: {
      shrink: true,
    },
    type: "number",
  };
  return (
    <Fragment key={"fragment" + list.idOrder}>
      <TableRow hover role="checkbox" tabIndex={-1} key={list.idOrder}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell id={list.tableNumber + "" + list.idOrder}>
          {list.tableNumber}
        </TableCell>
        <TableCell align="right">{list.idOrder}</TableCell>
        <TableCell align="right">{list.idTransaction}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginTop={1}>
              <Typography variant="h6" gutterBottom component="div">
                {t("main.cook.table.subTitle")}
              </Typography>
              {open && (
                <Grid
                  container
                  spacing={2}
                  padding={2}
                  justifyContent="left"
                  alignItems="left"
                >
                  {sameOrderItems.map((list) => (
                    <>
                      <Grid xs={12}>
                        <Divider variant="middle">{list.idItem}</Divider>
                      </Grid>
                      <Grid xs={3.5} align="center" height={"70px"}>
                        <Item>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                            overflow={"auto"}
                            textOverflow
                          >
                            {headCells[1].label}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid xs={8} justifyItems="center" height={"70px"}>
                        <Typography
                          variant="body2"
                          overflow={"auto"}
                          sx={{ fontWeight: "bold" }}
                          textOverflow
                        >
                          {list.dishName}
                        </Typography>
                      </Grid>
                      <Grid xs={3.5} align="center" height={"70px"}>
                        <Item>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {headCells[2].label}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid xs={6} align="center">
                        {mode === "pending" && (
                          <Box display="flex" minWidth="50px">
                            <NumericFormat
                              isAllowed={(values) => {
                                const { floatValue } = values;
                                return (
                                  floatValue >= 1 && floatValue <= list.quantity
                                );
                              }}
                              value={list.quantity}
                              customInput={TextField}
                              {...materialUITextFieldProps}
                              onValueChange={(value) => {
                                setQuantity(value.floatValue);
                              }}
                            />
                            <Typography variant="body1" display={"inline"}>
                              {"/" + list.quantity}
                            </Typography>
                          </Box>
                        )}
                        {mode !== "pending" && (
                          <Typography variant="body2">
                            {list.quantity}
                          </Typography>
                        )}
                      </Grid>
                      <Grid xs={3.5}>
                        <Item>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {headCells[3].label}
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid
                        xs={8}
                        align="center"
                        sx={{ minWidth: "50px", overflow: "auto" }}
                      >
                        <Typography variant="body2">
                          {list.additionalNotes}
                        </Typography>
                      </Grid>
                      {mode !== "completed" && (
                        <>
                          <Grid xs={6}>
                            <Paper variant="acceptButton">
                              <IconButton
                                aria-label="Confirm order"
                                sx={{
                                  ":hover": {
                                    textDecoration: "none",
                                    backgroundColor: "transparent",
                                  },
                                }}
                                onClick={() =>
                                  handleUpdateOrder(list, quantity)
                                }
                              >
                                <CheckIcon sx={{ color: "#388e3c" }} />
                                <Typography variant="body2" color="#388e3c">
                                  {t("main.cook.table.buttons.".concat(mode))}
                                </Typography>
                              </IconButton>
                            </Paper>
                          </Grid>
                          <Grid xs={6} />
                        </>
                      )}
                      {mode === "accepted" && (
                        <>
                          <Grid xs={6}>
                            <Paper variant="releaseButton">
                              <IconButton
                                aria-label="Release order"
                                sx={{
                                  ":hover": {
                                    textDecoration: "none",
                                    backgroundColor: "transparent",
                                  },
                                }}
                                onClick={() => handleReleaseOrder(list)}
                              >
                                <ClearIcon sx={{ color: "#d32f2f" }} />
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#d32f2f" }}
                                >
                                  {t("main.cook.table.buttons.release")}
                                </Typography>
                              </IconButton>
                            </Paper>
                          </Grid>
                          <Grid xs={6} />
                        </>
                      )}
                    </>
                  ))}
                </Grid>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const MainCollapsibleRow = (props) => {
  const tabState = JSON.parse(sessionStorage.getItem("orderId"));
  const { t, index, array, list, handleReleaseOrder, handleUpdateOrder, mode } =
    props;
  const [quantity, setQuantity] = useState();
  const [open, setOpen] = useState(
    tabState?.idOrder === list.idOrder && mode === tabState?.mode ? true : false
  );
  //sessionStorage.removeItem("orderId");
  const sameOrderItems = array
    .slice(index)
    .filter((item) => item.idOrder === list.idOrder);
  headCells.map((cell) => (cell.label = t("main.cook.table.".concat(cell.id))));
  let sliceTo = 0;
  switch (mode) {
    case "completed":
      sliceTo = 2;
      break;
    case "pending":
      sliceTo = 1;
      break;
    default:
      break;
  }
  const materialUITextFieldProps = {
    fullWidth: false,
    variant: "outlined",
    name: "quantity",
    id: "formatted-numberformat-input",
    InputLabelProps: {
      shrink: true,
    },
    type: "number",
  };

  return (
    <Fragment key={"fragment" + list.idOrder}>
      <TableRow
        padding={window.innerWidth > 500 ? 3 : 0}
        hover
        role="checkbox"
        tabIndex={-1}
        key={list.idOrder}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell id={list.tableNumber + "" + list.idOrder}>
          {list.tableNumber}
        </TableCell>
        <TableCell align="right">{list.idOrder}</TableCell>
        <TableCell align="right">{list.idTransaction}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, padding: window.innerWidth > 500 ? 3 : 0 }}>
              <Typography variant="h6" gutterBottom component="div">
                {t("main.cook.table.subTitle")}
              </Typography>
              {open && (
                <Table
                  size="small"
                  aria-label="purchases"
                  key={"innerTable" + list.idOrder}
                  sx={{ borderBottom: "solid", borderColor: "#548c8c" }}
                >
                  <TableHead key={"innerTableHeader" + list.idOrder}>
                    <TableRow key={"innerHeadCell" + list.idOrder}>
                      {headCells
                        .slice(0, headCells.length - sliceTo)
                        .map((headCell) => (
                          <TableCell
                            align={headCell.numeric ? "right" : "left"}
                            key={
                              "innerHeadCell" + list.idOrder + headCell.label
                            }
                          >
                            <Typography variant="body2" color="white">
                              {headCell.label}
                            </Typography>
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sameOrderItems.map((list) => (
                      <TableRow
                        key={
                          "SecondaryTableRow#" +
                          list.idOrder +
                          "Item#" +
                          list.idItem +
                          "transaction#" +
                          list.idTransaction +
                          "Index#" +
                          index
                        }
                      >
                        <TableCell
                          component="th"
                          id={list.idItem}
                          scope="row"
                          sx={{ minWidth: "10px", overflow: "auto" }}
                        >
                          <Typography variant="body2">{list.idItem}</Typography>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ minWidth: "50px", overflow: "auto" }}
                        >
                          <Typography variant="body2">
                            {list.dishName}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ minWidth: "130px" }}>
                          {mode === "pending" && (
                            <Box
                              display="flex"
                              justifyContent="right"
                              alignItems="right"
                              minWidth="50px"
                            >
                              <NumericFormat
                                isAllowed={(values) => {
                                  const { floatValue } = values;
                                  return (
                                    floatValue >= 1 &&
                                    floatValue <= list.quantity
                                  );
                                }}
                                value={list.quantity}
                                customInput={TextField}
                                {...materialUITextFieldProps}
                                id={
                                  list.idItem +
                                  list.dishName +
                                  "numeric-formatted"
                                }
                                key={list.idItem + "numeric-formatted"}
                                onValueChange={(value) => {
                                  setQuantity(value.floatValue);
                                }}
                              />
                              <Typography variant="body1" display={"inline"}>
                                {"/" + list.quantity}
                              </Typography>
                            </Box>
                          )}
                          {mode !== "pending" && (
                            <Typography variant="body2">
                              {list.quantity}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ minWidth: "50px", overflow: "auto" }}
                        >
                          <Typography variant="body2">
                            {list.additionalNotes}
                          </Typography>
                        </TableCell>
                        {mode !== "completed" && (
                          <TableCell align="right" width="5%">
                            <Paper variant="acceptButton">
                              <IconButton
                                aria-label="Confirm order"
                                sx={{
                                  ":hover": {
                                    textDecoration: "none",
                                    backgroundColor: "transparent",
                                  },
                                }}
                                onClick={() =>
                                  handleUpdateOrder(list, quantity)
                                }
                              >
                                <CheckIcon sx={{ color: "#388e3c" }} />
                                <Typography variant="body2" color="#388e3c">
                                  {t("main.cook.table.buttons.".concat(mode))}
                                </Typography>
                              </IconButton>
                            </Paper>
                          </TableCell>
                        )}
                        {mode === "accepted" && (
                          <TableCell align="right" width="5%">
                            <Paper variant="releaseButton">
                              <IconButton
                                aria-label="Release order"
                                sx={{
                                  ":hover": {
                                    textDecoration: "none",
                                    backgroundColor: "transparent",
                                  },
                                }}
                                onClick={() => handleReleaseOrder(list)}
                              >
                                <ClearIcon sx={{ color: "#d32f2f" }} />
                                <Typography
                                  variant="body2"
                                  sx={{ color: "#d32f2f" }}
                                >
                                  {t("main.cook.table.buttons.release")}
                                </Typography>
                              </IconButton>
                            </Paper>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default function EnhancedCollapsibleTable2(props) {
  const {
    mode,
    sendOrdersMessage,
    setPending,
    setAccepted,
    setCompleted,
    transaction,
    accepted,
    pending,
    completed,
    handleSetOpenSnack,
    handleMessageInfo,
    handleSetSeverity,
    t,
  } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  primaryHeadCells.map(
    (cell) => (cell.label = t("main.cook.collapsibleTable.".concat(cell.id)))
  );
  const acceptOrder = async (row, status, quantity) => {
    var newOrder = undefined;
    newOrder = await updateOrderStatus(
      handleSetOpenSnack,
      handleMessageInfo,
      handleSetSeverity,
      {
        id: row.idItem,
        status: status,
        quantity: quantity ? quantity : undefined,
      },
      t
    );
    if (newOrder != undefined) {
      let array = transaction.filter((data) => data.idItem !== row.idItem);
      var tempId;
      if (quantity && row.quantity !== quantity) {
        tempId = row.idItem;
        row.quantity = row.quantity - quantity;
        row.idItem = newOrder.idItem;
        array.push(row);
      }
      let updated;
      switch (status) {
        case "IN_PROGRESS":
          setPending(array);
          let newRow = {
            dishName: row.dishName,
            tableNumber: row.tableNumber,
            quantity: row.quantity,
            idTransaction: row.idTransaction,
            idOrder: row.idOrder,
            additionalNotes: row.additionalNotes,
            idItem: tempId ? tempId : row.idItem,
          };
          newRow.status = "IN_PROGRESS";
          newRow.quantity = quantity ? quantity : newRow.quantity;
          updated = [...accepted, newRow];
          setAccepted(updated);
          break;
        case "READY":
          setAccepted(array, 0);
          row.status = "READY";
          updated = [...completed, row];
          setCompleted(updated);
          break;
        default:
          break;
      }
    }
  };
  const handleReleaseOrder = async (row) => {
    sessionStorage.setItem(
      "orderId",
      JSON.stringify({
        idOrder: row.idOrder,
        mode: mode,
      })
    );
    const array = transaction.filter((data) => data.idItem !== row.idItem);
    setAccepted(array);
    row.status = "WAITING";
    var result = await releaseOrder(
      handleSetOpenSnack,
      handleMessageInfo,
      handleSetSeverity,
      {
        id: row.idItem,
      },
      t
    );
    if (result != undefined) {
      let updated = [...pending, row];
      setPending(updated);
      sendOrdersMessage(misc.NO_FETCH);
    }
  };
  const handleUpdateOrder = async (row, quantity) => {
    sessionStorage.setItem(
      "orderId",
      JSON.stringify({
        idOrder: row.idOrder,
        mode: mode,
      })
    );
    switch (mode) {
      case "pending":
        await acceptOrder(row, "IN_PROGRESS", quantity);
        sendOrdersMessage(misc.NO_FETCH);
        break;
      case "accepted":
        await acceptOrder(row, "READY");
        break;
      case "completed":
        await acceptOrder(row, "CLOSED");
        //acceptOrder(row.idItem, "CLOSED");
        //sendOrdersMessage();
        break;
      default:
        break;
    }
    //handleRefetchTransaction();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  let status;
  switch (mode) {
    case "pending":
      status = "WAITING";
      break;
    case "accepted":
      status = "IN_PROGRESS";
      break;
    default:
      status = "READY";
      break;
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transaction.length) : 0;
  const size = getWindowDimensions();

  return (
    <Box sx={{ width: { xs: "100%", sm: "95%" } }}>
      <TableContainer component={Paper} overflow="auto">
        <Table aria-labelledby="tableTitle" key={"mainTable"} overflow="auto">
          <EnhancedTableHead
            tableType="collapsible"
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={transaction.length}
            mode={mode}
            headCells={primaryHeadCells}
            key={"Tablehead"}
          />
          <TableBody key="body" overflow="auto">
            {stableSort(transaction, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index, array) => {
                return (
                  <Fragment
                    key={"Fragment#" + mode + row.idOrder + "item" + row.idItem}
                  >
                    {(index === 0 ||
                      array[index - 1].idOrder !== array[index].idOrder) &&
                      (size.width < 600 ? (
                        <MobileCollapsibleRow
                          mode={mode}
                          key={"CollapsibleRow" + row.idOrder}
                          handleUpdateOrder={handleUpdateOrder}
                          handleReleaseOrder={handleReleaseOrder}
                          t={t}
                          index={index}
                          status={status}
                          array={array}
                          list={row}
                          theme={theme}
                        />
                      ) : (
                        <MainCollapsibleRow
                          mode={mode}
                          key={"CollapsibleRow" + row.idOrder}
                          handleUpdateOrder={handleUpdateOrder}
                          handleReleaseOrder={handleReleaseOrder}
                          t={t}
                          index={index}
                          status={status}
                          array={array}
                          list={row}
                          theme={theme}
                        />
                      ))}
                  </Fragment>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
                key={"tableRow#1"}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={transaction.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  margin: 0,
                }}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
