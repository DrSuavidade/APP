import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

// Register chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const getStatValue = (stat, type) => {
  if (type === "altura") {
    if (stat === "Baixo") return 2;
    if (stat === "Médio") return 3;
    if (stat === "Alto") return 4;
  } else if (type === "morfologia") {
    if (stat === "Hectomorfo") return 2;
    if (stat === "Mesomorfo") return 3;
    if (stat === "Endomorfo") return 4;
  }
  return stat !== null ? parseFloat(stat) || 0 : 1; // Default to 1 if null
};

const PlayerRadarChart = ({ playerDetails }) => {
  if (!playerDetails) return null;

  const stats = [
    getStatValue(playerDetails.stats.tecnica, "numeric"),
    getStatValue(playerDetails.stats.velocidade, "numeric"),
    getStatValue(playerDetails.stats.competitiva, "numeric"),
    getStatValue(playerDetails.stats.inteligencia, "numeric"),
    getStatValue(playerDetails.stats.altura, "altura"),
    getStatValue(playerDetails.stats.morfologia, "morfologia")
  ];

  const data = {
    labels: ["Técnica", "Velocidade", "Atitude Competitiva", "Inteligência", "Altura", "Morfologia"],
    datasets: [
      {
        data: stats, // 🔥 No label, just the data
        backgroundColor: "rgba(255, 255, 0, 0.3)", // Semi-transparent fill inside the radar
        borderColor: "#FFD700", // Golden border outline
        borderWidth: 2,
        pointBackgroundColor: "#FFD700", // Points in the radar
        pointBorderColor: "#fff",
        pointRadius: 4,
        fill: true, // Fills the polygon inside the radar
      }
    ]
  };
  
  const options = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 4,
        ticks: { display: false }, // Hides numeric labels inside the chart
        grid: {
          color: (ctx) => {
            const value = ctx.tick.value;
            return value === 1 || value === 2 || value === 3 || value === 4
              ? "rgba(255, 255, 255, 0.3)" // Only draw at 1, 2, 3, and 4
              : "transparent";
          },
          lineWidth: 2,
        },
        pointLabels: {
          font: {
            size: 11,
          },
          color: "#FFF",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  

  

  return (
    <div className="radar-chart-container">
      <Radar data={data} options={options} />
    </div>
  );
};

export default PlayerRadarChart;
