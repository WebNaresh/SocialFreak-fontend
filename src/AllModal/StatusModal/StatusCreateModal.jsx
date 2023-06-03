import * as React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Stack,
  IconButton,
  Paper,
  TextField,
  Button,
  Autocomplete,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import { useContext } from "react";
import UseContext from "../../State/UseState/UseContext";

const StatusCreateModal = React.forwardRef(() => {
  const { me, data, setData, tabData } = useContext(UseContext);

  return (
    <div>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "25rem",
          height: "33rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          display: "flex",
        }}
      >
        {" "}
        Hello
      </Card>
    </div>
  );
});

export default StatusCreateModal;
