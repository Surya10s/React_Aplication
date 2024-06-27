import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useFeedback } from "./FeedbackContext";

export default function NewCustomer() {


    const { showFeedback } = useFeedback();
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/');
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" })


    const registerOptions = {
        username: {
            required: 'Name required'
        },
        location: {
            required: 'location required'
        },
        phoneno: {
            required: 'phone No required'
            ,
            max: {
                value: 10000000000,
                message: '10 num'
            }
        }
    }


    let [formdata, setFormData] = useState({
        username: '',
        location: '',
        phoneno: ''
    })

    function handelchange(ev) {
        const { name, value } = ev.target
        let tot = {
            ...formdata,
            [name]: value
        }
        setFormData(tot)
    }

    async function handelsubmit2() {

        try {

            const response = await fetch('http://localhost:5000/submitnewcustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata)
            })
            if (response.ok) {
                showFeedback('created');
                handleNavigation()
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }


    return (<>
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <Typography variant='h5' style={{}} >Add Customer</Typography>
            </div>
            <form action="" onChange={handelchange} onSubmit={handleSubmit(handelsubmit2)} >

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%' }}>

                    <div style={{ display: 'flex', height: '400px', width: '300px', flexDirection: 'column', border: 'solid 3px', justifyContent: 'space-around', padding: '30px', borderRadius: '2%', margin: '8px', borderColor: '#A0A0A0', alignItems: 'end' }}>

                        {/* <TextField id="outlined-basic" style={{ width: '100%' }}    type='number' label="Amount" name='Amount' value={formdata.Amount} variant="outlined" /> */}


                        <TextField id="outlined-basic" name='username' style={{ width: '100%' }} label="Name" variant="outlined" {...register('username', registerOptions.username)} value={formdata.username} />
                        <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.username && errors.username.message}</small>
                        <TextField id="outlined-basic" name='location' style={{ width: '100%' }} label="Location" variant="outlined" {...register('location', registerOptions.location)} value={formdata.location} />
                        <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.location && errors.location.message}</small>
                        <TextField id="outlined-basic" name='phoneno' type='number' style={{ width: '100%' }} label="Phone NO" variant="outlined"{...register('phoneno', registerOptions.phoneno)} value={formdata.phoneno} />
                        <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.phoneno && errors.phoneno.message}</small>

                        {/* <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Date && errors.Date.message}</small> */}
<div>

                        <Button type='submit' variant='contained' style={{ width: '10%',marginRight:'10px' }}>Save</Button>
                        <Button  variant='contained' onClick={handleNavigation} style={{ width: '10%' }}>back</Button>
</div>

                    </div>
                </div>
            </form>

        </div>
    </>)
}