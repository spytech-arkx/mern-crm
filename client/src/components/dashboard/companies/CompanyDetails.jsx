import {
  useDisclosure,
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
  Button,
} from "@chakra-ui/react";
import { FaRegBuilding, FaDollarSign } from "react-icons/fa";
import { LiaUsersSolid } from "react-icons/lia";
import { IoStarSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyById } from "@/features/companies/companies-slice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import CompanyForm from "./CompanyForm";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const { selectedCompany, fetchCompanyStatus, error } = useSelector(
    (state) => state.companies,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyById(companyId));
    }
  }, [companyId, dispatch]);

  if (fetchCompanyStatus === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }
  if (fetchCompanyStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-4">
      {selectedCompany ? (
        <>
          <Heading>{selectedCompany.companyName}</Heading>
          <Button onClick={onOpen} variant="ghost">
            <SettingsIcon />
          </Button>
          <CompanyForm isOpen={isOpen} onClose={onClose} company={selectedCompany} />
          <Grid
            templateRows="repeat(1, 1fr)"
            m={4}
            templateColumns="repeat(4, 1fr)"
            gap={4}>
            <GridItem colSpan={1} bg="">
              <Card p={2} maxW="sm">
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Heading display="flex" size="md">
                      <Box borderRadius="10px" p="4px">
                        <FaRegBuilding color="rgba(54, 162, 235, 0.54)" size="50px" />
                      </Box>
                      <Text ml={6} mt={2}>
                        {selectedCompany.companyName}
                      </Text>
                    </Heading>
                    <Text>Industry : {selectedCompany.industry} </Text>
                    <Text>Type : {selectedCompany.companyType} </Text>
                    <Text>Web site : {selectedCompany.website} </Text>

                    <Divider />
                    <Text color="black.600">{selectedCompany.description}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem colSpan={1} bg="">
              <Card>
                <CardBody>
                  <Stack>
                    <HStack>
                      <Box m={6} bg="RGBA(0, 0, 0, 0.36)" borderRadius="50px">
                        <FaDollarSign color="white" size={40} />
                      </Box>
                      <Heading fontSize={20}>Annual revenue</Heading>
                    </HStack>
                    <Divider />
                    <Text textAlign="center">{selectedCompany.annualRevenue}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem colSpan={1} bg="">
              <Card>
                <CardBody>
                  <Stack>
                    <HStack>
                      <Box m={6} bg="red.200" borderRadius="50px">
                        <LiaUsersSolid color="white" size={40} />
                      </Box>
                      <Heading fontSize={20}>Employees</Heading>
                    </HStack>
                    <Divider />
                    <Text textAlign="center">{selectedCompany.employees}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem colSpan={1} bg="">
              <Card>
                <CardBody>
                  <Stack>
                    <HStack>
                      <Box m={6} bg="yellow.200 " borderRadius="50px">
                        <IoStarSharp color="white" size={40} />
                      </Box>
                      <Heading fontSize={20}>Rating</Heading>
                    </HStack>
                    <Divider />
                    <Text textAlign="center">{selectedCompany.rating}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </>
      ) : (
        <h1>No company found for ID: {companyId}</h1>
      )}
    </div>
  );
};

export default CompanyDetails;
