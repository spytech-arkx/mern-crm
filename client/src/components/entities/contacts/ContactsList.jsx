import { useState, useMemo } from "react";
import { SocialIcon } from "react-social-icons";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Center,
  useDisclosure,
  Box,
  HStack,
  Tooltip,
  Spinner,
  Input,
  Avatar,
} from "@chakra-ui/react";
import { useGetContactsListQuery } from "@/features/api/contacts";
import { AddIcon, DeleteIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import CreateContactForm from "./CreateContactForm";
import ContactDelete from "./ContactDelete";
import Icons from "../companies/CompaniesIcons";

const ContactsList = () => {
  const { data: contacts, error, isLoading } = useGetContactsListQuery();
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
  const [deleteContact, setDeleteContact] = useState(null);
  const [deleteContactName, setDeleteContactName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteClick = (contact) => {
    setDeleteContact(contact._id);
    setDeleteContactName(contact.firstName + " " + contact.lastName);
    onOpDeleteMod();
  };

  const filteredContacts = useMemo(() => {
    return contacts?.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [contacts, searchTerm]);

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
        Contacts
      </Heading>
      <Input
        placeholder="Search by name or industry"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <SimpleGrid spacing={6} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
        {filteredContacts.map((contact) => {
          const IconComponent = getRandomIcon();
          return (
            <Card
              key={contact._id}
              bgGradient="linear(to-t, RGBA(0, 0, 0, 0.06), #FFFFFF)"
              boxShadow="md"
              rounded="md"
              _hover={{ boxShadow: "xl" }}
              p={2}>
              <CardBody p={2}>
                <vStack>
                  <Center>
                    {contact.logo ? (
                      <Avatar src={contact.logo} size="sm" />
                    ) : (
                      <Box
                        borderRadius="50px"
                        p={2}
                        size="sm"
                        color="white"
                        bg="gray.200">
                        <IconComponent />
                      </Box>
                    )}
                  </Center>
                  <Center>
                    <Text p={4} fontSize="md" fontWeight="medium">
                      {contact.firstName} {contact.lastName}
                    </Text>
                  </Center>
                </vStack>
                <HStack spacing={2} h={10} mt={2} ml={8} p={4}>
                  <SocialIcon url="https://twitter.com" style={{ width: "30px" }} />
                  <SocialIcon url="https://facebook.com" style={{ width: "30px" }} />
                  <SocialIcon url="https://x.com" style={{ width: "30px" }} />
                </HStack>
              </CardBody>
              <CardFooter h={30} justifyContent="flex-end" flexWrap="wrap">
                <HStack spacing={1}>
                  <Tooltip label={contact.email} aria-label="Email">
                    <Button variant="ghost" colorScheme="blue" size="sm">
                      <EmailIcon />
                    </Button>
                  </Tooltip>
                  {contact.phone && (
                    <Tooltip label={contact.phone} aria-label="Phone">
                      <Button variant="ghost" colorScheme="blue" size="sm">
                        <PhoneIcon />
                      </Button>
                    </Tooltip>
                  )}
                  <Button
                    color="white"
                    variant="ghost"
                    as={RouterLink}
                    to={`/contacts/${contact._id}`}
                    size="sm"
                    leftIcon={<EditIcon color="green.500" />}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteClick(contact)}
                    color="red.500"
                    size="sm"
                    leftIcon={<DeleteIcon color="red.500" />}
                  />
                </HStack>
              </CardFooter>
            </Card>
          );
        })}

        <Box
          as="button"
          bgGradient="linear(to-t, RGBA(0, 0, 0, 0.06), #FFFFFF)"
          boxShadow="md"
          rounded="md"
          _hover={{ bg: "RGBA(0, 0, 0, 0.04)", boxShadow: "2xl" }}
          onClick={onOpAddMod}
          p={4}>
          <Center height="100%">
            <Box
              alignContent="center"
              justifyContent="center"
              borderRadius="50%"
              w={20}
              h={20}
              borderWidth={3}
              borderColor="gray.500">
              <AddIcon color="gray.500" w={10} h={10} />
            </Box>
          </Center>
        </Box>
      </SimpleGrid>
      <CreateContactForm isOpen={isOpAddMod} onClose={closeAddMod} />
      <ContactDelete
        contactName={deleteContactName}
        contact={deleteContact}
        isOpen={isOpDeleteMod}
        onClose={closeDeleteMod}
      />
    </Box>
  );
};

export default ContactsList;
