import { Card, Stack, Heading, Text, Divider, CardBody, Box } from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";

export default function DealsCard() {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading display="flex" size="md">
              <Box borderRadius="50px" p="2px" bg="rgba(153, 102, 255, 0.54)">
                <AiOutlineCheck color="white" size="50px" />
              </Box>
              <Text ml={6} mt={6}>
                Deals
              </Text>
            </Heading>
            <Text>Deals stats</Text>
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
