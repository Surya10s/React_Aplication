import { useParams } from "react-router-dom"
import React from 'react';
import { useState, useEffect } from "react"
import TextField from "@mui/material/TextField";
import SampleCustomerDetail from './samplemain';
import { parse, subDays, isWithinInterval } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useFeedback } from './FeedbackContext';

export default function CustomerDetial() {

  const { feedback } = useFeedback();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} style={{ color: 'white', backgroundColor: '#3775d1', borderRadius: '8px' }} ref={ref} variant="filled" {...props} />;
  });

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const columnincome = [
    {
      field: 'Amount',
      headerName: 'Amount',
      width: 150,
      valueGetter: params => `${params} ₹`
    },
    {
      field: 'By',
      width: 120,
      headerName: 'Method',

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

  const columns = [
    {
      field: 'Date',
      headerName: 'Date',
      width: 120,
    },
    {
      field: 'Vechial',
      headerName: 'Vechial No',
      width: 150,
      valueGetter: params => params.vechialNo
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
    }
  ];

  const [totalReceived, setTotalReceived] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalrecived2, setTotalrecived2] = useState(0);
  const [incomeRows, setIncomeRows] = useState([]);
  const [tripRows, setTripRows] = useState([]);
  const [userList, setUserList] = useState([]);
  const [days, setDays] = useState(7);
  const { id } = useParams();
  const [resetdata, setResetData] = useState([0])

  useEffect(() => {
    async function fetchData() {
      try {
        const [tripsData, usersData, incomeData] = await Promise.all([
          fetch('http://localhost:5000/data').then(res => res.json()),
          fetch('http://localhost:5000/userdata').then(res => res.json()),
          fetch('http://localhost:5000/incomedata').then(res => res.json())
        ]);

        setTripRows(tripsData);
        setUserList(usersData);
        setIncomeRows(incomeData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  const currentUser = userList.find(user => user._id === id) || null;
  const userTrips = tripRows.filter(trip => trip.Customer._id === id);
  const userIncomes = incomeRows.filter(income => income.Customer._id === id);

  useEffect(() => {
    let calculateamount = userTrips.reduce((acc, item) => acc + (item.TotalAmount || 0), 0)
    setTotalAmount(calculateamount);
    let calculateincome = userIncomes.reduce((acc, item) => acc + (item.Amount || 0), 0)
    setTotalReceived(calculateincome);
    setTotalrecived2(calculateamount - calculateincome)
  }, [tripRows, resetdata]);

  const parseDate = (date) => parse(date, 'dd-MM-yyyy', new Date());

  const handlePeriodAnalysis = (event) => {
    event.preventDefault();

    const now = new Date();
    const start = subDays(now, days);

    setTotalAmount(userTrips
      .filter(item => isWithinInterval(parseDate(item.Date), { start, end: now }))
      .reduce((acc, item) => acc + item.TotalAmount, 0)
    );

    setTotalReceived(userIncomes
      .filter(item => isWithinInterval(parseDate(item.Date), { start, end: now }))
      .reduce((acc, item) => acc + item.Amount, 0)
    );
  };

  const handleDaysChange = (event) => setDays(Number(event.target.value));

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle >Vetrivel</DialogTitle>
        {tripRows === null ? <h1>nodata</h1> : <SampleCustomerDetail rows={userTrips} totalamount={totalrecived2} handleClose={() => handleClose()} userIncomes={userIncomes} columns={columns} />}
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
        <Avatar src='/png/image.png' sx={{ bgcolor: 'gray', marginTop: '28px', marginLeft: '31px' }} />

        {currentUser && <h1 style={{ marginLeft: '10px', color: '#3775d1', fontFamily: '	Arial', display: 'inline' }}>{currentUser.username}</h1>}

      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '25%', padding: '20px', color: '#31316C', marginRight: '20px', backgroundColor: '#7AA8D7' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Enter Days To Analysis
            </Typography>
            <form action="" onSubmit={handlePeriodAnalysis}>
              <TextField id="outlined-basic" name="days" size="small" sx={{ width: '30%' }} style={{ backgroundColor: '#7AA8D7', }} onChange={handleDaysChange} value={days} variant="outlined" type="number" />
              <Button type="submit" variant='outlined' size="large" style={{ color: '#31316C', marginLeft: '7px' }} >Set</Button>
              <Button
                variant='outlined'
                size="large"
                style={{ color: '#31316C', marginLeft: '7px' }}
                onClick={() => {
                  setResetData((i) => [0])
                }}>All Time</Button>
            </form>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 180, padding: '20px', backgroundColor: '#3775d1', color: 'white' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Total Amount
            </Typography>
            <Typography variant="h5">
              {totalAmount} ₹
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 180, padding: '20px', marginLeft: '20px', backgroundColor: '#3775d1', color: 'white' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Amount Recived
            </Typography>
            <Typography variant="h5">
              {totalReceived} ₹
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 180, padding: '20px', marginLeft: '20px', backgroundColor: '#3775d1', color: 'white' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Balance
            </Typography>
            <Typography variant="h5">
              {totalAmount - totalReceived} ₹
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div style={{ marginTop: '30px', marginLeft: '30px' }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          This Week Acount
        </Button>
        <SimpleDialog
          open={open}
          onClose={handleClose}
        />
      </div>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '30px' }}>
        <div >
          {tripRows === null ?
            <h1>nodata</h1> :
            <DataGrid
              rows={userTrips}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          }
        </div>
        <div>
          {userIncomes === null ?
            <h1>nodata</h1> :
            <div >
              <DataGrid
                rows={userIncomes}
                columns={columnincome}
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
            </div>
          }
        </div>
        <Snackbar open={!!feedback} autoHideDuration={3000} style={{ backgroundColor: 'snow', color: 'red' }}>
          <div style={{}}>
            <Alert>{feedback}</Alert>
          </div>
        </Snackbar>
      </div>
    </>
  )
}