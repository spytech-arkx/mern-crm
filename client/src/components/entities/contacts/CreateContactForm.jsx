import { useState } from "react";
import { useCreateContactMutation } from "@/features/api/contacts";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormLabel,
  FormControl,
  Input,
  VStack,
  Text,
  SimpleGrid,
  useToast,
  Select,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { useUploadThing } from "@/lib/uploadthing";

import { useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";

const CreateContactForm = ({ isOpen, onClose }) => {
  const [imageKey, setImageKey] = useState("");

  const user = useSelector((state) => state.auth.user);
  const [createContact, { isLoading }] = useCreateContactMutation();
  const [formContact, setFormContact] = useState({});
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    skipPolling: true,
    onClientUploadComplete: (res) => {
      setFormContact((prev) => ({ ...prev, logo: res[0].url }));

      setTimeout(() => setImageKey(Date.now()), 1500);
    },
    onUploadError: (error) => {
      console.error(error);
      toast({
        title: "Error occurred while uploading",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormContact((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormContact((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formContact.firstName) newErrors.firstName = "Contact firstName is required";
    if (!formContact.lastName) newErrors.lastName = "lastName is required";
    if (!formContact.birthday) newErrors.birthday = "birthday is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [selectedSalutation, setSelectedSalutation] = useState("Shut Down"); // État pour stocker la valeur sélectionnée

  // Fonction de gestion de changement de sélection
  const handleStatusChange = (event) => {
    setSelectedSalutation(event.target.value);
  };

  // Options disponibles
  const statusOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await createContact({
        ...formContact,
        //createdBy: user._id,
        salutation: selectedSalutation,
      }).unwrap();
      toast({
        title: "Contact created.",
        description: "The Contact has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response);
      setErrors({});
      setFormContact({});
      onClose();
    } catch (err) {
      toast({
        title: "An error occurred.",
        description: err.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      if (err.data && err.data.error) {
        if (!err.data.error.details) {
          return setErrors(err.data.message);
        }
        const validationError = err.data.error.details.reduce((acc, error) => {
          const fieldName = error.path.join(".");
          acc[fieldName] = error.message;
          return acc;
        }, {});
        setErrors(validationError);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="80%" w="70%">
        <ModalHeader>Create New Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Avatar</FormLabel>
              <Image as={Avatar} src={formContact.logo} key={imageKey} />
              <Button
                variant="outline"
                onClick={() => {
                  // Imma do the forbidden, ,-,
                  document.getElementById("logo").click();
                }}>
                {isUploading ? <Spinner /> : "Change logo"}
              </Button>
              <Input
                hidden
                name="logo"
                type="file"
                id="logo"
                onChange={(event) => {
                  startUpload([event.target.files[0]]);
                }}
              />
            </FormControl>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isInvalid={errors.firstName} isRequired>
                  <FormLabel>Contact Name</FormLabel>
                  <Input name="firstName" onChange={handleChange} />
                  {errors.firstName && <Text color="red.500">{errors.firstName}</Text>}
                  <Input name="lastName" onChange={handleChange} />
                  {errors.lastName && <Text color="red.500">{errors.lastName}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" onChange={handleChange} />
                  {errors.email && <Text color="red.500">{errors.email}</Text>}
                </FormControl>
                <FormControl isInvalid={errors.phone} isRequired>
                  <FormLabel>phone</FormLabel>
                  <Input name="phone" onChange={handleChange} />
                  {errors.phone && <Text color="red.500">{errors.phone}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input name="description" onChange={handleChange} />
                  {errors.description && (
                    <Text color="red.500">{errors.description}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>birthday</FormLabel>
                  <Input name="birthday" onChange={handleChange} />
                  {errors.birthday && <Text color="red.500">{errors.birthday}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Salutation</FormLabel>
                  <Select
                    value={selectedSalutation}
                    onChange={handleStatusChange}
                    placeholder="Select Status">
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>socials</FormLabel>
                  <Input name="socials.X" placeholder="X link" onChange={handleChange} />
                  <Input
                    name="socials.LinkedIn"
                    placeholder="LinkedIn link"
                    onChange={handleChange}
                  />
                  <Input
                    name="socials.Facebook"
                    placeholder="Facebook link"
                    onChange={handleChange}
                  />

                  {errors.socials && <Text color="red.500">{errors.socials}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>leadSource</FormLabel>
                  <Input type="number" name="leadSource" onChange={handleChange} />
                  {errors.leadSource && <Text color="red.500">{errors.leadSource}</Text>}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl>
                  <FormLabel> Address</FormLabel>
                  <Input
                    placeholder="Street"
                    name="address.Street"
                    onChange={handleChange}
                  />
                  {errors["address.Street"] && (
                    <Text color="red.500">{errors["address.Street"]}</Text>
                  )}
                  <Input
                    placeholder="City"
                    name="address.City"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["address.City"] && (
                    <Text color="red.500">{errors["address.City"]}</Text>
                  )}
                  <Input
                    placeholder="State"
                    name="address.State"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["address.State"] && (
                    <Text color="red.500">{errors["address.State"]}</Text>
                  )}
                  <Input
                    placeholder="country"
                    name="address.country"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["address.BillingCode"] && (
                    <Text color="red.500">{errors["address.BillingCode"]}</Text>
                  )}
                  <Input
                    placeholder="zipCode"
                    name="address.zipCode"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["address.PostalCode"] && (
                    <Text color="red.500">{errors["address.PostalCode"]}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Shipping Address</FormLabel>
                  <Input
                    placeholder="Street"
                    name="shippingAddress.Street"
                    onChange={handleChange}
                  />
                  {errors["shippingAddress.Street"] && (
                    <Text color="red.500">{errors["shippingAddress.Street"]}</Text>
                  )}
                  <Input
                    placeholder="City"
                    name="shippingAddress.City"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["shippingAddress.City"] && (
                    <Text color="red.500">{errors["shippingAddress.City"]}</Text>
                  )}
                  <Input
                    placeholder="Shipping Code"
                    name="shippingAddress.ShippingCode"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["shippingAddress.ShippingCode"] && (
                    <Text color="red.500">{errors["shippingAddress.ShippingCode"]}</Text>
                  )}
                  <Input
                    placeholder="Postal Code"
                    name="shippingAddress.PostalCode"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["shippingAddress.PostalCode"] && (
                    <Text color="red.500">{errors["shippingAddress.PostalCode"]}</Text>
                  )}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} w="full"></SimpleGrid>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateContactForm;
