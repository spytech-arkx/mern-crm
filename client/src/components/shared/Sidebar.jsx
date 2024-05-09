import {
  VStack,
  Divider,
  StackDivider,
  Box,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  FaHome,
  FaBuilding,
  FaChartBar,
  FaUsers,
  FaMoneyBillWave,
  FaListUl,
  FaBars,
} from "react-icons/fa";
import { LuComponent } from "react-icons/lu";
import { PiKanbanBold } from "react-icons/pi";

import { Link as RouterLink } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      bg="blue.50"
      w={isSidebarOpen ? "250px" : "60px"}
      transition="width 0.3s ease">
      <button onClick={toggleSidebar} style={{ alignSelf: "flex-start" }}>
        <FaBars />
      </button>
      <Divider />
      <Link as={RouterLink} to="/" mr={4}>
        <Box as="span" flex="1" textAlign="left">
          {isSidebarOpen ? "Dashboard" : <FaHome />}
        </Box>
      </Link>
      <Divider />
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {isSidebarOpen ? "Components" : <LuComponent />}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <Link as={RouterLink} to="/companies" mr={4}>
            <AccordionPanel pb={4}>
              {isSidebarOpen ? "Companies" : <FaBuilding />}
            </AccordionPanel>
          </Link>
          <Link as={RouterLink} to="/stats" mr={4}>
            <AccordionPanel pb={4}>
              {isSidebarOpen ? "stats" : <FaChartBar />}
            </AccordionPanel>
          </Link>
          <Link as={RouterLink} to="/contacts" mr={4}>
            <AccordionPanel pb={4}>
              {isSidebarOpen ? "Contacts" : <FaUsers />}
            </AccordionPanel>
          </Link>
          <Link as={RouterLink} to="/deals" mr={4}>
            <AccordionPanel pb={4}>
              {isSidebarOpen ? "Deals" : <FaMoneyBillWave />}
            </AccordionPanel>
          </Link>
          <Link as={RouterLink} to="/tasks" mr={4}>
            <AccordionPanel pb={4}>
              {isSidebarOpen ? "Tasks" : <FaListUl />}
            </AccordionPanel>
          </Link>
          <Link as={RouterLink} to="/kanban" mr={4}>
            <AccordionPanel pb={4}>
              {isSidebarOpen ? "Kanban" : <PiKanbanBold />}
            </AccordionPanel>
          </Link>
        </AccordionItem>

        <AccordionItem>
          <Divider />
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Section 2
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <Divider />
          <AccordionPanel pb={4}>Emails</AccordionPanel>
          <AccordionPanel pb={4}>Chat</AccordionPanel>
          <AccordionPanel pb={4}>Calendar</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default Sidebar;
