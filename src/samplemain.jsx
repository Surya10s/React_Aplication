
import React, { useRef } from 'react';
import TableComponent from './sampletable';
import { parse, subDays, isWithinInterval } from 'date-fns';
import { Button } from '@mui/material';

const Printpage = ({ rows, userIncomes, totalamount, handleClose }) => {
  const tableRef = useRef();
  const parseDate = (date) => parse(date, 'dd-MM-yyyy', new Date());
  const now = new Date();
  const start = subDays(now, 7);
  const userTrips = rows.filter(item => isWithinInterval(parseDate(item.Date), { start, end: now }))
  const filterdincome = userIncomes.filter(item => isWithinInterval(parseDate(item.Date), { start, end: now }))

  const thisweekrecived = filterdincome.reduce((acc, item) => acc + (item.Amount || 0), 0)
  const thisweekamount = userTrips.reduce((acc, item) => acc + (item.TotalAmount || 0), 0)

  const handlePrint = () => {
    const printContent = tableRef.current;
    const WindowPrint = window.open('', '', 'width=900,height=650');
    WindowPrint.document.write(`
      <html>
        <head>
          <title></title>
          <style>
            @media print {
              body {
                -webkit-print-color-adjust: exact;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 5px;
              }
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    WindowPrint.document.close();
    WindowPrint.focus();
    WindowPrint.print();
    WindowPrint.close();
  };

  const columnincome = [
    {
      field: 'Date',
      width: 120,
      headerName: 'Date',
    },
    {
      field: 'By',
      width: 120,
      headerName: 'Method',
    },
    {
      field: 'Amount',
      headerName: 'Amount',
      width: 150,
      valueGetter: params => `${params.Amount} ₹`
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
      valueGetter: params => params.Vechial.vechialNo
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
    }

  ];
  return (
    <>
      <div ref={tableRef} style={{ padding: '30px', width: '600px', fontFamily: 'arial' }}>

        <h3>This week Supplies</h3>
        {rows === null ? <h1>nodata</h1> : <TableComponent rows={userTrips} columns={columns} thisweekrecived={thisweekamount} />}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h4>This Week Amount :{thisweekamount}</h4>
        </div>
        <br />
        <h3>This week Amount Recived</h3>
        {userIncomes === null ? <h1>nodata</h1> : <TableComponent rows={filterdincome} columns={columnincome} thisweekrecived={thisweekrecived} />}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h4 >This Week amountRecived :{thisweekrecived}</h4>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

          <table>
            <tr>

              <td>Balance</td>
              <td>{thisweekamount - thisweekrecived}</td>
            </tr>
            <tr>
              <td>Opeaning Balance</td>
              <td>{totalamount - (thisweekamount - thisweekrecived)}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{totalamount}</td>
            </tr>
          </table>

        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <Button onClick={handlePrint} variant='outlined' style={{ marginRight: '10px' }}>save</Button>
        <Button variant='outlined' onClick={handleClose}>Close</Button>

      </div>
    </>
  );
};

export default Printpage;
