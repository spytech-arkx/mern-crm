import { Grid, GridItem, HStack } from "@chakra-ui/react";
import CompaniesCard from "./companies/CompaniesCard";
import ContactCard from "./contacts/ContactCard";
import DealsCard from "./deals/DealsCard";
import TasksCard from "./tasks/TaskCard";
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import PolarChart from "../charts/PolarChart";

export default function Dashboard() {
  return (
    <div className="px-4">
      <h1>Dashboard</h1>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem colSpan={1} bg="">
          <CompaniesCard />
        </GridItem>
        <GridItem colSpan={1} bg="">
          <ContactCard />
        </GridItem>
        <GridItem colSpan={1} bg="">
          <DealsCard />
        </GridItem>
        <GridItem colSpan={1} bg="">
          <TasksCard />
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
