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
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      px={4}
      py={3}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200">
      {/* Search bar */}
      <Flex alignItems="center">
        <Box display={{ base: "none", md: "block" }} mr={4}>
          <IconButton
            ml={40}
            aria-label="Search"
            icon={<SearchIcon />}
            colorScheme="gray"
            borderRadius="50%"
            bg="transparent"
            _hover={{ bg: "gray.100" }}
          />
        </Box>
        <Input
          placeholder="Search..."
          bg="gray.100"
          color="black"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          width={{ base: "full", md: "250px" }}
          _hover={{ borderColor: "gray.300" }}
          _focus={{ borderColor: "blue.400" }}
        />
      </Flex>

      {/* Right side */}
      <Flex alignItems="center" mr={10}>
        {/* Notification icons */}
        <IconButton
          aria-label="Notifications"
          icon={<BellIcon />}
          colorScheme="gray"
          borderRadius="50%"
          mr={2}
          bg="transparent"
          _hover={{ bg: "gray.100" }}
        />
        <IconButton
          aria-label="Messages"
          icon={<EmailIcon />}
          colorScheme="gray"
          borderRadius="50%"
          mr={2}
          bg="transparent"
          _hover={{ bg: "gray.100" }}
        />
        <IconButton
          aria-label="Info"
          icon={<InfoOutlineIcon />}
          colorScheme="gray"
          borderRadius="50%"
          mr={2}
          bg="transparent"
          _hover={{ bg: "gray.100" }}
        />
        <Box as="span" mr={4} fontWeight="bold" display={{ base: "none", md: "inline" }}>
          Welcome back user!
        </Box>

        {/* User profile */}
        <Menu>
          <MenuButton
            as={Avatar}
            bg="black"
            p={1}
            name="New User"
            size="md"
            cursor="pointer">
            <AvatarBadge boxSize="0.9em" bg="green.500" />
          </MenuButton>
          <MenuList>
            <MenuItem
              as={RouterLink}
              to="/profile"
              icon={<AddIcon />}
              _hover={{ bg: "gray.100" }}>
              Profile
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />}>New Window</MenuItem>
            <MenuItem icon={<RepeatIcon />}>Open Closed Tab</MenuItem>
            <MenuItem icon={<EditIcon />}>Open File...</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
