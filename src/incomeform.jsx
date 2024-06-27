import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Incomeform() {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" })

  const registerOptions = {
    Amount: {
      required: ' Fill Amount'
    },
    By: {
      required: 'Select Method'
    },
    Customer: {
      required: 'Select Giver'
    },
    Description: {
      required: 'Not Empty'
    },
    Date: {
      required: 'Date Required',
      pattern: {
        value: /^\d{2}-\d{2}-\d{4}$/,
        message: 'Match dd-mm-yyy'
      }
    }
  }

  const column = [
    {
      field: 'Amount',
      headerName: 'Amount',
      width: 150,
      valueGetter: params => `${params} ₹`
    },
    {
      field: 'Customer',
      width: 120,
      headerName: 'Name',
      valueGetter: params => params.username

    },
    {
      field: 'Date',
      width: 120,
      headerName: 'Date',
      // valueGetter: params => params.username

    }
  ]


  let [formdata, setFormData] = useState({
    Amount: '',
    By: '',
    Customer: '',
    Description: '',
    Date: ''
  })
  let [user, setuser] = useState([])
  const [rows, setrows] = useState([])

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let userdata = await fetch('http://localhost:5000/userdata')
        userdata = await userdata.json()
        setuser([...userdata])

        let incomedata = await fetch('http://localhost:5000/incomedata')
        incomedata = await incomedata.json()
        setrows([...incomedata])
      }
      catch (e) {
        console.log(e)
      }
    }

    fetchMyAPI()
  }, [])

  function handelchange(ev) {
    const { name, value } = ev.target
    let tot = {
      ...formdata,
      [name]: value
    }
    console.log([name])
    setFormData(tot)
  }
  async function handelsubmit2() {

    try {

      const response = await fetch('http://localhost:5000/submitincome', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
      })
      if (response.ok) {
        let incomedata = await fetch('http://localhost:5000/incomedata')
        incomedata = await incomedata.json()
        setrows([...incomedata])
        handleClick()

      }
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (<>

    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ width: '50%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px' }}>
          <Typography variant='h5' style={{}} >Payment</Typography>
        </div>
        <form action="" onChange={handelchange} onSubmit={handleSubmit(handelsubmit2)} >

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%' }}>

            <div style={{ display: 'flex', height: '400px', width: '40%', flexDirection: 'column', border: 'solid 3px', justifyContent: 'space-around', padding: '30px', borderRadius: '2%', margin: '8px', borderColor: '#A0A0A0', alignItems: 'end' }}>

              <TextField id="outlined-basic" style={{ width: '100%' }}   {...register('Amount', registerOptions.Amount)} type='number' label="Amount" name='Amount' value={formdata.Amount} variant="outlined" />

              <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.Amount && errors.Amount.message}</small>

              <TextField id="outlined-basic" name='Date' style={{ width: '100%' }} {...register('Date', registerOptions.Date)} label="Date" Value={344} variant="outlined" />

              <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Date && errors.Date.message}</small>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name='By'
                  style={{ width: '100%' }}
                  label="method"
                  {...register('By', registerOptions.By)}
                  onChange={handelchange}
                >
                  <MenuItem key={1} value={'cash'}>Cash</MenuItem>
                  <MenuItem key={2} value={'cheque'}>Cheques</MenuItem>
                  <MenuItem key={3} value={'online'}>Online</MenuItem>
                  <MenuItem key={4} value={'Gpay'}>Gpay</MenuItem>
                </Select>
              </FormControl>
              <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.By && errors.By.message}</small>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ width: '100%' }}
                  {...register('Customer', registerOptions.Customer)}
                  label="customer"
                  name='Customer'
                  onChange={handelchange}
                >{user.map((item) => {
                  return (<MenuItem key={item.id} value={item._id}>{item.username}</MenuItem>)
                })}

                </Select>

              </FormControl>
              <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Customer && errors.Customer.message}</small>
              <TextField id="outlined-basic" style={{ width: '100%' }} {...register('Description', registerOptions.Description)} label="Description" name='Description' value={formdata.Description} variant="outlined" />
              <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Description && errors.Description.message}</small>
              <Button type='submit' variant='contained' style={{ width: '10%' }}>Save</Button>

            </div>
          </div>
        </form>
      </div>
      <div style={{ height: '470px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px' }}>
          <Typography variant='h5' style={{}} >Last Recived</Typography>
        </div>
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
        <div>
          <button onClick={handleClick}>click</button>
          <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
            <Alert onClose={handleClose} sx={{ bgcolor: '#6a5acd' }}  >
              Payment Added
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  </>)
}