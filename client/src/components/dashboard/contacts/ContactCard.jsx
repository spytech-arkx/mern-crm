import { Card, Stack, Heading, Text, Divider, CardBody, Box } from "@chakra-ui/react";
import { MdContactMail } from "react-icons/md";

export default function ContactCard() {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading display="flex" size="md">
              <Box borderRadius="10px" p="4px" bg="rgba(255, 206, 86, 0.54)">
                <MdContactMail color="white" size="50px" />
              </Box>
              <Text ml={6} mt={6}>
                Contacts
              </Text>
            </Heading>
            <Text>Contacts stats</Text>
            <Divider />
            <Text color="blue.600" fontSize="2xl">
              356
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
