import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function DatasHome({ rows }) {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const columns = [
    {
      field: 'Date',
      headerName: 'Date',
      width: 120,
    },
    {
      field: 'Vechial',
      headerName: 'Vechile No',
      width: 150,
      valueGetter: params => params.vechialNo
    },
    {
      field: 'Customer',
      headerName: 'Customer Name',
      width: 130,
      valueGetter: params => params.username
    },
    {
      field: 'Material',
      headerName: 'Material',
      width: 110,
    },
    {
      field: 'Qty',
      headerName: 'QtyTon',
      width: 110,
    },
    {
      field: 'TonPrice',
      headerName: 'Ton/Price',
      width: 110,
    },
    {
      field: 'TotalAmount',
      headerName: 'Total Amount',
      width: 110,
    }, {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined" size="small"
          onClick={() => handleNavigation(`/tripmodify/${params.id}`)}
        >
          Edit
        </Button>
      ),
    },

  ];

  return (<>{rows === null ?

    <h1>nodata</h1> :
    <DataGrid
      rows={rows}
      columns={columns}
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