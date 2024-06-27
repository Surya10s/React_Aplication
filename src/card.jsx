import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function MediaControlCard({ data }) {
  return (
    <form action={`/vechialdetial/${data._id}`}>
      <Button type='submit'>
        <Card sx={{ display: 'flex', width: '100', margin: '4px', marginTop: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5" className='text' color="primary" >
                {data.model}{data.id}
              </Typography>
              <Typography variant="subtitle1" color="primary" component="div">
                {data.vechialNo}
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
