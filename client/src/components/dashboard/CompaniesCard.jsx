import { Card, Stack, Heading, Text, Divider, CardBody } from "@chakra-ui/react";
export default function CompaniesCard() {
  return (
    <>
      <h1>Companies</h1>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Companies</Heading>
            <Text>companies stats</Text>
            <Divider />
            <Text color="blue.600" fontSize="2xl">
              45
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
