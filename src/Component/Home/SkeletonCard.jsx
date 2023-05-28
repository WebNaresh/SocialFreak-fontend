import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Paper } from "@mui/material";

export default function Variants() {
  return (
    <Paper sx={{ margin: "10px 0px", boxSizing: "border-box" }}>
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}

        {/* For other variants, adjust the size with `width` and `height` */}
        <Stack direction={"row"} margin={"15px"}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack
            direction={"column"}
            margin={"0 15px"}
            justifyContent={"space-around"}
          >
            <Skeleton variant="rounded" width={100} height={"10px"} />
            <Skeleton variant="rounded" width={150} height={"10px"} />
          </Stack>
        </Stack>

        <Skeleton variant="rectangular" width={"100%"} height={"22rem"} />

        <Stack
          sx={{
            padding: "0 11px",
          }}
        >
          <Skeleton variant="rounded" width={150} height={10} />
        </Stack>
        <Stack
          sx={{
            padding: "0 11px",
          }}
        >
          <Skeleton variant="rounded" width={100} height={10} />
        </Stack>
        <Stack direction={"row"}>
          <Skeleton
            variant="rounded"
            width={30}
            sx={{ margin: 2 }}
            height={30}
          />
          <Skeleton
            variant="rounded"
            width={30}
            sx={{ margin: 2 }}
            height={30}
          />
          <Skeleton
            variant="rounded"
            width={30}
            sx={{ margin: 2 }}
            height={30}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
