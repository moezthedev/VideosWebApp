import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos, setLoading } from '../reducers/videos';
import { CardActionArea } from '@mui/material';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import img from "../images/loader.gif"
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../App.css"
const Recommended = () => {
  const location = useLocation();
  
    const videos = useSelector((state) => state.videos.videos);
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchRecommendedVideos = async () => {
        try {
          const apiKey = process.env.REACT_APP_apiKey; 
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=8&q=recommended&key=${apiKey}`
          );
  
          if (response.status === 200) {
            const data = response.data;
            dispatch(setVideos(data.items));
          
          } else {
            console.log(`Request failed with status code ${response.status}`);
          }
        } catch (error) {
          console.log(`An error occurred: ${error}`);
        }
      };
  
      fetchRecommendedVideos();
    }, []);
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
 
      if (!videos) {
        return <div className="loader-container">
        <img src={img} alt="Loading..." />
      </div>
      }
  return (
    <div className="recommended-videos">
    <h2 style={{textAlign:"center"}}>Recommended Videos</h2>
    
    {videos.map((video) => (
          <Link
          to={`/video?id=${video.id}`}
          style={{ textDecoration: 'none' }}
        >
      <Card key={video.id} sx={{  margin: '10px' }}>
        <CardActionArea>
          <CardMedia component="img" width="500" height="180" image={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {video.snippet.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {video.snippet.channelTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getTimeAgo(video.snippet.publishedAt)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
    ))}
  </div>
  )
}

export default Recommended