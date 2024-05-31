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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const CreateCompanyForm = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const [createCompany] = useCreateCompanyMutation();
  const [formCompany, setFormCompany] = useState({});
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormCompany((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormCompany((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formCompany.name) newErrors.name = "Company Name is required";
    if (!formCompany.industry) newErrors.industry = "Industry is required";
    // Ajoutez d'autres validations selon vos besoins

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [selectedRating, setSelectedRating] = useState(""); // État pour stocker la valeur sélectionnée

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
      console.log(user._id);
      toast({
        title: "Company created.",
        description: "The company has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response);
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
        console.log(err);
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
          <Button colorScheme="blue" mr={3} type="submit" onClick={handleSubmit}>
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
