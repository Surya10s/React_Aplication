import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useFeedback } from "./FeedbackContext";

export default function NewVechial() {


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
        vechialNo: {
            required: 'Name required'
        },
        model: {
            required: 'location required'
        }
    }


    let [formdata, setFormData] = useState({
        vechialNo: '',
        model: '',
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

            const response = await fetch('http://localhost:5000/submitnewvechile', {
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

    console.log(formdata)
    return (<>
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <Typography variant='h5' style={{}} >Add Customer</Typography>
            </div>
            <form action="" onChange={handelchange} onSubmit={handleSubmit(handelsubmit2)} >

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%' }}>

                    <div style={{ display: 'flex', height: '400px', width: '300px', flexDirection: 'column', border: 'solid 3px', justifyContent: 'space-around', padding: '30px', borderRadius: '2%', margin: '8px', borderColor: '#A0A0A0', alignItems: 'end' }}>

                        {/* <TextField id="outlined-basic" style={{ width: '100%' }}    type='number' label="Amount" name='Amount' value={formdata.Amount} variant="outlined" /> */}


                        <TextField id="outlined-basic" name='vechialNo' style={{ width: '100%' }} label="VechialNo" variant="outlined" {...register('vechialNo', registerOptions.vechialNo)} value={formdata.vechialNo} />
                        <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.vechialNo && errors.vechialNo.message}</small>
                        <TextField id="outlined-basic" name='model' style={{ width: '100%' }} label="Model" variant="outlined" {...register('model', registerOptions.model)} value={formdata.model} />
                        <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.model && errors.model.message}</small>
                        {/* <TextField id="outlined-basic" name='phoneno' type='number' style={{ width: '100%' }} label="Phone NO" variant="outlined"{...register('phoneno', registerOptions.phoneno)} value={formdata.phoneno} />
                        <small style={{ color: '#4E1BC2', fontFamily: '	Arial' }}>{errors?.phoneno && errors.phoneno.message}</small> */}

                        {/* <small style={{ color: '#4E1BC2', fontFamily: 'Arial' }}>{errors?.Date && errors.Date.message}</small> */}
                        <div>

                            <Button type='submit' variant='contained' style={{ width: '10%', marginRight: '10px' }}>Save</Button>
                            <Button variant='contained' onClick={handleNavigation} style={{ width: '10%' }}>back</Button>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    </>)
}