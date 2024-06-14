import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Image,
  Avatar,
  Spinner,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";
import { useParams } from "react-router-dom";
import UpdateContactForm from "./UpdateContactForm";
import { useGetContactByIdQuery } from "@/features/api/contacts";
import { useGetUserByIdQuery } from "@/features/api/user";

const ContactDetails = () => {
  const { contactId } = useParams();
  const { data: contact, error, isLoading } = useGetContactByIdQuery(contactId);

  const [createdByUser, setCreatedByUser] = useState(null);
  const [modifiedByUser, setModifiedByUser] = useState(null);

  const { data: createdByData } = useGetUserByIdQuery(contact?.createdBy, {
    skip: !contact?.createdBy,
  });
  const { data: modifiedByData } = useGetUserByIdQuery(contact?.lastModifiedBy, {
    skip: !contact?.lastModifiedBy,
  });

  useEffect(() => {
    if (createdByData) {
      setCreatedByUser(createdByData);
    }
  }, [createdByData]);

  useEffect(() => {
    if (modifiedByData) {
      setModifiedByUser(modifiedByData);
    }
  }, [modifiedByData]);

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
            <Card maxW="lg" mx="auto">
              <CardHeader>
                <HStack justify="space-between">
                  <Box fontSize="xs" fontWeight="medium">
                    Created by:{" "}
                    {createdByUser ? (
                      <Text color="blue">
                        {" "}
                        {createdByUser.firstName} {createdByUser.lastName}
                      </Text>
                    ) : (
                      "NA"
                    )}
                  </Box>
                  <Box fontSize="xs" fontWeight="medium">
                    Last update by:{" "}
                    {modifiedByUser ? (
                      <Text color="blue">
                        {" "}
                        {modifiedByUser.firstName} {modifiedByUser.lastName}
                      </Text>
                    ) : (
                      "NA"
                    )}
                  </Box>
                </HStack>
              </CardHeader>
              <CardBody>
                <Stack spacing={4}>
                  <HStack>
                    <Image
                      as={Avatar}
                      src={contact.logo}
                      alt="Contact Logo"
                      boxSize="50px"
                    />
                    <Text fontWeight="bold" p={2} alignContent="end">
                      {contact.salutation} {contact.firstName} {contact.lastName}
                    </Text>
                  </HStack>
                  <Text>Email: {contact.email}</Text>
                  <Divider />
                  <Text color="gray.600">Description: {contact.description}</Text>
                  <Divider />

                  {contact.socials && (
                    <Stack spacing={2}>
                      <Box>
                        <Box p={2}>
                          <SocialIcon
                            url={contact.socials.LinkedIn}
                            style={{ width: "20px", marginRight: "10px", height: "20px" }}
                          />
                          {contact.socials.LinkedIn}
                        </Box>
                        <Box p={2}>
                          <SocialIcon
                            url="https://facebook.com"
                            style={{ width: "20px", marginRight: "10px", height: "20px" }}
                          />
                          {contact.socials.Facebook}
                        </Box>
                        <Box p={2}>
                          <SocialIcon
                            url="https://x.com"
                            style={{ width: "20px", marginRight: "10px", height: "20px" }}
                          />
                          {contact.socials.X}
                        </Box>
                      </Box>
                    </Stack>
                  )}

                  <Divider />

                  <HStack>
                    <Box bg="blue.400" borderRadius="50px" p={2}></Box>
                    <Heading fontSize="lg">Phone Number</Heading>
                  </HStack>
                  <Text textAlign="center">{contact.phone}</Text>
                  <Divider />
                  <HStack>
                    <Box bg="red.400" borderRadius="50px" p={2}></Box>
                    <Heading fontSize="lg">Birthday</Heading>
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
