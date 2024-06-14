import {
  Box,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { FaRegBuilding, FaDollarSign } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import { IoStarSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import CompanyForm from "./CompanyForm";
import { useGetCompanyByIdQuery } from "@/features/api/companies";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const { data: company, error, isLoading } = useGetCompanyByIdQuery(companyId);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text>Error: {error.message}</Text>
      </Box>
    );
  }

  if (!company) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Heading>No company found for ID: {companyId}</Heading>
      </Box>
    );
  }
  return (
    <Box p={{ base: 4, md: 8 }}>
      <Heading mb={4} textAlign="center">
        {company.name}
      </Heading>

      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>General</Tab>
          <Tab>Edit</Tab>
          <Tab>Future Needs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid
              templateRows={{ base: "repeat(4, 1fr)", md: "repeat(1, 1fr)" }}
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap={4}
              mt={4}>
              <GridItem>
                <Card p={2} maxW="sm" mx="auto">
                  <CardBody>
                    <Stack spacing={3}>
                      <Heading display="flex" size="md">
                        <Box borderRadius="10px" p={2}>
                          {company.logo ? (
                            <Image
                              as={Avatar}
                              src={company.logo}
                              alt="Company Logo"
                              boxSize="50px"
                            />
                          ) : (
                            <FaRegBuilding color="rgba(54, 162, 235, 0.54)" size="50px" />
                          )}
                        </Box>

                        <Text ml={4} mt={2}>
                          {company.name}
                        </Text>
                      </Heading>
                      <Text>Industry: {company.industry}</Text>
                      <Text>Type: {company.companyType}</Text>
                      <Text>Website: {company.website}</Text>
                      <Divider />
                      <Text color="gray.600">{company.description}</Text>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card mx="auto">
                  <CardBody>
                    <Stack>
                      <HStack>
                        <Box m={2} bg="blue.400" borderRadius="50px" p={2}>
                          <FaDollarSign color="white" size={40} />
                        </Box>
                        <Heading fontSize="lg">Annual Revenue</Heading>
                      </HStack>
                      <Divider />
                      <Text textAlign="center">{company.annualRevenue}</Text>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card mx="auto">
                  <CardBody>
                    <Stack>
                      <HStack>
                        <Box m={2} bg="red.400" borderRadius="50px" p={2}>
                          <LiaUsersSolid color="white" size={40} />
                        </Box>
                        <Heading fontSize="lg">Employees</Heading>
                      </HStack>
                      <Divider />
                      <Text textAlign="center">{company.employees}</Text>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card mx="auto">
                  <CardBody>
                    <Stack>
                      <HStack>
                        <Box m={2} bg="yellow.400" borderRadius="50px" p={2}>
                          <IoStarSharp color="white" size={40} />
                        </Box>
                        <Heading fontSize="lg">Rating</Heading>
                      </HStack>
                      <Divider />
                      <Text textAlign="center">{company.rating}</Text>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
          </TabPanel>
          <TabPanel>
            <CompanyForm company={company} />
          </TabPanel>
          <TabPanel>
            <Text>Future Needs Content Here</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CompanyDetails;
