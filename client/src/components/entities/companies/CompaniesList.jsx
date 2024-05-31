import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Link,
  Center,
  useDisclosure,
  Box,
  VStack,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useGetCompaniesListQuery } from "@/features/api/companies";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import CreateCompanyForm from "./CreateCompanyForm";
import CompanyDelete from "./CompanyDelete";
import Icons from "./CompaniesIcons";

const CompaniesList = () => {
  const { data: companies, error, isLoading } = useGetCompaniesListQuery();
  const {
    isOpen: isOpAddMod,
    onOpen: onOpAddMod,
    onClose: closeAddMod,
  } = useDisclosure();
  const {
    isOpen: isOpDeleteMod,
    onOpen: onOpDeleteMod,
    onClose: closeDeleteMod,
  } = useDisclosure();
  const [deleteCompany, setDeleteCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteClick = (company) => {
    setDeleteCompany(company);
    onOpDeleteMod();
  };

  const filteredCompanies = useMemo(() => {
    return companies?.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [companies, searchTerm]);

  const getRandomIcon = () => {
    const iconKeys = Object.keys(Icons);
    const randomKey = iconKeys[Math.floor(Math.random() * iconKeys.length)];
    return Icons[randomKey];
  };

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh" className="px-4">
        <Text color="red.500">{error.message}</Text>
      </Center>
    );
  }

  return (
    <Box className="px-4">
      <Heading as="h1" size="xl" mb={6}>
        Companies
      </Heading>
      <Input
        placeholder="Search by name or industry"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
        {filteredCompanies.map((company) => {
          const IconComponent = getRandomIcon();
          return (
            <Card key={company._id} bg="white" boxShadow="md" rounded="md">
              <CardHeader bg="gray.50" borderBottomWidth="1px">
                <Heading size="md" color="gray.700">
                  <Center>{company.name}</Center>
                </Heading>
              </CardHeader>
              <CardBody>
                <Center>
                  <VStack>
                    <Box borderRadius="50px" p={4} color="white" bg="gray.200">
                      <IconComponent size={60} />
                    </Box>
                    <Text>{company.name}</Text>
                  </VStack>
                </Center>
                <Text fontSize="lg" color="gray.500">
                  {company.industry}
                </Text>
                {company.ownership && (
                  <Text fontSize="lg" color="gray.500">
                    Owner: {company.ownership}
                  </Text>
                )}
                <Text mt={2} fontSize="md" color="blue.500">
                  <Link href={company.website} isExternal>
                    {company.website}
                  </Link>
                </Text>
              </CardBody>
              <CardFooter justify="space-between">
                <Button
                  bg="black"
                  color="white"
                  as={RouterLink}
                  to={`/companies/${company._id}`}>
                  View details
                </Button>
                <Button
                  onClick={() => handleDeleteClick(company._id)}
                  bg="gray.100"
                  color="red.500"
                  ml={2}
                  leftIcon={<DeleteIcon color="red.500" />}>
                  Delete
                </Button>
                <CompanyDelete
                  companyName={company.name}
                  company={deleteCompany}
                  isOpen={isOpDeleteMod}
                  onClose={closeDeleteMod}
                />
              </CardFooter>
            </Card>
          );
        })}
        <Card
          bg="white"
          boxShadow="md"
          rounded="md"
          _hover={{ bg: "gray.300", boxShadow: "dark-lg" }}>
          <CardHeader bg="gray.50">
            <Heading size="md">
              <Center>Add new company</Center>
            </Heading>
          </CardHeader>
          <CardBody as="button" onClick={onOpAddMod}>
            <Center height="100%">
              <Box
                alignContent="center"
                justifyContent="center"
                borderRadius="50%"
                w={40}
                h={40}
                borderWidth={3}
                borderColor="gray.500">
                <AddIcon color="gray.500" w={20} h={20} />
              </Box>
              <CreateCompanyForm isOpen={isOpAddMod} onClose={closeAddMod} />
            </Center>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default CompaniesList;
