import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import RecommendedVideo from "./recommended"
import Comments from "./Comments"
import "./App.css"
import img from "./loader.gif"
import Navbar from "./navbar"
const MainVideoPlayer = () => {
  const [videoData, setVideoData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const videoId = new URLSearchParams(location.search).get('id');


  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const apiKey = 'AIzaSyBfgOUlPxOrWvqmMTaTbR-XibZybQLrFJ0'; // Replace with your YouTube Data API key

        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        );

        if (response.status === 200) {
          const data = response.data;
          setVideoData(data);
        } else {
          console.log(`Request failed with status code ${response.status}`);
        }
      } catch (error) {
        console.log(`An error occurred: ${error}`);
      }
    };

    fetchVideoData();
  }, [videoId]);

  
  if (!videoData) {
    return <div className="loader-container">
    <img src={img} alt="Loading..." />
  </div>
  }
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const videoTitle = videoData.items[0].snippet.title;
  const videoDescription = videoData.items[0].snippet.description;
  // const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
const channelTitle = videoData.items[0].snippet.channelTitle;
const titleFormater=(title)=>{
  return title.substring(0, 40) + "...";
}
const displayedDescription = showMore ? videoDescription : videoDescription.substring(0, 200) + '...';
  return (
    <>
  <Navbar/>
  <div className='video-container'>
    <div className='videoplayer'>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div clastyle={{ flexGrow: 1 }}>
      
        <h1>{titleFormater(videoTitle)}</h1>
        <iframe
          title="YouTube Video Player"
          width="850"
        height="500"
       
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
        <h3>Channel Name: {channelTitle}</h3>
        <div className='description'>
        
        <h2>Description:</h2>
                <p>{displayedDescription}</p>
                {videoDescription.length > 200 && (
                  <button onClick={toggleShowMore} style={{cursor:"pointer"}}>
                    {showMore ? 'Show Less' : 'Show More'}
                  </button>
                )}
                <Comments videoId={videoId}/>
        </div>
      </div>
      <RecommendedVideo/>
    </div>
    </div>
    </div>
    </>
  );
};

export default MainVideoPlayer;