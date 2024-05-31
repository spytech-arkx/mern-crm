import { Grid, GridItem, HStack } from "@chakra-ui/react";
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import PolarChart from "../charts/PolarChart";
import Index from "../shared/Index";

export default function Dashboard() {
  return (
    <div className="px-4">
      <h1>Dashboard</h1>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem colSpan={1} bg="">
          <Index />
        </GridItem>
        <GridItem colSpan={1} bg="">
          <Index />
        </GridItem>
        <GridItem colSpan={1} bg="">
          <Index />
        </GridItem>
        <GridItem colSpan={1} bg="">
          <Index />
        </GridItem>
        <GridItem colSpan={5} bg="">
          <h2>Charts</h2>
          <HStack>
            <BarChart />
            <LineChart />
          </HStack>
          <PolarChart />
        </GridItem>
      </Grid>
    </div>
  );
}
