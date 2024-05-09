import { Card, Stack, Heading, Text, Divider, CardBody } from "@chakra-ui/react";

export default function ContactCard() {
  return (
    <>
      <h1>Contacts</h1>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Contacts</Heading>
            <Text>Contacts stats</Text>
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
