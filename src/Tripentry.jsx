import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Date',
    headerName: 'Date',
    width: 150,
  },
  {
    field: 'VechialNo',
    headerName: 'Vechial No',
    width: 150,
  },
  {
    field: 'Customer',
    headerName: 'Customer Name',
    width: 130,
  },
  {
    field: 'Material',
    headerName: 'Material',
    width: 110,
  },
  {
    field: 'UnloadingPlace',
    headerName: 'Place',
    width: 110,
  },
  {
    field: 'QtyTon',
    headerName: 'QtyTon',
    width: 110,
  },
  {
    field: 'Price_Ton',
    headerName: 'Ton/Price',
    width: 110,
  },
  {
    field: 'Totalamount',
    headerName: 'Total Amount',
    width: 110,
  }, {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Button
      variant="outlined" size="small"
        onClick={() => handleDelete(params.id)}
      >
        Delete
      </Button>
    ),
  },

];

function handleDelete(id){
    console.log(id)
}

const rows = [
    {id:1,Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
    {id:2,Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
    {id:3,Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
    {id:4,Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
    {id:5,Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
    {id:6,Date:'20/08/2023',Material:'chips',UnloadingPlace:'bengalore',Customer:'mannusammi',QtyTon:30,VechialNo:'TN O2 BY 9599',Price_Ton:'300',Totalamount:'27899'},
]

// const rows = [
//   { id: 1, lastName: 'Snow',Date: 'Jon', age: 14 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
