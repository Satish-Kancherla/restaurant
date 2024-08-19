import React, {
  useState,
  useMemo,
  useLayoutEffect,
  useEffect,
  Suspense,
} from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as FormElements from "../../components/ui/FormElements";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Edit, RefreshCcw, RefreshCw } from "lucide-react";
import StatusDialog from "./StatusEdit";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { getUrl, instance } from "../../components/Url";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";
import { cn } from "../../lib/utils";
import toast from "react-hot-toast";
import AlertDialog from "../../components/DeleteDialog";

const columns = [
  { field: "id", headerName: <b>ID</b>, width: 100, flex: 0 },
  { field: "name", headerName: <b>Name</b>, width: 120, flex: 0.5 },
  {
    field: "doj",
    headerName: <b>DOJ</b>,
    type: "text",
    width: 100,
    flex: 0,
    valueFormatter: (params) => {
      return params?.value?.split("-").reverse().join("-");
    },
  },
  { field: "salary", headerName: <b>Salary</b>, width: 80, flex: 0 },
  {
    field: "project",
    headerName: <b>Allocated Project</b>,
    type: "text",
    flex: 1,
  },
  {
    field: "projectDate",
    headerName: <b>Project Allocation Date</b>,
    type: "text",
    width: 170,
    flex: 0,
    valueFormatter: (params) => {
      return params?.value?.split("-").reverse().join("-");
    },
  },
  {
    field: "isbillable",
    headerName: <b>Project Type</b>,
    type: "text",
    width: 100,
    flex: 0,
  },
  {
    field: "active",
    headerName: <b>Active</b>,
    type: "text",
    width: 100,
    flex: 0,
    renderCell: (params) => {
      return params?.value === "active" ? (
        <span className="text-theme-success">Yes</span>
      ) : (
        <span className="text-theme-danger">No</span>
      );
    },
  },
];

// const rows = [
//   {
//     id: 1,
//     name: "Employee 1",
//     doj: "2022-01-01",
//     salary: 35000,
//     project: "Project A",
//     projectDate: "2022-01-01",
//     isBillable: "Billable",
//     status: "On-Role",
//   },

// ];

export default function EmployeeTable() {
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allEmp, setAllEmp] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useAuthContext();
  const url = getUrl();
  const [isLoading, setIsLoading] = useState(true);
  const fetchEmp = async () => {
    await instance.get("/api/v1/emp/employee/all")
      .then((response) => {
        const filtereddata = response.data.map((obj, index) => {
          return {
            // ...obj,
            id: obj.empNo,
            empNo: obj.empNo,
            salary: obj?.salary,
            doj: obj?.doj,
            project: obj?.project?.name || "N/A",
            projectDate: obj?.projectDate,
            isbillable:
              obj.isBillable !== undefined
                ? obj.isBillable === "billable"
                  ? "Billable"
                  : "Non Billable"
                : "N/A",
            name: obj.fname + " " + obj.lname,
            active: obj?.empStatus && obj?.empStatus,
            resignDate: obj.resignDate ? obj.resignDate : "",
            exitDate: obj.exitDate ? obj.exitDate : "",
          };
        });
        setAllEmp(filtereddata);
        setFilteredData(filtereddata);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useLayoutEffect(() => {
    fetchEmp();
  }, []);

  useMemo(() => {
    let filteredRows = allEmp.filter((row) => {
      const matchesProjectType =
        projectTypeFilter === "all" || row.isbillable === projectTypeFilter;
      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter;
      const matchesSearch = row.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesProjectType && matchesStatus && matchesSearch;
    });
    setFilteredData(filteredRows);
  }, [allEmp, projectTypeFilter, statusFilter, searchQuery]);

  const handleProjectTypeChange = (e) => {
    setProjectTypeFilter(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async(id) => {
    await instance
      .delete(`/api/v1/emp/employee/delete/${id}`)
      .then(() => {
        setFilteredData(filteredData.filter((row) => row.id !== id));
        toast.success("Employee removed 😌");
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  if (isLoading) {
    return <Loading className="py-64" />;
  }
  return (
    <div className="w-[calc(100%-20px)]">
      <p className="block tracking-wide text-zinc-600 text-2xl font-bold mr-2 mb-4">
        Employee Table
      </p>

      <div className="flex items-center justify-start gap-2 flex-wrap">
        <FormElements.Select
          label="Project Type"
          className="w-56"
          optionsArray={[
            { id: "all", name: "All" },
            { id: "Billable", name: "Billable" },
            { id: "Non Billable", name: "Non Billable" },
          ]}
          name="projectType"
          value={projectTypeFilter}
          onChange={handleProjectTypeChange}
        />
        <FormElements.Input
          label="Search Name"
          type="text"
          className="w-56 h-8 mt-14"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        {/* <FormElements.Select
          label="Employee Status"
          className="w-56"
          optionsArray={[
            { id: "all", name: "All" },
            { id: "On-Role", name: "On-Role" },
            { id: "Resigned", name: "Resigned" },
          ]}
          name="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
        /> */}
        <Button
          className="scale-75 ml-auto"
          variant="ghost"
          size="icon"
          onClick={() => {
            fetchEmp();
            setIsLoading(true);
          }}
        >
          {" "}
          <RefreshCw />
        </Button>
      </div>
      {/* <Suspense fallback={<Loading/>}> */}

      <DataGrid
        rows={filteredData}
        checkboxSelection={false}
        style={{ fontSize: "0.8rem" }}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: <b>Actions</b>,
            width: 80,
            sortable: false,
            renderCell: (params) => (
              <BasicMenu
                rowData={params.row}
                onDelete={async() => await handleDelete(params.row.id)}
                fetchEmp={fetchEmp}
              />
            ),
          },
        ]}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      {/* </Suspense> */}
    </div>
  );
}

export function BasicMenu({ rowData, onDelete, fetchEmp }) {
  const [statusdialogOpen, setStatusDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false); 
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigation = useNavigate();
  const navigateTo = () => {
    navigation("/dashboard/edit-employee", { state: rowData });
  };
  return (
    <div>
      
      <StatusDialog
        open={statusdialogOpen}
        rowData={rowData}
        setDialogOpen={setStatusDialogOpen}
        fetchEmp={fetchEmp}
      />
      <Button
        variant="text"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Edit />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigateTo();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem>
        <AlertDialog
        open={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        onDelete={async () => {
          await onDelete();
          setAlertDialogOpen(false);
        }}
      /></MenuItem>
        {/* <MenuItem
          onClick={() => {
            // onDelete();
            handleClose();
            openDialog();
          }}
        >
          Delete
        </MenuItem> */}
        <hr className="my-1" />
        <MenuItem
          onClick={() => {
            setAlertDialogOpen(true);
            handleClose();
          }}
          className="text-theme-danger"
          style={{ color: "rgb(185 28 28)" }}
        >
          Status
        </MenuItem>
      </Menu>
    </div>
  );
}
