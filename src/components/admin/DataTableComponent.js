import React from "react";
import DataTable from "react-data-table-component";

const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const customStyles = {
  table: {
    minWidth: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 1px",
  },
  headCells: {
    style: {
      padding: "1rem 0.75rem",
      textTransform: "uppercase",
      fontWeight: "500",
      fontSize: "0.75rem",
      color: "#F9FAFB",
      letterSpacing: "0.025rem",
      borderTop: "1px solid #192934",
      borderBottom: "1px solid #192934",
      backgroundColor: "#192934",
      "&:hover:not(:disabled)": {
        borderTop: "0px",
        borderBottom: "0px",
      },
    },
  },
  rows: {
    style: {
      backgroundColor: "#213743",
      "&:hover:not(:disabled)": {
        backgroundColor: "#1c2f3a",
        borderTop: "0px",
        borderBottom: "0px",
      },
    },
  },
  cells: {
    style: {
      padding: "1rem 0.75rem",
      fontSize: "0.875rem",
      fontWeight: "400",
      color: "#F9FAFB",
      borderTop: "0px solid #192934",
      borderBottom: "0px solid #192934",
      "&:hover:not(:disabled)": {
        borderTop: "0px",
        borderBottom: "0px",
      },
    },
  },
  pagination: {
    style: {
      fontSize: "0.875rem",
      fontWeight: "400",
      color: "#F9FAFB",
      borderTop: "1px solid #192934",
      borderBottom: "1px solid #192934",
      backgroundColor: "#192934",
    },
    pageButtonsStyle: {
      backgroundColor: "#213743",
      padding: "0.5rem",
      margin: "0 0.25rem",
      borderRadius: "0.25rem",
      fontSize: "0.875rem",
      fontWeight: "400",
      color: "#dff5fd",
      fill: "#dff5fd",
      border: "1px solid #213743",
      cursor: "pointer",
      "&:disabled": {
        cursor: "unset",
        color: "#dff5fd",
        fill: "#dff5fd",
      },
    },
  },
};

const columns = [
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.createdAt,
    sortable: true,
    format: (row) =>
      new Date(row.createdAt).toLocaleDateString("en-US", DATE_OPTIONS),
  },
  {
    name: "Status",
    selector: (row) => row.confirmed,
    sortable: true,
    cell: (row) => (row.confirmed ? "Verified" : "Unverified"),
  },
];

const DataTableComponent = ({ users, onChangePage, totalPages }) => (
  <DataTable
    columns={columns}
    data={users}
    noHeader
    customStyles={customStyles}
    pagination
    paginationPerPage={1}
    paginationRowsPerPageOptions={[10, 20, 30, 50]}
    paginationTotalRows={totalPages}
    highlightOnHover
    onChangePage={onChangePage}
  />
);

export default DataTableComponent;
