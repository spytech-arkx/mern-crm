import { Box, HStack, Text } from "@chakra-ui/react";
import user from "./user";

const ProfileDetails = () => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        User Details
      </Text>
      <HStack justifyContent="space-between" align="top">
        <Box w={256} mb={2} boxShadow="2xl" p="6" rounded="md" bg="white">
          <Text as="b">Name: </Text> <Text>{`${user.firstName} ${user.lastName}`}</Text>
          <Text as="b">Username:</Text> <Text> {user.username}</Text>
          <Text as="b">Alias:</Text> <Text> {user.alias}</Text>
          <Text as="b">Date of Birth:</Text> <Text> {user.dateOfBirth}</Text>
          <Text as="b">Language:</Text> <Text> {user.language}</Text>
          <Text as="b">Website:</Text> <Text> {user.website}</Text>
          <Text as="b">Country Locale:</Text> <Text> {user.countryLocale}</Text>
        </Box>

        <Box w={256} mb={2} boxShadow="2xl" p="6" rounded="md" bg="white">
          <Text as="b">Email:</Text> <Text> {user.email}</Text>
          <Text as="b">Phone: </Text> <Text>{user.phone}</Text>
          <Text as="b">Address:</Text>{" "}
          <Text>
            {" "}
            {user.address.street}, {user.address.city}, {user.address.state},{" "}
            {user.address.country}, {user.address.zipCode}
          </Text>
        </Box>

        <Box w={256} mb={2} boxShadow="2xl" p="6" rounded="md" bg="white">
          <Text as="b">Role:</Text> <Text> {user.role}</Text>
          <Text as="b">Active:</Text> <Text> {user.isActive ? "Yes" : "No"}</Text>
          <Text as="b">Grouping: </Text> <Text>{user.grouping}</Text>
          <Text as="b">Added By:</Text> <Text> {user.addedBy}</Text>
          <Text as="b">Modified By:</Text> <Text> {user.modifiedBy}</Text>
        </Box>

        <Box w={256} mb={2} boxShadow="2xl" p="6" rounded="md" bg="white">
          <Text as="b">Verified: </Text> <Text>{user.verified ? "Yes" : "No"}</Text>
          <Text as="b">Confirm: </Text> <Text>{user.confirm ? "Yes" : "No"}</Text>
          <Text as="b">Notes: </Text> <Text>{user.notes}</Text>
        </Box>
      </HStack>
    </>
  );
};

export default ProfileDetails;
