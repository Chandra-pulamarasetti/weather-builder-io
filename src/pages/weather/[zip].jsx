import axios from "axios";
import {
  Container,
  Button,
  Tooltip,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { apiKey } from "@/uitils";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

export default function Forecast(props) {
  const {
    city: { name },
    list,
  } = props;

  const days = list.reduce((accum, current) => {
    const date = current["dt_txt"].split(" ")[0];
    if (accum[date]) {
      accum[date].push(current);
    } else {
      accum[date] = [];
    }
    return accum;
  }, {});

  const [currentDate, setCurrentDate] = useState(0);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "16px" }}>
      <Link href="/weather" style={{ textDecoration: "none" }}>
        <Tooltip title="Back" followCursor>
          <Button variant="contained">
            <ArrowBackIosNewOutlinedIcon fontSize="small" /> Back
          </Button>
        </Tooltip>
      </Link>

      <Container
        maxWidth="xl"
        sx={{ padding: "16px", marginTop: "16px", backgroundColor: "#a1bccc" }}
      >
        <Typography variant="h5">{name}</Typography>
      </Container>

      <Box>
        <Grid container spacing={2}>
          {Object.keys(days).map((day, index) => (
            <Grid item xs={2} key={index}>
              <Box onClick={() => setCurrentDate(index)}>
                <Card
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    margin: "16px",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: currentDate === index ? "#cb5450" : "none",
                    color: currentDate === index && "white",
                  }}
                >
                  <Typography variant="h6">{day}</Typography>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Container
        sx={{
          width: "100%",
          marginTop: "16px",
        }}
      >
        <Box>
          <Grid container spacing={2}>
            {Object.values(days)[currentDate].map(
              (
                { main: { humidity, temp }, weather, wind: { speed } },
                index
              ) => {
                const { main, description, icon } = weather[0];
                return (
                  <Grid item xs={4} key={index}>
                    <Tooltip title={"city"} followCursor>
                      <Box>
                        <Card
                          variant="outlined"
                          sx={{
                            padding: "20px",
                            margin: "16px",
                            cursor: "pointer",
                            display: "flex",
                          }}
                        >
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <CardContent sx={{ flex: "1 0 auto" }}>
                              <Typography component="div" variant="h5">
                                {main}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                              >
                                {description}
                              </Typography>
                            </CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                pl: 1,
                                pb: 1,
                                gap: 2,
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                              >
                                Humidiy : {humidity}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                              >
                                Temp : {temp}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                              >
                                Wind : {speed}
                              </Typography>
                            </Box>
                          </Box>
                          <Image
                            width={100}
                            height={100}
                            src={`https://openweathermap.org/img/w/${icon}.png`}
                          />
                        </Card>
                      </Box>
                    </Tooltip>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Box>
      </Container>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { zip } = context.params;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${apiKey}&unit="metric`
    );
    const success = response.status === 200;
    const data = response.data;

    return {
      props: success ? data : {},
    };
  } catch (error) {
    return {
      props: {
        error: error ? error.message : {},
      },
    };
  }
}
