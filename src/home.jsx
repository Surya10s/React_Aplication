import React from 'react';
import { parse, subDays, isWithinInterval } from 'date-fns';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DatasHome from "./DatasForHomePage";
import Button from "@mui/material/Button";
import Incometable from "./incometable";
import Card from '@mui/material/Card';
import MediaControlCard from './card';
import { Box } from "@mui/material";
import { useFeedback } from './FeedbackContext';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';

import './home.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} style={{color:'white',backgroundColor:'#3775d1',borderRadius:'8px'}} ref={ref} variant="filled" {...props} />;
});

export default function Home() {


  const { feedback } = useFeedback();

  const [lorrys, setLorrys] = useState([]);
  const [incomeRows, setIncomeRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalAmount1, setTotalAmount1] = useState(0);
  const [totalReceived1, setTotalReceived1] = useState(0);
  const [days, setDays] = useState(); // Default to last 7 days
  const [resetdata, setResetData] = useState([0])

  useEffect(() => {
    async function fetchData() {
      try {
        const incomeResponse = await fetch('http://localhost:5000/incomedata');
        const incomeData = await incomeResponse.json();
        setIncomeRows(incomeData);

        const tripsResponse = await fetch('http://localhost:5000/data');
        const tripsData = await tripsResponse.json();
        setRows(tripsData);

        const lorryResponse = await fetch('http://localhost:5000/lorrydata');
        const lorryData = await lorryResponse.json();
        setLorrys(lorryData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const totalAmount = rows.reduce((acc, itm) => acc + (itm.TotalAmount || 0), 0);
    setTotalAmount1(totalAmount);

    const totalReceived = incomeRows.reduce((acc, itm) => acc + (itm.Amount || 0), 0);
    setTotalReceived1(totalReceived);
  }, [rows, incomeRows, resetdata]);

  const parseDate = (date) => parse(date, 'dd-MM-yyyy', new Date());

  const periodAnalysis = (ev) => {
    ev.preventDefault();

    const now = new Date();
    const start = subDays(now, days);
    const sprows = rows.filter(item => isWithinInterval(parseDate(item.Date), { start, end: now })).map(item => item.TotalAmount);
    const spincomeRows = incomeRows.filter(item => isWithinInterval(parseDate(item.Date), { start, end: now })).map(item => item.Amount);

    setTotalAmount1(sprows.reduce((acc, curr) => acc + curr, 0));
    setTotalReceived1(spincomeRows.reduce((acc, curr) => acc + curr, 0));
  };

  const handleDaysChange = (ev) => {
    setDays(Number(ev.target.value));
  };
  return (
    <div>
 
      <div>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          <Box  sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginLeft: '13px' }}>

            {lorrys && lorrys.map((item) => {
              return <  MediaControlCard data={item} key={item._id} />
            })}

          </Box>



        </Box>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ width: '20%', padding: '20px', color: '#204770', marginRight: '20px', backgroundColor: '#7FB1E4' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Enter Days To Analysis
              </Typography>
              <form action="" onSubmit={periodAnalysis}>
                <TextField id="outlined-basic" name="days" size="small" sx={{  width: '30%' }} style={{ backgroundColor: '#7FB1E4'}} onChange={handleDaysChange} value={days} variant="outlined" type="number" />
                <Button type="submit" variant="contained" style={{borderColor: '#7AA8D7',color: '#31316C', marginLeft: '7px' }} >Set</Button>
                <Button
                  variant="contained"
                  style={{ borderColor: '#7AA8D7', color: '#31316C', marginLeft: '7px' }}
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
              {totalAmount1 == null ? <Typography variant="h5">
                {totalAmount1}
              </Typography> : <Typography variant="h5">
                {totalAmount1}
              </Typography>}



            </CardContent>
          </Card>
          <Card sx={{ minWidth: 180, padding: '20px', marginLeft: '20px', backgroundColor: '#3775d1', color: 'white' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Amount Recived
              </Typography>
              {totalReceived1 == null ?
                <Typography variant="h5">
                  {totalReceived1} ₹
                </Typography> : <Typography variant="h5">{totalReceived1} </Typography>}

            </CardContent>
          </Card>
          <Card sx={{ minWidth: 180, padding: '20px', marginLeft: '20px', backgroundColor: '#3775d1', color: 'white' }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Balance
              </Typography>
              <Typography variant="h5">
                {totalAmount1 - totalReceived1}
              </Typography>
            </CardContent>
          </Card>
        </div>


        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '30px' }}>
          <div style={{width:'65%'}}>
            {rows === null ? <h1>nodata</h1> : <DatasHome rows={rows} />}
          </div>
          <div style={{width:'33%'}}>
            <Incometable />

          </div>
        </div>
      </div>
      <Snackbar open={!!feedback} autoHideDuration={3000} style={{backgroundColor:'snow',color:'red'}}>
        <div style={{}}>
        <Alert>{feedback}</Alert>
        </div>
      </Snackbar>
    </div>
  )
}