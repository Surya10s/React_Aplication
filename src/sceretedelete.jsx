import CustomerElement from "./CustomerElement"
import { useState,useEffect } from "react"




import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Typography } from '@mui/material';
// import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Secretevechiledelete(){

    let [vechialdata,setvechial] = useState([])
    useEffect(() => {
      async function fetchMyAPI() {
        let data = await fetch('http://localhost:5000/lorrydata')
        data = await data.json()
        setvechial([...data])
    }
      fetchMyAPI()
    }, [])

const [id,setid] = useState('')

function handelchange(e){
setid(old=>e.target.value)
}
console.log(id)

async function handeldelete(e) {
  // e.preventDefault()
  try {
      const response = fetch(`http://localhost:5000/vechiledelete/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }

      })
    //   if ((await response).ok) {
    //       showFeedback('Deleted');
    //       handleNavigation()
    //   }

  }
  catch (error) {
      console.error('Error:', error);
  }

}
    return(
        <div>
            {/* {user.map((itme)=>{
            return <CustomerElement data={itme} key={itme.key}/>
            })} */}

            <h3>note: you can only delete the vecile with no data otherwise the domine will broke and you may have to call expert surya</h3><br />
            <form action="" onChange={handelchange} onSubmit={handeldelete}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">VechileNo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ width: '20%' }}
                  // {...register('Customer', registerOptions.Customer)}
                  label="VechileNo"
                  name='vechile'
                  onChange={handelchange}
                >{vechialdata.map((item) => {
                  return (<MenuItem key={item._id} value={item._id}>{item.vechialNo}</MenuItem>)
                })}

                </Select>

              </FormControl>
              <button>submit</button>
              </form>
        </div>
    )
}