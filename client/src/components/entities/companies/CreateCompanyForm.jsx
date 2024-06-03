import { useState } from "react";
import { useCreateCompanyMutation } from "@/features/api/companies";
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

const CreateCompanyForm = ({ isOpen, onClose }) => {
  const [imageKey, setImageKey] = useState("");

  const user = useSelector((state) => state.auth.user);
  const [createCompany, { isLoading }] = useCreateCompanyMutation();
  const [formCompany, setFormCompany] = useState({});
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    skipPolling: true,
    onClientUploadComplete: (res) => {
      setFormCompany((prev) => ({ ...prev, logo: res[0].url }));

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
      setFormCompany((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else if (name === "website" && !value.includes("https://")) {
      setFormCompany((prev) => ({
        ...prev,
        website: `https://${value}`,
      }));
    } else {
      setFormCompany((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formCompany.name) newErrors.name = "Company Name is required";
    if (!formCompany.industry) newErrors.industry = "Industry is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [selectedRating, setSelectedRating] = useState("Shut Down"); // État pour stocker la valeur sélectionnée

  // Fonction de gestion de changement de sélection
  const handleStatusChange = (event) => {
    setSelectedRating(event.target.value);
  };

  // Options disponibles
  const statusOptions = [
    "Acquired",
    "Active",
    "Market Failed",
    "Project Cancelled",
    "Shut Down",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await createCompany({
        ...formCompany,
        ownership: user.firstName,
        owner: user._id,
        rating: selectedRating,
      }).unwrap();
      toast({
        title: "Company created.",
        description: "The company has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setErrors({});
      setFormCompany({});
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
        console.error(err);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="80%" w="70%">
        <ModalHeader>Create New Company</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Avatar</FormLabel>
              <Image as={Avatar} src={formCompany.logo} key={imageKey} />
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
                <FormControl isInvalid={errors.name} isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input name="name" onChange={handleChange} />
                  {errors.name && <Text color="red.500">{errors.name}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Company Type</FormLabel>
                  <Input name="companyType" onChange={handleChange} />
                  {errors.companyType && (
                    <Text color="red.500">{errors.companyType}</Text>
                  )}
                </FormControl>
                <FormControl isInvalid={errors.industry} isRequired>
                  <FormLabel>Industry</FormLabel>
                  <Input name="industry" onChange={handleChange} />
                  {errors.industry && <Text color="red.500">{errors.industry}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input name="description" onChange={handleChange} />
                  {errors.description && (
                    <Text color="red.500">{errors.description}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input name="website" onChange={handleChange} />
                  {errors.website && <Text color="red.500">{errors.website}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    value={selectedRating}
                    onChange={handleStatusChange}
                    placeholder="Select Status">
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>{" "}
                </FormControl>

                <FormControl>
                  <FormLabel>Ticker Symbol</FormLabel>
                  <Input name="tickerSymbol" onChange={handleChange} />
                  {errors.tickerSymbol && (
                    <Text color="red.500">{errors.tickerSymbol}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Employees</FormLabel>
                  <Input type="number" name="employees" onChange={handleChange} />
                  {errors.employees && <Text color="red.500">{errors.employees}</Text>}
                </FormControl>
                <FormControl>
                  <FormLabel>Annual Revenue</FormLabel>
                  <Input type="number" name="annualRevenue" onChange={handleChange} />
                  {errors.annualRevenue && (
                    <Text color="red.500">{errors.annualRevenue}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Tag</FormLabel>
                  <Input name="tag" onChange={handleChange} />
                  {errors.tag && <Text color="red.500">{errors.tag}</Text>}
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl>
                  <FormLabel>Billing Address</FormLabel>
                  <Input
                    placeholder="Street"
                    name="billingAddress.Street"
                    onChange={handleChange}
                  />
                  {errors["billingAddress.Street"] && (
                    <Text color="red.500">{errors["billingAddress.Street"]}</Text>
                  )}
                  <Input
                    placeholder="City"
                    name="billingAddress.City"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["billingAddress.City"] && (
                    <Text color="red.500">{errors["billingAddress.City"]}</Text>
                  )}
                  <Input
                    placeholder="State"
                    name="billingAddress.State"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["billingAddress.State"] && (
                    <Text color="red.500">{errors["billingAddress.State"]}</Text>
                  )}
                  <Input
                    placeholder="Billing Code"
                    name="billingAddress.BillingCode"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["billingAddress.BillingCode"] && (
                    <Text color="red.500">{errors["billingAddress.BillingCode"]}</Text>
                  )}
                  <Input
                    placeholder="Postal Code"
                    name="billingAddress.PostalCode"
                    onChange={handleChange}
                    mt={2}
                  />
                  {errors["billingAddress.PostalCode"] && (
                    <Text color="red.500">{errors["billingAddress.PostalCode"]}</Text>
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

export default CreateCompanyForm;
