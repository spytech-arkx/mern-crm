import { Card, Stack, Heading, Text, Divider, CardBody } from "@chakra-ui/react";

export default function TasksCard() {
  return (
    <>
      <h1>Tasks</h1>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Tasks</Heading>
            <Text>Tasks stats</Text>
            <Divider />
            <Text color="blue.600" fontSize="2xl">
              200
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
