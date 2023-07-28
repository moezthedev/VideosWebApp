import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";


import { styled } from "@mui/material/styles";

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  color: "white",
  backgroundColor: '#09f',
  margin: '5px',
  borderRadius:"8px",
  minHeight:"8px",
  padding:"8px"

 
}));

export default function ScrollableTabsButtonForce() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "white",
        margin: "100",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{ marginTop: 5,marginBottom:5 }}
      >
        <AntTab label=" All" />
        <AntTab label="Mixes" />
        <AntTab label="Music" />
        <AntTab label="Lo-Fi" />
        <AntTab label="Gaming" />
        <AntTab label="Javascript" />
        <AntTab label="OOP" />
        <AntTab label="Sales" />
        <AntTab label="Computers" />
        <AntTab label="Editing" />
        <AntTab label="Podcast" />
        <AntTab label="Recently Uploaded" />
        <AntTab label="Watched" />
        <AntTab label="Mixes" />
        <AntTab label="Thrillers" />
        <AntTab label="Movies" />
        <AntTab label="Comedy" />
      </Tabs>
    </Box>
  );
}
