import React from "react";
import Tripform from "./Tripform"
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Datas from "./Tripelement";
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useFeedback } from "./FeedbackContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} style={{ color: 'white', backgroundColor: '#3775d1', borderRadius: '8px' }} ref={ref} variant="filled" {...props} />;
});

export default function Vechialdetial() {
  const { feedback } = useFeedback();
  let [rows, setrows] = useState(null);
  const [lorrys, setlorrys] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('http://localhost:5000/lorrydata')
      let trips = await fetch('http://localhost:5000/data')
      trips = await trips.json()
      response = await response.json()
      setrows([...trips])
      setlorrys([...response]);
    }
    fetchMyAPI()
  }, [])

  useEffect(() => {
    async function refresh() {
      let trips = await fetch('http://localhost:5000/data')
      trips = await trips.json()
      setrows([...trips])
    }
    refresh()
  }, [feedback])

  const { id } = useParams();

  let vechial = null
  function findingvechial() {
    if (lorrys != null) {
      lorrys.map((item) => {
        if (item._id == id) {
          vechial = item

        }
      })
    }
  }

  findingvechial()
  let filterdrow = []
  function filtring() {
    if (rows != null) {
      rows.map((itm) => {
        if (itm.Vechial._id == id) {
          filterdrow.push(itm)
        }
      })
    }
  }
  filtring()

  return (
    <div>
      {vechial && <h1 style={{ fontFamily: 'arial',color:'#3775d1' }}>{vechial.vechialNo}</h1>}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Tripform vecno={vechial} />
      </div>
      <Box sx={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {rows === null ? <h1>nodata</h1> : <Datas rows={filterdrow} />}
      </Box>
      <Snackbar open={!!feedback} autoHideDuration={3000} style={{ backgroundColor: 'snow', color: 'red' }}>
        <div style={{}}>
          <Alert>{feedback}</Alert>
        </div>
      </Snackbar>
    </div>
  )
}