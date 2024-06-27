import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useFeedback } from "./FeedbackContext";

import { useForm } from "react-hook-form"

export default function Tripform({ vecno }) {
  const { showFeedback } = useFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" })

  const registerOptions = {
    Customer: {
      required: 'name Required'
    },
    Date: {
      required: 'Date Required',
      pattern: {
        value: /^\d{2}-\d{2}-\d{4}$/,
        message: 'Match dd-mm-yyy'
      }
    },
    LoadingPlace: {
      required: 'place Required'
    },
    Material: {
      required: 'material Required'
    },
    Qty: {
      required: 'Quantaty Required',
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message: 'Qty must be a valid number'
      },
      max: {
        value: 70,
        message: 'less than 70'
      }
    },
    TonPrice: {
      required: 'price Required',
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message: 'Ton Price must be a valid number'
      },
      max: {
        value: 2000,
        message: 'less than '
      }
    },
    TotalAmount: {
      required: 'amount Required',
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message: 'Amount must be a valid number'
      }
    },
    UnloadingPlace: {
      required: 'place Required'
    },
    Vechial: {
      required: 'Cannot Required'
    },
    Charges: {
      required: 'Charges Required',
      pattern: {
        value: /^[0-9]*\.?[0-9]+$/,
        message: ' must be a valid number'
      },
      max: {
        value: 5000,
        message: 'less than '
      }
    }
  }

  let [user, setuser] = useState([])
  useEffect(() => {
    async function fetchMyAPI() {
      let userdata = await fetch('http://localhost:5000/userdata')
      userdata = await userdata.json()
      setuser([...userdata])
    }

    fetchMyAPI()
  }, [])

  const [formData, setFormData] = useState({
    Customer: '',
    Date: '',
    LoadingPlace: '',
    Material: '',
    Qty: '',
    TonPrice: '',
    TotalAmount: '',
    UnloadingPlace: '',
    Vechial: '',
    Charges: ''
  });

  if (vecno !== null) {
    formData.Vechial = vecno._id

  }

  function handelchange(ev) {
    const { name, value } = ev.target
    let tot = {
      ...formData,
      [name]: value

    };
    tot.TotalAmount = parseFloat((tot.TonPrice * tot.Qty).toFixed(2))
    setFormData(tot)

  }

  const handleSubmit2 = async () => {

    try {

      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showFeedback('created');
        setFormData({
          Customer: '',
          Date: '',
          LoadingPlace: '',
          Material: '',
          Qty: '',
          TonPrice: '',
          TotalAmount: '',
          UnloadingPlace: '',
          Vechial: '',
          Charges: ''
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (


    <Box
      onChange={handelchange}
      onSubmit={handleSubmit(handleSubmit2)}
      component="form"

      sx={{
        '& > :not(style)': { m: 1, width: '50%' }, display: 'flex', flexDirection: 'row', height: '460px', marginLeft: '4em', border: '2px solid #3775d1', borderRadius: '6px', width: '600px', padding: '20px', marginBottom: '10px',
      }}
      noValidate
      autoComplete="off"
    >


      <div style={{ height: '450px', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

        <TextField id="outlined-basic" name='Date' style={{ width: '86.7%' }} {...register('Date', registerOptions.Date)} label="Date" value={formData.Date} variant="outlined" />

        <small style={{ color: '#C54B5C' }}>{errors?.Date && errors.Date.message}</small>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Customer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ width: '86.7%' }}
            renderInput={(params) => <TextField {...params} />}

            value={formData.Customer}
            label="customer"
            name='Customer'
            {...register('Customer', registerOptions.Customer)}
            onChange={handelchange}
          // onChange={handleChange}
          >{user.map((item) => {
            return (<MenuItem key={item.id} value={item._id}>{item.username}</MenuItem>)
          })}

          </Select>

        </FormControl>

        <small style={{ color: '#C54B5C' }}>{errors?.Customer && errors.Customer.message}</small>
        <TextField id="outlined-basic" name='LoadingPlace' style={{ width: '86.7%' }} {...register('LoadingPlace', registerOptions.LoadingPlace)} label="Loading Place" value={formData.LoadingPlace} variant="outlined" />

        <small style={{ color: '#C54B5C' }}>{errors?.LoadingPlace && errors.LoadingPlace.message}</small>


        <TextField id="outlined-basic" name='Material' style={{ width: '86.7%' }} {...register('Material', registerOptions.Material)} value={formData.Material} label="Material" variant="outlined" />
        <small style={{ color: '#C54B5C' }}>{errors?.Material && errors.Material.message}</small>
        <TextField id="outlined-basic" name='UnloadingPlace' style={{ width: '86.7%' }} {...register('UnloadingPlace', registerOptions.UnloadingPlace)} value={formData.UnloadingPlace} label="Place" variant="outlined" />
        <small style={{ color: '#C54B5C' }}>{errors?.UnloadingPlace && errors.UnloadingPlace.message}</small>
      </div>
      <div style={{ height: '450px', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

        <TextField id="outlined-basic" name='Charges' type='number' style={{ width: '86.7%' }} {...register('Charges', registerOptions.Charges)} label="Charges" value={formData.Charges} variant="outlined" />
        <small style={{ color: '#C54B5C' }}>{errors?.Charges && errors.Charges.message}</small>

        <TextField
          label=""
          id="outlined-start-adornment"
          sx={{ width: '86.7%' }}
          name='Qty'
          type='number'
          value={formData.Qty}
          {...register('Qty', registerOptions.Qty)}
          InputProps={{
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
        />
        <small style={{ color: '#C54B5C' }}>{errors?.Qty && errors.Qty.message}</small>
        <TextField id="outlined-basic" type='number' name='TonPrice' style={{ width: '86.7%' }} {...register('TonPrice', registerOptions.TonPrice)} label="Ton/price" value={formData.TonPrice} variant="outlined" />
        <small style={{ color: '#C54B5C' }}>{errors?.TonPrice && errors.TonPrice.message}</small>

        <label htmlFor="total">TotalAmount</label>
        <Typography id='total' variant="subtitle1" color="text.secondary" style={{ marginLeft: '4em' }} component="div">
          {formData.TotalAmount || 0}
        </Typography>

        <Button variant="contained" style={{ width: '34%', marginLeft: '41px' }} type='submit'>save</Button>


      </div>



    </Box>


  );
}

