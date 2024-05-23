import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import userData from "./userData";
import DealsChart from "../charts/DealChart";

// Composant pour afficher les dernières activités de l'utilisateur
const LatestActivity = () => (
  <Card>
    <CardHeader>
      <Heading size="md">Activities</Heading>
    </CardHeader>

    <CardBody>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Heading size="xs" textTransform="uppercase">
            Latest Activity
          </Heading>
          <Text as="ul" pt="2" fontSize="sm">
            {userData.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </Text>
        </Box>
      </Stack>
    </CardBody>
  </Card>
);

// Composant pour afficher le statut des tâches
const TaskStatus = () => (
  <Card>
    <CardHeader>
      <Heading size="md">Tasks</Heading>
    </CardHeader>
    <CardBody>
      <Stack divider={<StackDivider />} spacing="4">
        <Box>
          <Text as="ul" pt="2" fontSize="sm">
            Completed: {userData.tasksCompleted}
          </Text>
          <Text as="ul" pt="2" fontSize="sm">
            In Progress: {userData.tasksInProgress}
          </Text>
        </Box>
      </Stack>
    </CardBody>
  </Card>
);

// Composant pour afficher le statut des deals
const DealStatus = () => (
  <Card>
    <CardHeader>
      <Heading size="md">Deals</Heading>
    </CardHeader>
    <CardBody>
      <HStack divider={<StackDivider />} spacing="2">
        <Box>
          <Text as="ul" pt="2" fontSize="sm">
            Completed: {userData.dealsCompleted}
          </Text>
          <Text as="ul" pt="2" fontSize="sm">
            In Progress: {userData.dealsInProgress}
          </Text>
          <Text as="ul" pt="2" fontSize="sm">
            Failed: {userData.dealsFailed}
          </Text>
        </Box>
        <DealsChart />
      </HStack>
    </CardBody>
  </Card>
);

// Composant pour afficher d'autres détails
const OtherDetails = () => (
  <GridItem colSpan={4} bg="gray.250" boxShadow="lg">
    <h2>More</h2>
    {/* Insérez d'autres détails ici si nécessaire */}
  </GridItem>
);

// Composant principal pour la section d'activité de l'utilisateur
const UserActivity = () => {
  return (
    <Grid
      h="500px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={4}>
      <LatestActivity activities={userData.activities} />
      <TaskStatus
        tasksCompleted={userData.tasksCompleted}
        tasksInProgress={userData.tasksInProgress}
      />
      <DealStatus
        dealsCompleted={userData.dealsCompleted}
        dealsFailed={userData.dealsFailed}
        dealsInProgress={userData.dealsInProgress}
      />
      <OtherDetails />
    </Grid>
  );
};

export default UserActivity;
