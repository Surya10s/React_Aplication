
import { useState, useEffect } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function Incometable() {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const column = [
    {
      field: 'Amount',
      headerName: 'Amount',
      width: 110,
      valueGetter: params => `${params} ₹`
    },
    {
      field: 'Customer',
      width: 110,
      headerName: 'Name',
      valueGetter: params => params.username

    },
    {
      field: 'Date',
      width: 120,
      headerName: 'Date',

    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined" size="small"
          onClick={() => handleNavigation(`/incomeedit/${params.id}`)}
        >
          Edit
        </Button>
      ),
    }

  ]

  let [rows, setrows] = useState([])
  useEffect(() => {
    async function fetchMyAPI() {
      let incomedata = await fetch('http://localhost:5000/incomedata')
      incomedata = await incomedata.json()
      setrows([...incomedata])
    }
    fetchMyAPI()
  }, [])

  return (<>
  {rows === null ?
    <h1>nodata</h1> :
    <DataGrid
      rows={rows}
      columns={column}
      getRowId={(row) => row._id}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 7,
          },
        },
      }}
      pageSizeOptions={[7]}
      checkboxSelection
      disableRowSelectionOnClick

    />
  }
  </>)
}