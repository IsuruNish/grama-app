import React, { useEffect, useState } from "react";
import SideNav from "../components/sideNav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Header from "../components/header";
import { Grid } from "@mui/material";
import { Breakpoint, BreakpointProvider } from "react-socks";

import processingImage from "../../images/processing.svg";
import resubmitImage from "../../images/resubmit.svg";
import completedImage from "../../images/completed.svg";
import noneImage from "../../images/none.svg";
import Axios from "axios";
import axiosInstance from "../config/axios";
import PuffLoader from "react-spinners/PuffLoader";

import { TextField } from "@mui/material";
import { Button } from "@mui/material";

import Toast from "../components/Toast";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "18%",
  marginLeft: "53%",
};

function CheckStatus() {
  const arr = [
    ["No ", "requests", noneImage],
    ["Your request is ", "processing", processingImage],
    ["Your request is ", "completed", completedImage],
    [
      "Address proof rejected due to unclearness of the image or invalid address. Resubmit address proof ",
      "required",
      resubmitImage,
    ],
  ];

  const [textIndex, setTextIndex] = useState(3);
  const [spinnerLoading, setSpinnerLloading] = useState(true);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [mode, setMode] = useState(-1);
  const [nic, setNIC] = useState(0);

  useEffect(() => {
    const accessToken = "Bearer " + localStorage.getItem("API_TOKEN");

    const config = {
      headers: {
        Authorization: accessToken,
      },
    };

    const payload = {
      email: localStorage.getItem("email"),
      key: accessToken,
    };

    Axios.post(
      "https://8659e866-c03e-45d5-a713-14c3f8f0d831-dev.e1-us-east-azure.choreoapis.dev/vjmx/finalintegration/1.0.0/status",
      payload,
      config
    )
      .then((res) => {
        if (res.data.status === "Processing") setTextIndex(1);
        else if (res.data.status === "Confirmed") setTextIndex(2);
        else if (res.data.status === "Missing Info") setTextIndex(3);
        else setTextIndex(0);
        setNIC(res.data.nic);
        setSpinnerLloading(false);
      })
      .catch();
  }, []);

  const convertBase64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.toString());
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (image == "") {
      setOpen(true);
      setMode(1);
    } else {
      setMode(0);

      const accessToken = "Bearer " + localStorage.getItem("API_TOKEN");

      const payload = {
        nic: nic,
        proof: image,
        key: accessToken,
        // email: localStorage.getItem("email"),
      };

      const config = {
        headers: {
          Authorization: accessToken,
        },
      };

      Axios.post(
        "https://8659e866-c03e-45d5-a713-14c3f8f0d831-dev.e1-us-east-azure.choreoapis.dev/vjmx/finalintegration/1.0.0/info",
        payload,
        config
      )
        .then((res) => {
          window.location.reload(false);
          console.log(res);
        })
        .catch();
    }
  };

  if (spinnerLoading) {
    return <PuffLoader color="#09ad58" size={100} cssOverride={override} />;
  }

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
          {textIndex == 3 ? (
            <Grid container xs={6}>
              <Grid>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    mt: {
                      xs: "70%",
                      sm: "40%",
                      md: "30%",
                      lg: "25%",
                      xl: "30%",
                    },
                    ml: { xs: "55%", sm: "0%" },
                    fontWeight: 700,
                    fontFamily: "Segoe UI",
                    fontSize: {
                      xs: 18,
                      sm: 34,
                      lg: 24,
                      xl: 34,
                    },
                  }}
                >
                  {arr[textIndex][0]}
                  <span style={{ color: "#09ad58" }}>
                    {" "}
                    {arr[textIndex][1]}.
                  </span>
                </Typography>
              </Grid>

              <Grid>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    width: { xs: "57vw", sm: "30vw" },
                    mt: 4,
                    backgroundColor: "#09ad58",
                    ":hover": {
                      backgroundColor: "#09914b",
                    },
                    fontSize: {
                      xs: 9,
                      sm: 11,
                      md: 10,
                      lg: 12,
                    },
                  }}
                >
                  Upload proof of address
                  <input
                    type="file"
                    hidden
                    onChange={(e) => convertBase64(e)}
                  />
                </Button>
              </Grid>

              <Grid>
                <Button
                  variant="outlined"
                  onClick={() => handleSubmit()}
                  sx={{
                    mt: 2,
                    width: { xs: "21vw", sm: "17.5vw" },
                    fontSize: {
                      xs: 9,
                      sm: 11,
                      md: 10,
                      lg: 12,
                    },
                    borderColor: "#09ad58",
                    color: "#09ad58",
                    ":hover": {
                      borderColor: "#09914b",
                      color: "#09ad58",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container xs={6}>
              <Grid>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    mt: { xs: "70%", sm: "90%", lg: "50%", xl: "80%" },
                    ml: { xs: "55%", sm: "0%" },
                    fontWeight: 700,
                    fontFamily: "Segoe UI",
                    fontSize: {
                      xs: 18,
                      sm: 34,
                    },
                  }}
                >
                  {arr[textIndex][0]}
                  <span style={{ color: "#09ad58" }}>
                    {" "}
                    {arr[textIndex][1]}.
                  </span>
                </Typography>
              </Grid>
            </Grid>
          )}

          <Grid
            xs={5}
            sx={{
              mt: { xs: "100%", sm: "8%" },
              pr: 5,
            }}
          >
            <Breakpoint medium up>
              <img
                src={arr[textIndex][2]}
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
        <Toast open={open} setOpen={setOpen} mode={mode} />
      </Box>
    </>
  );
}

export default CheckStatus;
