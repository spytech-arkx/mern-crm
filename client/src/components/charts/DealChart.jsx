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

const DealsChart = () => {
  const data = {
    labels: ["Completed", "In progress", "failed"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(255, 205, 86)"],
      },
    ],
  };

  return (
    <Box w="300px" mx="auto" mt={1} p={2} boxShadow="lg" borderRadius="md" bg="white">
      <PolarArea data={data} />
    </Box>
  );
};
export default DealsChart;
