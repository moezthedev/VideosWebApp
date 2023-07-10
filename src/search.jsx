import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import loader from "./loader.gif"
import VisibilityIcon from "./eye.png";
const RecommendedVideos = ({ search}) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      try {
        const apiKey = 'AIzaSyBfgOUlPxOrWvqmMTaTbR-XibZybQLrFJ0';
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&maxResults=20&key=${apiKey}`
        );

        if (response.status === 200) {
          const data = response.data;
          const videoIds = data.items.map((video) => video.id.videoId).join(',');
          const statisticsResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`
          );

          if (statisticsResponse.status === 200) {
            const statisticsData = statisticsResponse.data;
            const updatedVideos = data.items.map((video, index) => ({
              ...video,
              statistics: statisticsData.items[index].statistics
            }));
            setVideos(updatedVideos);
            setIsLoading(false); 
          } else {
            console.log(`Request failed with status code ${statisticsResponse.status}`);
            setIsLoading(false);
          }
        } else {
          console.log(`Request failed with status code ${response.status}`);
          setIsLoading(false); 
        }
      } catch (error) {
        console.log(`An error occurred: ${error}`);
         setIsLoading(false); 
      }
    };

    fetchRecommendedVideos();
  }, [search]);

  const formatViewsCount = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    } else {
      return views.toString();
    }
  };
const titleFormater=(title)=>{
  return title.substring(0, 50)+ "...";
}
function getTimeAgo(timestamp) {
  const currentTimestamp = new Date().getTime();
  const videoTimestamp = new Date(timestamp).getTime();
  const difference = currentTimestamp - videoTimestamp;
  
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
}
//videos
if (isLoading) {
  return (
    <div className="loader-container">
      <img src={loader} alt="Loading..." />
    </div>
  );
}


  return (
    <Grid container spacing={4} p={3}>
      {videos.map((video) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={video.id.videoId}>
             <Link
      to={`/video?id=${video.id.videoId}`}
      style={{ textDecoration: 'none' }}
    ><Card sx={{ height: '100%' }}>
            <CardActionArea  >
              <CardMedia component="img" height="200" image={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
              <CardContent>
                <Typography variant="h6">{titleFormater(video.snippet.title)}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {video.snippet.channelTitle}
                </Typography>
            
                <Typography variant="subtitle2" color="textSecondary">
                <img style={{width:"13px"}} src={VisibilityIcon} alt="views icon" />  
                 {video.statistics && formatViewsCount(parseInt(video.statistics.viewCount))} •  { getTimeAgo(video.snippet.publishedAt) }  
               
                </Typography>
             
    
   
              </CardContent>
            </CardActionArea>
          </Card></Link>
        </Grid>
        
      ))}
    </Grid>
  );
};

export default RecommendedVideos;
