import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/navbar";
import ScrollableTabs from "../components/scrollabletabs";
import Search from "../components/search";
import { setSearch } from "../reducers/search";
import "../App.css"
import loader from "../images/loader.gif"
function Home() {
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.isUserLoggedIn);
  const userData = useSelector((state) => state.userData.userData);
  let name = userData.name;
  const search = useSelector((state) => state.search.search);
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    dispatch(setSearch(event.target.value));
  };
  if(!userData){
    return <div className="loader-container"><img src={loader}></img></div>
  }
  return (
    <>
      <Navbar handleSearch={handleSearch} name={name} />
      <ScrollableTabs />
      <Search search={search} />
    </>
  );
}

export default Home;
