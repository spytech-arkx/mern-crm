import { AttachmentIcon, EditIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Flex,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";
import user from "./user";
import UserActivity from "./UserActivity";

const ProfileHeader = () => {
  return (
    <>
      <Flex p={6} bg="gray.100" bgGradient="linear(to-l, gray.100, white)">
        <Center>
          <Avatar size="2xl">
            <AvatarBadge
              as={EditIcon}
              boxSize="0.90em"
              color="white"
              bg="blue.500"
              borderColor="blue.500"
            />
          </Avatar>
          <Box>
            <Text fontSize="2xl" ml={6}>
              {user.username}
            </Text>
            <Text fontSize="sm" ml={6}>
              {user.role}
            </Text>
          </Box>
        </Center>
        <Spacer />
        <Box m={8}>
          <VStack>
            <Box w={80}>
              <PhoneIcon mr={2} ml={2} />
              <Text as="b"> Phone : {`${user.phone}`}</Text>
            </Box>
            <Box w={80}>
              <EmailIcon mr={2} ml={2} /> <Text as="b">Email : {`${user.email}`}</Text>
            </Box>
            <Box w={80}>
              <AttachmentIcon mr={2} ml={2} />{" "}
              <Text as="b">Company : {`${user.grouping}`}</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Activity</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
            <ProfileDetails />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
            <UserActivity />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
            <ProfileSettings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
export default ProfileHeader;
