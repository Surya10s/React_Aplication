
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default function Tripheading(){
    return(
        <div style={{ flexDirection:'row', display:'flex',justifyContent:'space-between'}}>
        <Typography component="h3" variant="h6" sx={{marginRight:'4em'}}>
          Date
        </Typography>
        <Typography component="div" variant="h6" sx={{marginRight:'4em'}}>
        VechialNo
        </Typography>
        <Typography component="div" variant="h6"sx={{marginRight:'4em'}}>
          Customername
        </Typography>
        <Typography component="div" variant="h6"sx={{marginRight:'4em'}}>
          UnloadingPlace
        </Typography>
        <Typography component="div" variant="h6"sx={{marginRight:'4em'}}>
          QtyTon
        </Typography>
        <Typography component="div" variant="h6"sx={{marginRight:'4em'}}>
        Price_Ton
        </Typography>
        <Typography component="div" variant="h6"sx={{marginRight:'4em'}}>
        Material
        </Typography>
        <Typography component="div" variant="h6"sx={{marginRight:'4em'}}>
        Totalamount
        </Typography>

        </div>
    )
}