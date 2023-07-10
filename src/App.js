import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from "./navbar";
import ScrollableTabs from "./scrollabletabs";
import Search from "./search";
import Video from "./videos"

export default function App() {
  const [search, setSearch] = React.useState("");
  const [videoIds, setVideoIds] = React.useState(null);
  
  return (
    <>
    
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
       
        <Route path={`/video`} element={<Video/>}/>
        
      </Routes>
    </Router>
    </>
  );
}

function Home() {
  const [search, setSearch] = React.useState("");
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  
  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <ScrollableTabs />
      <Search search={search} />
    </>
  );
}
