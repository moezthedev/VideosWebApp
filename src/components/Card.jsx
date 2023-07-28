  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import CardMedia from '@mui/material/CardMedia';
  import Typography from '@mui/material/Typography';
  import { CardActionArea } from '@mui/material';
  import Container from '@mui/material/Container';
  import Button from  '@mui/material/Button'
  import './App.css';
//Recommended Videos Component
  const YourComponent = () => {
    const [videos, setVideos] = useState([]);
  const [views,setviews] = useState([])
  const [more,setMore] = useState(false)
    useEffect(() => {


      const fetchRecommendedVideos = async () => {
        try {
          const apiKey = 'AIzaSyBTp-xJuO3Py3qaLpCsL5c0GH5o6fxnVxI';
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=${apiKey}`
          );

          if (response.status === 200) {
            const data = response.data;
            const videoIds = response.data.items.map((video) => video.id);
            
          for(let i=0;i<10;i++){
      
            const secondresponse = await axios.get(
              `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds[i]}&key=AIzaSyBTp-xJuO3Py3qaLpCsL5c0GH5o6fxnVxI`
            );
          
            
          let responseOfviews = secondresponse.data.items.map((items)=>items.statistics.viewCount)
            
          let a = responseOfviews.pop();
          
            setviews((prevViews) => [...a]);
          
            
            
          }
         
          
            setVideos(data.items);
      
            
          } else {
            console.log(`Request failed with status code ${response.status}`);
          }
        } catch (error) {
          console.log(`An error occurred: ${error}`);
        }
      };

      fetchRecommendedVideos();
    }, []);
  const handleMore = ()=>{
  setMore(true)
  }

    return (
      <Container fixed>
      <div className="card-container">
        
        {videos.map((video) => (
          <Card key={video.id} sx={{ maxWidth: 345 }} className="card">
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  {video.snippet.title}
                </Typography>
                <p className="channel-name">{video.snippet.channelTitle}</p>
                <Typography variant="body2" color="text.secondary">
                  <p>
                    {views.map((items)=>items)} Views • {video.snippet.publishedAt}
                  </p>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      <Button onClick={handleMore}>More Videos</Button>
      </Container>
    );
  };

  export default YourComponent;
