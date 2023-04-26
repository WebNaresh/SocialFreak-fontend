import * as React from "react";
import { Typography, Divider, Paper, Grid } from "@mui/material";
import { AddCircleOutline, DynamicFeed } from "@mui/icons-material";

export default function Mansoory({ me }) {
  return (
    <Paper>
      <Typography
        sx={{ padding: "10px 5px", display: "flex", alignItems: "center" }}
        gutterBottom
        variant="h7"
        component="div"
      >
        <DynamicFeed sx={{ marginX: 1 }} fontSize="small" /> {me.userName}'s
        Memories
      </Typography>
      <Divider
        sx={{
          width: "100%",
          borderColor: "#5c5a5a",
          margin: "2px 0px",
        }}
        orientation="horizontal"
      />
      <Grid item xs={8}>
        <Grid padding={"4px 0px"} container justifyContent="center" spacing={1}>
          {/* {me.memories.map(({ img, title }, i) => (
            <Grid key={i} item>
              <>
                <Paper
                  component={"img"}
                  src={img}
                  onMouseOver={() => {}}
                  sx={{
                    transition: "all 0.5s",
                    height: 100,
                    width: 75,
                    objectFit: "cover",
                    cursor: "pointer",
                    filter: "grayscale(1)",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    ":hover": {
                      opacity: "0.8",
                      transform: "scale(1.1)",
                      filter: "grayscale(0)",
                    },
                  }}
                ></Paper>
                <Typography
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    transition: "all 0.5s",
                  }}
                  variant="body2"
                  id={"unique1"}
                  color="gray"
                >
                  {title}
                </Typography>
              </>
            </Grid>
          ))} */}
          <Grid item>
            <>
              <Paper
                onMouseOver={() => {}}
                sx={{
                  margin: "auto",
                  textAlign: "center",
                  transition: "all 0.5s",
                  height: 100,
                  width: 75,
                  objectFit: "cover",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  filter: "grayscale(1)",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <AddCircleOutline fontSize="large" />
                <Typography
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    transition: "all 0.5s",
                  }}
                  variant="body2"
                  id={"unique1"}
                  color="gray"
                >
                  Add Memories
                </Typography>
              </Paper>
            </>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
