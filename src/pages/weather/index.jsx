import {
  TextField,
  Typography,
  Container,
  InputAdornment,
  Grid,
  Box,
  Card,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const cities = [
  {
    city: "New York",
    zip: 10001,
  },
  {
    city: "California",
    zip: 90650,
  },
  {
    city: "Chicago",
    zip: 60007,
  },
  {
    city: "Texas",
    zip: 75208,
  },
  {
    city: "Washington DC",
    zip: 20001,
  },
  {
    city: "Atlanta",
    zip: 30033,
  },
  {
    city: "Dallas",
    zip: 75001,
  },
  {
    city: "Florida",
    zip: 32013,
  },
];

const Weather = () => {
  const router = useRouter();

  const [inputZipCode, setInputZipCode] = useState("");
  const [invalidZipCode, setInvalidZipCode] = useState(false);

  const handleClick = () => {
    if (inputZipCode.length != 5) {
      setInvalidZipCode(true);
      alert("Enter valid zipcode")
    } else {
      router.push("/weather/" + inputZipCode);
    }
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          height: "150px",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#ffe5ca",
        }}
      >
        <TextField
          inputRef={(input) => input && input.focus()}
          id="outlined-basic"
          variant="outlined"
          type="number"
          sx={{
            backgroundColor: "white",
            width: "60%",
          }}
          placeholder="Enter zipcode here"
          InputProps={{
            endAdornment: (
              <InputAdornment
                sx={{ cursor: "pointer" }}
                position="end"
                onClick={handleClick}
              >
                Search
              </InputAdornment>
            ),
          }}
          onChange={(event) => setInputZipCode(event.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          error={invalidZipCode}
        />
      </Container>
      <Container
        sx={{
          width: "100%",
          marginTop: "16px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            justifyContent: "start",
          }}
        >
          <Typography variant="h5">Popular Cities</Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {cities.map(({ city, zip }) => (
              <Grid item xs={6} key={zip}>
                <Tooltip title={city} followCursor>
                  <Link
                    href={`/weather/${zip}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box>
                      <Card
                        variant="outlined"
                        sx={{
                          padding: "20px",
                          margin: "16px",
                          cursor: "pointer",
                        }}
                      >
                        {city}
                      </Card>
                    </Box>
                  </Link>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Weather;
