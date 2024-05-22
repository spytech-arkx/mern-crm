import { Box } from "@chakra-ui/react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  RadialLinearScale,

  Title,
  Tooltip,
  Legend,
);

const PolarChart = () => {
  const data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  return (
    <Box w="300px" mx="auto" mt={8} p={4} boxShadow="lg" borderRadius="md" bg="white">
      <PolarArea data={data} />
    </Box>
  );
};

export default PolarChart;
