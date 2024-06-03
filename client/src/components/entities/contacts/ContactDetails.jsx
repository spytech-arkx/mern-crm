import {
  Box,
  Card,
  CardBody,
  Divider,
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
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import UpdateContactForm from "./UpdateContactForm";
import { useGetContactByIdQuery } from "@/features/api/contacts";

const ContactDetails = () => {
  const { contactId } = useParams();
  const { data: contact, error, isLoading } = useGetContactByIdQuery(contactId);
  console.log(contact);
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

  if (!contact) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Heading>No contact found for ID: {contactId}</Heading>
      </Box>
    );
  }
  return (
    <Box p={{ base: 4, md: 8 }}>
      <Heading mb={4} textAlign="center">
        <Text>
          {contact.firstName} {contact.lastName}
        </Text>
      </Heading>

      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>General</Tab>
          <Tab>Edit</Tab>
          <Tab>Future Needs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex align="center" justify="center" height="100vh">
              <Card p={2} maxW="lg" mx="auto">
                <CardBody>
                  <Stack spacing={4}>
                    <Heading display="flex" size="md">
                      <Image
                        as={Avatar}
                        src={contact.logo}
                        alt="Contact Logo"
                        boxSize="50px"
                      />
                      <Text p={2} alignContent="end">
                        {contact.salutation} {contact.firstName} {contact.lastName}
                      </Text>
                    </Heading>
                    <Text>email: {contact.email}</Text>
                    <Divider />
                    <Text color="gray.600">description: {contact.description}</Text>
                    <Divider />
                    <HStack>
                      <Box bg="blue.400" borderRadius="50px" p={2}></Box>
                      <Heading fontSize="lg">phone number</Heading>
                    </HStack>
                    <Text textAlign="center">{contact.phone}</Text>
                    <Divider />
                    <HStack>
                      <Box bg="red.400" borderRadius="50px" p={2}></Box>
                      <Heading fontSize="lg">birthday</Heading>
                    </HStack>
                    <Text textAlign="center">{contact.birthday}</Text>
                    <Divider />
                    <Heading fontSize="lg">Address</Heading>
                    <HStack spacing="24px">
                      <Box bg="yellow.200">
                        <Text textAlign="center">{contact.address?.street}</Text>
                      </Box>
                      <Box>
                        <Text textAlign="center">{contact.address?.city}</Text>
                      </Box>
                    </HStack>
                    <HStack>
                      <Box bg="tomato">
                        <Text textAlign="center"> {contact.address?.state}</Text>
                      </Box>
                      <Box bg="pink.100">
                        <Text textAlign="center"> {contact.address?.country}</Text>
                      </Box>
                      <Box bg="pink.100">
                        <Text textAlign="center"> {contact.address?.zipCode}</Text>
                      </Box>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </TabPanel>
          <TabPanel>
            <UpdateContactForm contact={contact} />
          </TabPanel>
          <TabPanel>
            <Text>Future Needs Content Here</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ContactDetails;
