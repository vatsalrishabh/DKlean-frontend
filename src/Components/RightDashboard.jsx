import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { CalendarToday, History, Settings, FileCopy, HelpOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { BreadCrumb } from "./DoctorDashboard/BreadCrumb"; // Ensure correct import

const iconMap = {
  CalendarToday: <CalendarToday sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />,
  History: <History sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />,
  Settings: <Settings sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />,
  FileCopy: <FileCopy sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />,
  HelpOutline: <HelpOutline sx={{ fontSize: 80, color: "#9e1b1b", marginRight: "1.5rem" }} />,
};

const RightDashboard = ({ cardsData }) => {
  const renderCard = (card) => (
    <Grid item xs={12} sm={6} md={4} key={card.title}>
      <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 rounded-lg p-4 bg-white">
        <CardContent className="flex items-center">
          {iconMap[card.iconType]}
          <div className="text-left">
            <Typography variant="h4" className="text-gray-800 font-semibold">
              {card.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mb-4">
              {card.description}
            </Typography>
            <Link to={card.link} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#9e1b1b",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#d01212" },
                }}
              >
                {card.buttonText}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <div className="right">
      {/* Breadcrumb Section */}
      <div className="pt-5">
        <BreadCrumb first="Patient Dashboard" second="" firstLink="/patientlogin" secondLink="/" />
      </div>

      {/* Dashboard Content */}
      <div className="flex">
        <div className="flex-1 p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
          <Grid container spacing={4}>
            {cardsData.map(renderCard)}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default RightDashboard;
