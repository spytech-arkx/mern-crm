import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  VStack,
  Divider,
  Box,
  Link,
  Center,
  Button,
  Flex,
  Image,
  Text,
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
import { PiKanbanBold } from "react-icons/pi";

import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCompanies } from "@/features/companies/companies-slice";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.items);
  const status = useSelector((state) => state.companies.status);
  const error = useSelector((state) => state.companies.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCompanies());
    }
  }, [status, dispatch]);

  return (
    <VStack
      spacing={0}
      align="stretch"
      fontSize="14px"
      overflowY="auto"
      mt={2}
      fontWeight="normal"
      w={isSidebarOpen ? "250px" : "50px"}
      transition="width 0.3s ease">
      {isSidebarOpen ? (
        <Center>
          <Image
            src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg"
            alt="CRM Logo"
            boxSize="70px"
            borderRadius="50%"
          />
          <span>SANZ CRM</span>
        </Center>
      ) : (
        <Image
          src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg"
          alt="CRM Logo"
          boxSize="40px"
          borderRadius="50%"
        />
      )}

      <Divider mb={2} mt={2} />

      {isSidebarOpen ? (
        <Button mr={2} onClick={toggleSidebar} style={{ alignSelf: "flex-end" }}>
          <FaBars />
        </Button>
      ) : (
        <Center>
          <Button onClick={toggleSidebar}>
            <ArrowRightIcon />
          </Button>
        </Center>
      )}

      <Link
        as={RouterLink}
        to="/dashboard"
        ml={4}
        mt={6}
        _hover={{ textDecoration: "none", bg: "blue.50" }}>
        {isSidebarOpen ? (
          <Flex align="center">
            <FaHome />
            <Box ml={4}>Dashboard</Box>
          </Flex>
        ) : (
          <FaHome />
        )}
      </Link>

      <Center>
        <Divider mb={2} mt={2} />
      </Center>
      <Box _hover={{ bg: "blue.50" }}>
        <Link as={RouterLink} to="/companies" ml={4} _hover={{ textDecoration: "none" }}>
          {isSidebarOpen ? (
            <Flex ml={4} mb={4} h="3px" align="center">
              <FaBuilding />
              <Box ml={4}>Companies</Box>
            </Flex>
          ) : (
            <Center>
              <FaBuilding />
            </Center>
          )}
        </Link>
      </Box>
      <VStack>
        {status === "loading" && <Text>Loading...</Text>}
        {status === "failed" && <Text>Error: {error}</Text>}
        {companies.map((company) => (
          <Link
            as={RouterLink}
            to={`/companies/${company._id}`}
            key={company._id}
            _hover={{ textDecoration: "none" }}>
            <Text>{company.companyName}</Text>
          </Link>
        ))}
      </VStack>
      <Box _hover={{ bg: "blue.50" }}>
        <Link as={RouterLink} to="/stats" ml={4} _hover={{ textDecoration: "none" }}>
          {isSidebarOpen ? (
            <Flex ml={4} mb={4} h="3px" align="center">
              <FaChartBar /> <Box ml={4}>Stats</Box>
            </Flex>
          ) : (
            <Center>
              <FaChartBar />
            </Center>
          )}
        </Link>
      </Box>
      <Box _hover={{ bg: "blue.50" }}>
        <Link as={RouterLink} to="/contacts" ml={4} _hover={{ textDecoration: "none" }}>
          {isSidebarOpen ? (
            <Flex ml={4} mb={4} h="3px" align="center">
              <FaUsers />
              <Box ml={4}>Contacts</Box>
            </Flex>
          ) : (
            <Center>
              <FaUsers />
            </Center>
          )}
        </Link>
      </Box>
      <Box _hover={{ bg: "blue.50" }}>
        <Link as={RouterLink} to="/deals" ml={4} _hover={{ textDecoration: "none" }}>
          {isSidebarOpen ? (
            <Flex ml={4} mb={4} h="3px" align="center">
              <FaMoneyBillWave /> <Box ml={4}>Deals</Box>
            </Flex>
          ) : (
            <Center>
              <FaMoneyBillWave />
            </Center>
          )}
        </Link>
      </Box>
      <Box _hover={{ bg: "blue.50" }}>
        <Link as={RouterLink} to="/tasks" ml={4} _hover={{ textDecoration: "none" }}>
          {isSidebarOpen ? (
            <Flex ml={4} mb={4} h="3px" align="center">
              <FaListUl /> <Box ml={4}>Tasks</Box>
            </Flex>
          ) : (
            <Center>
              <FaListUl />
            </Center>
          )}
        </Link>
      </Box>
      <Box _hover={{ bg: "blue.50" }}>
        <Link as={RouterLink} to="/kanban" ml={4} _hover={{ textDecoration: "none" }}>
          {isSidebarOpen ? (
            <Flex align="center" h="3px" mb={4} ml={4}>
              <PiKanbanBold />
              <Box ml={4}>Kanban</Box>
            </Flex>
          ) : (
            <Center>
              <PiKanbanBold />
            </Center>
          )}
        </Link>
      </Box>

      <Divider m={4} />

      <Box ml={4} _hover={{ textDecoration: "none", bg: "blue.50" }}>
        Emails
      </Box>
      <Box ml={4} _hover={{ textDecoration: "none", bg: "blue.50" }}>
        Chat
      </Box>
      <Box ml={4} _hover={{ textDecoration: "none", bg: "blue.50" }}>
        Calendar
      </Box>
      <Box ml={4} _hover={{ textDecoration: "none", bg: "blue.50" }}>
        More...
      </Box>
      <Box ml={4} mt="60%" _hover={{ textDecoration: "none", bg: "blue.50" }}>
        Settings
      </Box>
    </VStack>
  );
};

export default Sidebar;
