import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from "./FeedbackContext";
import { DataGrid } from '@mui/x-data-grid';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Incomemodify() {
    const navigate = useNavigate();
    const { showFeedback } = useFeedback();
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
        handleSubmit, setValue,
        formState: { errors },
    } = useForm({ mode: "onChange" })

    const handleNavigation = (path) => {
        navigate(-1);
    };

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
    
    
    
    
      
      
      
      
      
      
      const [rows, setTripRows] = useState([])
      const [user, setuser] = useState([])
      const { id } = useParams();
      let currentdata = null
      
        let [formData, setFormData] = useState({
          Amount: '',
          By: '',
          Customer: '',
          Description: '',
          Date: ''
        })

    useEffect(() => {
        async function fetchData() {
            try {
                const [incomeData, userData] = await Promise.all([
                    fetch('http://localhost:5000/incomedata')
                        .then(res => res.json())
                        .then(res => {
                            setTripRows(res)
                            currentdata = res.find(data => data._id === id) || null;
                            setValue('Date', currentdata.Date)
                            setValue('Amount', currentdata.Amount)
                            setValue('By', currentdata.By)
                            setValue('Customer', currentdata.Customer._id)
                            setValue('Description', currentdata.Description)

                            setFormData({
                                Amount: currentdata.Amount,
                                Date: currentdata.Date,
                                By: currentdata.By,
                                Customer: currentdata.Customer._id,
                                Description: currentdata.Description
                            })

                        }),
                    fetch('http://localhost:5000/userdata').then(res => res.json())
                ]);

                setuser([...userData])



            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    function handelchange(ev) {
        const { name, value } = ev.target
        let tot = {
            ...formData,
            [name]: value

        };
        setFormData(tot)

    }
    console.log(formData,'check')

    async function handleSubmit2() {

        try {
            const response = await fetch(`http://localhost:5000/incomemodify/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            console.log(response)
            if (response.ok) {
                showFeedback('Edited');
                handleNavigation('/')
            }


        } catch (error) {
            console.error('Error:', error);
        }
        // handleNavigation('/')

    };
    async function handeldelete() {
        try {
            fetch(`http://localhost:5000/incomedelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
        }
        catch (error) {
            console.error('Error:', error);
        }
        showFeedback('Deleted');
        handleNavigation()
    }
    return (
        <>
        <div style={{display:'flex',justifyContent:'center',margin:'30px'}}>
         <Typography variant="h5">Edit Payment</Typography>
        </div>

          <form  action="" onChange={handelchange} onSubmit={handleSubmit(handleSubmit2)} >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%' }}>
    
            <div style={{ display: 'flex', height: '400px', width: '300px', flexDirection: 'column', border: 'solid 3px', justifyContent: 'space-around', padding: '30px', borderRadius: '2%', margin: '8px', borderColor: '#A0A0A0', alignItems: 'end' }}>
    
              <TextField id="outlined-basic" style={{ width: '100%' }}   {...register('Amount', registerOptions.Amount)} type='number' label="Amount" name='Amount' value={formData.Amount} variant="outlined" />
    
              <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.Amount && errors.Amount.message}</small>
    
              <TextField id="outlined-basic" name='Date' style={{ width: '100%' }} {...register('Date', registerOptions.Date)} label="Date" value={formData.Date} variant="outlined" />
    
              <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Date && errors.Date.message}</small>
    
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name='By'
                  style={{ width: '100%' }}
                    value={formData.By}
                  label="method"
                  {...register('By', registerOptions.By)}
                  onChange={handelchange}
                >
                  <MenuItem key={1} value={'cash'}>Cash</MenuItem>
                  <MenuItem key={2} value={'cheque'}>Cheques</MenuItem>
                  <MenuItem key={3} value={'online'}>Online</MenuItem>
                  <MenuItem key={4} value={'Gpay'}>Gpay</MenuItem>
                  {/* enum: ["cash", "cheque", "online",'Gpay'] */}
                </Select>
              </FormControl>
              <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.By && errors.By.message}</small>
    
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                <Select
                key={1}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ width: '100%' }}
                  {...register('Customer', registerOptions.Customer)}
                  value={formData.Customer}
                  label="customer"
                  name='Customer'
                  // {...register('Customer',registerOptions.Customer)}
                  onChange={handelchange}
                // onChange={handleChange}
                >{user.map((item) => {
                  return (<MenuItem key={item.id} value={item._id}>{item.username}</MenuItem>)
                })}
    
                </Select>
    
              </FormControl>
              <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Customer && errors.Customer.message}</small>
    
              <TextField id="outlined-basic" style={{ width: '100%' }} {...register('Description', registerOptions.Description)} label="Description" name='Description' value={formData.Description} variant="outlined" />
              <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Description && errors.Description.message}</small>
              <div>
              <Button type='submit' variant='contained' style={{ width: '10%' }}>Save</Button>
              <Button  variant='contained' onClick={handeldelete} style={{ width: '13%',marginLeft:'10px' }}>Delete</Button>
              <Button  variant='contained' onClick={handleNavigation} style={{ width: '10%',marginLeft:'10px' }}>Back</Button>
              </div>
    
            </div>
    
          </div>
        </form>
         
      </>
    )
}