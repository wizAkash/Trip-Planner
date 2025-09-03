"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          component={Link}
          href="/dashboard"
        >
          Trip Planner
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
