import React, { useEffect } from "react";
import withAppProviders from "./withAppProviders";
import { Box, Divider, Paper } from "@mui/material";
import Form from "./components/Form";
import List from "./components/List";

const App = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <Box className="w-full h-full flex flex-col flex-1 p-20">
        <Paper className="w-full h-full px-20 py-24" elevation={10}>
          <Box className="w-full h-full flex flex-row flex-1 space-x-10">
            <Box className={"w-1/3 h-full flex flex-col"}>
              <Form />
            </Box>

            <Divider orientation="vertical" />

            <Box className={"w-2/3 h-full flex flex-col"}>
              <List />
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default withAppProviders(App)();
