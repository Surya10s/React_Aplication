import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
export default function NaveBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{width:'100%',backgroundColor:'#3775d1'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          <form action="/">
          <Button type='submit' color="inherit" >     
          <img src="/images/image3.png" style={{width:'30px',marginRight:'13px'}} alt="Logo" />
              VetriVel</Button>
          </form>
          </Typography>
          <div style={{display:'flex',justifyContent:'left',alignItems:'end'}}>
          <Typography variant="h6" component="a" sx={{ flexGrow: 1 }}>
          <form action="/">
          <Button type='submit' color="inherit" >Home</Button>
          </form>
          </Typography>
          <Typography variant="h6" component="a" sx={{ flexGrow: 1 }}>
          <form action="/addincome">
          <Button type='submit' color="inherit" >Add Payments</Button>
          </form>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <form action="/newcustomer">
          <Button type='submit' color="inherit" >Add customer</Button>
          </form>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <form action="/newvechile">
          <Button type='submit' color="inherit" >Add Vechile</Button>
          </form>
          </Typography>
          <form action="/user">
          <Button type='submit' color="inherit" >customers</Button>
          </form>
        </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

