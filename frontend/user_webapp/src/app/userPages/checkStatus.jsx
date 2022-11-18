import React, { useState } from "react";
import SideNav from "../components/sideNav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Header from "../components/header";
import { Grid } from "@mui/material";
import { Breakpoint, BreakpointProvider } from "react-socks";

import processingImage from "../../images/processing.svg";
import pendingImage from "../../images/pending.svg";
import completedImage from "../../images/completed.svg";

//pending, processing, completed

function CheckStatus() {
  const arr = [
    ["pending", pendingImage],
    ["processing", processingImage],
    ["completed", completedImage],
  ];

  const [textIndex, setTextIndex] = useState(0);

  return (
    <>
      <Header name={"Check Status"} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: "70vw",
          ml: "22%",
        }}
      >
        <Grid container sx={{ mt: 4 }}>
          <Grid xs={6}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                mt: { xs: "70%", sm: "40%" },
                ml: { xs: "55%", sm: "0%" },
                fontWeight: 700,
                fontFamily: "Segoe UI",
                fontSize: {
                  xs: 18,
                  sm: 34,
                },
              }}
            >
              Your request is{" "}
              <span style={{ color: "#09ad58" }}> {arr[textIndex][0]}.</span>
            </Typography>
          </Grid>

          <Grid
            xs={5}
            sx={{
              mt: { xs: "100%", sm: "8%" },
              pr: 5,
            }}
          >
            <Breakpoint medium up>
              <img
                src={arr[textIndex][1]}
                style={{ maxWidth: "100%", width: "100%" }}
              />
            </Breakpoint>

            <Breakpoint small down>
              <img
                src={arr[textIndex][1]}
                style={{
                  maxWidth: "300%",
                  width: "300%",
                  marginLeft: "-150%",
                }}
              />
            </Breakpoint>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CheckStatus;
