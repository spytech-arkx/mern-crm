import { Grid, GridItem } from "@chakra-ui/react";
import CompaniesCard from "./CompaniesCard";
import ContactCard from "./ContactCard";
import DealsCard from "./DealsCard";
import TasksCard from "./TaskCard";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Grid
        h="600px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}>
        <GridItem rowSpan={1} colSpan={1} bg="gray.100" />
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
        <GridItem colSpan={5} bg="gray.100">
          <h2>Charts</h2>
        </GridItem>
      </Grid>
    </>
  );
}
