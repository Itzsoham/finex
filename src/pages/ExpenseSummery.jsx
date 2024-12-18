import { Box, useTheme } from "@mui/material";
import Spinner from "../components/Spinner";
import { useSummery } from "../features/dashboard/useSummery";
import Heading from "../components/Heading";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useUser } from "../features/authentication/useUser";

function ExpenseSummery() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isAdmin, userId } = useUser();
  const { isLoading, data } = useSummery(isAdmin, userId);

  if (isLoading) return <Spinner />;

  const columns = [
    { field: "month", headerName: "Month", flex: 1 },
    { field: "balance_before", headerName: "Opening Amount", flex: 1 },
    { field: "total_recipe", headerName: "Recipe Amount", flex: 1 },
    { field: "total_expense", headerName: "Total Expense", flex: 1 },

    { field: "balance_at_end", headerName: "CashOn Hand", flex: 1 },
  ];

  if (isAdmin) {
    columns.push({
      field: "created_by_name",
      headerName: "Created By",
      flex: 1,
    });
  }

  const rows = data.map((row, i) => ({
    ...row,
    id: i,
  }));

  return (
    <Box m="20px">
      <Heading
        title="Summery"
        subtitle="Summery of all months by Expense and Recipe amount"
      />

      <Box
        height="75vh"
        width="100%"
        sx={{
          overflowX: "auto", // Ensure horizontal scrolling is enabled
          "&::-webkit-scrollbar": {
            height: "5px", // Scrollbar height for horizontal scroll
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },

          "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders [role='row']":
            {
              backgroundColor: `${colors.blueAccent[700]} !important`,
              borderBottom: "none",
            },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer": {
            backgroundImage: `linear-gradient(45deg, ${colors.greenAccent[400]} 0%, ${colors.blueAccent[400]} 100%)`,
            color: "white",
            width: "fit-content",
            borderRadius: "5px 5px 0 0",
            padding: "5px",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

export default ExpenseSummery;
