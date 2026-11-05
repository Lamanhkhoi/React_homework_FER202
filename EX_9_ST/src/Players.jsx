import { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

function Players() {


const [APIData, setAPIData]= useState([])
const baseURL=`https://6adff4c48e42963c8d5e85ec.mockapi.io/player`;
useEffect(() => {fetch(baseURL)
  .then(response =>{
      if(!response.ok){
          throw new Error(`HTTP Status: ${response.status}`)
}
      return response.json()
})            
  .then(data => {setAPIData(data)})
  .catch(error => console.log(error.message));
},[]);
return (
 <Grid container spacing={2}>
 {APIData.map((data)=>{
        return (
        <Grid key={data.id} size={{ md: 4 }}>
           <Card>
      <CardMedia
        component="img"
        height="240"
        image={data.img}
        alt={data.name}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {data.club}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{data.nation}</Button>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card> 
    </Grid>
             )})}
 </Grid>
            )}
export default Players
