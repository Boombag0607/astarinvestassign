"use client";

import { useEffect, useState } from "react";
import { useThemeContext } from "../contexts/ThemeContext";
import {
  Container,
  Paper,
  TableContainer,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Grid2 as Grid,
  Typography,
  Box,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Home() {
  const { mode, toggleTheme } = useThemeContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid size={10}>
          <Typography variant="h5">
            Astarinvest Assignment Data Table
          </Typography>
        </Grid>

        <Grid size={2}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={toggleTheme}>
              {mode == "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Body</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
}
