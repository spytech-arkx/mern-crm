import { Card, Stack, Heading, Text, Divider, CardBody, Box } from "@chakra-ui/react";
import { FaRegBuilding } from "react-icons/fa";
export default function CompaniesCard() {
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading display="flex" size="md">
              <Box borderRadius="10px" p="4px" bg="rgba(54, 162, 235, 0.54)">
                <FaRegBuilding color="white" size="50px" />
              </Box>
              <Text ml={6} mt={6}>
                Companies
              </Text>
            </Heading>
            <Text>companies stats</Text>
            <Divider />
            <Text color="blue.600" fontSize="2xl">
              4
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
