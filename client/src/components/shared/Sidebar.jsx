import { useGetCompaniesListQuery } from "@/features/api/companies";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  VStack,
  Divider,
  Box,
  Link,
  Center,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaHome,
  FaBuilding,
  FaChartBar,
  FaUsers,
  FaMoneyBillWave,
  FaListUl,
  FaBars,
} from "react-icons/fa";
import { PiKanbanBold } from "react-icons/pi";
import { Link as RouterLink } from "react-router-dom";
import Logo from "./Logo";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: companies = [], error, isLoading } = useGetCompaniesListQuery();

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <VStack
      className="custom-scrollbar"
      spacing={2}
      align="stretch"
      fontSize="14px"
      overflowY="auto"
      mt={2}
      fontWeight="normal"
      w={isSidebarOpen ? { base: "200px", md: "250px" } : { base: "70px", md: "70px" }}
      transition="width 0.3s ease"
      boxShadow="md"
      bg="white"
      minH="100vh"
      maxH="100vh"
      ml={isSidebarOpen ? 0 : -4} // Reduced margin-left when sidebar is closed
      display="flex"
      flexDirection="column"
      alignItems={isSidebarOpen ? "stretch" : "center"} // Center elements when sidebar is closed
    >
      <Center flexDirection="column" py={4}>
        <Logo />
      </Center>

      <Divider mb={2} mt={6} />

      <Button
        position="fixed"
        top={100}
        mr={-4}
        onClick={toggleSidebar}
        bg="none"
        _hover={{ bg: "gray.50" }}
        style={{ alignSelf: isSidebarOpen ? "flex-end" : "center" }} // Center button when sidebar is closed
        display={isSidebarOpen ? "block" : "none"}>
        <FaBars size={20} />
      </Button>

      <Center display={isSidebarOpen ? "none" : "flex"}>
        <Button bg="none" _hover={{ bg: "gray.50" }} onClick={toggleSidebar}>
          <ArrowRightIcon />
        </Button>
      </Center>

      <NavItem
        icon={FaHome}
        label="Dashboard"
        to="/dashboard"
        isSidebarOpen={isSidebarOpen}
      />
      <Divider mb={2} mt={2} />
      <NavItem
        icon={FaBuilding}
        label="Companies"
        to="/companies"
        isSidebarOpen={isSidebarOpen}
      />

      {isSidebarOpen && (
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: "gray.100", color: "black" }}
                onClick={toggleExpansion}>
                <Box as="span" flex="1" textAlign="left">
                  {isExpanded ? "Less" : "More"}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {isLoading && <Text>Loading...</Text>}
              {error && <Text>Error: {error.message}</Text>}
              {companies.map((company) => (
                <Link
                  as={RouterLink}
                  to={`/companies/${company._id}`}
                  key={company._id}
                  py={1}
                  _hover={{ textDecoration: "none", bg: "blue.50" }}
                  display="flex"
                  justifyContent={isSidebarOpen ? "start" : "center"}>
                  <Text ml={isSidebarOpen ? 4 : 0}>{company.name}</Text>
                </Link>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}

      <NavItem
        icon={FaChartBar}
        label="Stats"
        to="/stats"
        isSidebarOpen={isSidebarOpen}
      />
      <NavItem
        icon={FaUsers}
        label="Contacts"
        to="/contacts"
        isSidebarOpen={isSidebarOpen}
      />
      <NavItem
        icon={FaMoneyBillWave}
        label="Deals"
        to="/deals"
        isSidebarOpen={isSidebarOpen}
      />
      <NavItem icon={FaListUl} label="Tasks" to="/tasks" isSidebarOpen={isSidebarOpen} />
      <NavItem
        icon={PiKanbanBold}
        label="Kanban"
        to="/kanban"
        isSidebarOpen={isSidebarOpen}
      />

      <Divider m={4} />

      <NavItem label="Emails" isSidebarOpen={isSidebarOpen} />
      <NavItem label="Chat" isSidebarOpen={isSidebarOpen} />
      <NavItem label="Calendar" isSidebarOpen={isSidebarOpen} />
      <NavItem label="More..." isSidebarOpen={isSidebarOpen} />

      <Box
        as="span"
        py={2}
        px={isSidebarOpen ? 4 : 2}
        mt="auto"
        _hover={{ textDecoration: "none", bg: "blue.50" }}
        display="flex"
        alignItems="center"
        justifyContent={isSidebarOpen ? "start" : "center"}>
        Settings
      </Box>
    </VStack>
  );
};

const NavItem = ({ icon, label, to, isSidebarOpen }) => (
  <Tooltip label={label} placement="right" isDisabled={isSidebarOpen}>
    <Link
      as={RouterLink}
      to={to}
      py={2}
      px={isSidebarOpen ? 4 : 2}
      _hover={{ textDecoration: "none", bg: "blue.50" }}
      display="flex"
      alignItems="center"
      justifyContent={isSidebarOpen ? "start" : "center"}>
      {icon && React.createElement(icon)}
      {isSidebarOpen && <Box ml={4}>{label}</Box>}
    </Link>
  </Tooltip>
);

export default Sidebar;
