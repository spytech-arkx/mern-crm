import {
  Flex,
  Box,
  Input,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AvatarBadge,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  SearchIcon,
  BellIcon,
  EmailIcon,
  InfoOutlineIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Navbar = () => {
  return (
    <Flex mt={2}>
      {/* Logo */}

      {/* Barre de recherche */}
      <IconButton
        borderRadius="50%"
        aria-label="Search"
        icon={<SearchIcon />}
        colorScheme="gray"
      />
      <Box flex="4" ml={4}>
        <Input
          placeholder="Rechercher..."
          bg="gray.100"
          color="black"
          border="1px groove #ccc"
          borderRadius="50px"
          width="500px"
          _hover={{ borderColor: "gray.400" }}
          _focus={{ borderColor: "gray.100" }}
        />
      </Box>

      {/* Icônes de notification, messages et profil */}
      <Box mr="20px">
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          colorScheme="gray"
          borderRadius="50%"
          mr={4}
        />
        <IconButton
          aria-label="Messages"
          icon={<EmailIcon />}
          colorScheme="gray"
          borderRadius="50%"
          mr={4}
        />
        <IconButton
          aria-label="info"
          icon={<InfoOutlineIcon />}
          colorScheme="gray"
          borderRadius="50%"
          mr={4}
        />

        <Box as="span" mr={4} fontWeight="bold">
          Welcome back user!
        </Box>
        <Menu>
          <MenuButton
            as={Avatar}
            p={2}
            bg="black"
            name="New User"
            boxSize="40px"
            aria-label="Options"
            variant="outline">
            <AvatarBadge boxSize="0.9em" bg="green.500" />
          </MenuButton>
          <MenuList>
            <Link
              as={RouterLink}
              to="/profile"
              _hover={{ textDecoration: "none", bg: "gray.50" }}>
              <MenuItem icon={<AddIcon />}> Profile</MenuItem>
            </Link>
            <MenuItem icon={<ExternalLinkIcon />}>New Window</MenuItem>
            <MenuItem icon={<RepeatIcon />}>Open Closed Tab</MenuItem>
            <MenuItem icon={<EditIcon />}>Open File...</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
