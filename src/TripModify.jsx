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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Tripmodify() {
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

    const handleNavigation = () => {
        navigate(-1);
    };

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

    const [user, setuser] = useState([])
    const { id } = useParams();
    let currentdata = null
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
    useEffect(() => {
        async function fetchData() {
            try {
                const [tripsData, userData] = await Promise.all([
                    fetch('http://localhost:5000/data')
                        .then(res => res.json())
                        .then(res => {
                            setTripRows(res)
                            currentdata = res.find(data => data._id === id) || null;
                            setValue('Date', currentdata.Date)
                            setValue('Customer', currentdata.Customer._id)
                            setValue('LoadingPlace', currentdata.LoadingPlace)
                            setValue('Material', currentdata.Material)
                            setValue('Qty', currentdata.Qty)
                            setValue('TonPrice', currentdata.TonPrice)
                            setValue('TotalAmount', currentdata.TotalAmount)
                            setValue('UnloadingPlace', currentdata.UnloadingPlace)
                            setValue('Vechial', currentdata.Vechial._id)
                            setValue('Charges', currentdata.Charges)

                            setFormData({
                                Customer: currentdata.Customer._id,
                                Date: currentdata.Date,
                                LoadingPlace: currentdata.LoadingPlace,
                                Material: currentdata.Material,
                                Qty: currentdata.Qty,
                                TonPrice: currentdata.TonPrice,
                                TotalAmount: currentdata.TotalAmount,
                                UnloadingPlace: currentdata.UnloadingPlace,
                                Vechial: currentdata.Vechial._id,
                                Charges: currentdata.Charges,
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
        tot.TotalAmount = parseFloat((tot.TonPrice * tot.Qty).toFixed(2))
        setFormData(tot)

    }
    async function handleSubmit2() {

        try {
            const response = await fetch(`http://localhost:5000/tripdatamodify/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            if (response.ok) {
                showFeedback('Edited');
                handleNavigation('/')
            }

        } catch (error) {
            console.error('Error:', error);
        }

    };

    async function handeldelete() {
        try {
            const response = fetch(`http://localhost:5000/tripdatadelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            if ((await response).ok) {
                showFeedback('Deleted');
                handleNavigation()
            }

        }
        catch (error) {
            console.error('Error:', error);
        }

    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    onChange={handelchange}
                    onSubmit={handleSubmit(handleSubmit2)}
                    component="form"

                    sx={{
                        '& > :not(style)': { m: 1, width: '50%' }, display: 'flex', flexDirection: 'row', height: '460px', marginLeft: '4em', border: '2px solid #3775d1', borderRadius: '6px', width: '600px', padding: '20px', margin: '20px',
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

                                label="customer"
                                name='Customer'
                                {...register('Customer', registerOptions.Customer)}
                                onChange={handelchange}
                                value={formData.Customer}

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

                        <TextField id="outlined-basic" name='Charges' value={formData.Charges} type='number' style={{ width: '86.7%' }} {...register('Charges', registerOptions.Charges)} label="Charges" variant="outlined" />
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

                        <label htmlFor="total" style={{ fontFamily: 'Arial' }}>Total Amount</label>
                        <Typography id='total' variant="subtitle1" color="text.secondary" style={{ marginLeft: '4em', fontFamily: 'Arial' }} component="div">
                            {formData.TotalAmount || 0}
                        </Typography>
                        <div>
                            <Button variant="contained"
                                style={{ width: '30px', display: 'inline', backgroundColor: '#3775d1' }}
                                type='submit'>Edit</Button>
                            <Button variant="contained"
                                onClick={handeldelete}
                                style={{ width: '30px', marginLeft: '11px', marginRight: '11px', backgroundColor: '#3775d1' }}>Delete</Button>
                            <Button onClick={handleNavigation} variant="contained" >Back</Button>

                        </div>
                    </div>


                    <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
                        <Alert onClose={handleClose} sx={{ bgcolor: '#6a5acd' }}  >
                            Payment Added
                        </Alert>
                    </Snackbar>
                </Box>
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-end', marginRight: '8em' }}>

            </div>
        </>
    )
}