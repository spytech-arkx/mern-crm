import { Card, Stack, Heading, Text, Divider, CardBody, Box } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";

export default function TasksCard() {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading display="flex" size="md">
              <Box borderRadius="10px" p="2px" bg="rgba(75, 192, 192, 0.54)">
                <FaTasks color="white" size="50px" />{" "}
              </Box>
              <Text ml={6} mt={6}>
                Tasks
              </Text>
            </Heading>
            <Text>Tasks stats</Text>
            <Divider />
            <Text color="blue.600" fontSize="2xl">
              571
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
