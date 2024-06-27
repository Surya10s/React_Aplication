import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


export default function CustomerElement({ data }) {

  return (

    <form action={`/customerdetial/${data._id}`}>
      <Button type='submit'>
        <Card sx={{ display: 'flex', width: '270px', margin: '4px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Avatar src='/png/image.png' sx={{ bgcolor: 'gray' }} />
                <Typography component={'div'} variant='h6' style={{ display: 'inline', marginLeft: '10px', marginTop: '5px' }}>
                  {data.username}
                </Typography>
              </div>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {data.amountbalance}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            </Box>
          </Box>
        </Card>
      </Button>
    </form>
  );
}
