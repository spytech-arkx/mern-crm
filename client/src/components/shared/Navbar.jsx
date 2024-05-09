import {
  Flex,
  Box,
  Input,
  IconButton,
  Image,
  Spacer,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  SearchIcon,
  BellIcon,
  EmailIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Navbar = () => {
  return (
    <Flex bg="blue.100" p={4} alignItems="center">
      {/* Logo */}
      <Box ml="80px">
        <Image
          src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg"
          alt="CRM Logo"
          boxSize="50px"
          borderRadius="50%"
        />
      </Box>
      <Spacer />

      {/* Barre de recherche */}
      <IconButton
        borderRadius="50%"
        aria-label="Search"
        icon={<SearchIcon />}
        colorScheme="blue"
      />
      <Box flex="4" ml={4}>
        <Input
          placeholder="Rechercher..."
          bg="white"
          color="black"
          border="1px solid #ccc"
          borderRadius="md"
          width="500px"
          _hover={{ borderColor: "blue.400" }}
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
        />
      </Box>

      {/* Icônes de notification, messages et profil */}
      <Box mr="20px">
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          colorScheme="blackAlpha"
          borderRadius="50%"
          mr={4}
        />
        <IconButton
          aria-label="Messages"
          icon={<EmailIcon />}
          colorScheme="blackAlpha"
          borderRadius="50%"
          mr={4}
        />
        <Menu>
          <MenuButton as={Avatar} aria-label="Options" variant="outline" />
          <MenuList>
            <MenuItem icon={<AddIcon />} command="⌘T">
              New Tab
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
              New Window
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
              Open Closed Tab
            </MenuItem>
            <MenuItem icon={<EditIcon />} command="⌘O">
              Open File...
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
