import { useEditContactMutation } from "@/features/api/contacts";
import { useUploadThing } from "@/lib/uploadthing";

import {
  Avatar,
  Button,
  FormLabel,
  FormControl,
  Input,
  Text,
  useToast,
  VStack,
  SimpleGrid,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

const UpdateContactForm = ({ contact }) => {
  const [imageKey, setImageKey] = useState("");
  const [formContact, setFormContact] = useState(
    contact || {
      address: {},
    },
  );
  const [editContact, { isLoading }] = useEditContactMutation();
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const fileInputRef = useRef(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    skipPolling: true,
    onClientUploadComplete: (res) => {
      setFormContact((prev) => ({ ...prev, logo: res[0].url }));
      setTimeout(() => setImageKey(Date.now()), 2000);
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

  // Synchroniser l'état local avec les props entrantes
  useEffect(() => {
    setFormContact(contact);
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      // Divise le nom du champ pour obtenir le champ spécifique de l'adresse
      const addressField = name.split(".")[1];
      // Met à jour l'adresse avec la nouvelle valeur pour le champ spécifique
      setFormContact((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      // Si le champ modifié n'est pas dans l'adresse, met simplement à jour formContact
      setFormContact((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formContact.firstName) newErrors.firstName = "Contact firstname is required";
    if (!formContact.description) newErrors.description = "Description is required";
    if (!formContact.lastName) newErrors.lastName = "lastname is required";
    if (!formContact.email) newErrors.email = "email is required";
    if (!formContact.phone) newErrors.phone = "phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await editContact({
        id: contact._id,
        contact: formContact,
      }).unwrap();
      toast({
        title: "Contact updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Contact updating failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Avatar</FormLabel>
          <Image as={Avatar} src={formContact.logo} key={imageKey} />
          <Button
            variant="outline"
            onClick={() => {
              fileInputRef.current.click();
            }}>
            {isUploading ? <Spinner /> : "Change logo"}
          </Button>{" "}
          <Input
            hidden
            name="logo"
            type="file"
            id="logo"
            ref={fileInputRef}
            onChange={(event) => {
              startUpload([event.target.files[0]]);
            }}
          />
        </FormControl>

        <SimpleGrid columns={2} spacing={4} w="full">
          <FormControl isRequired isInvalid={errors.firstName}>
            <FormLabel>Contact firstName</FormLabel>
            <Input
              name="firstName"
              value={formContact.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <Text color="red.500">{errors.firstName}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={formContact.description}
              onChange={handleChange}
            />
            {errors.description && <Text color="red.500">{errors.description}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.lastName}>
            <FormLabel>lastName</FormLabel>
            <Input name="lastName" value={formContact.lastName} onChange={handleChange} />
            {errors.lastName && <Text color="red.500">{errors.lastName}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formContact.email} onChange={handleChange} />
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </FormControl>
          <FormControl isRequired isInvalid={errors.phone}>
            <FormLabel>phone</FormLabel>
            <Input name="phone" value={formContact.phone} onChange={handleChange} />
            {errors.phone && <Text color="red.500">{errors.phone}</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="Street"
              value={formContact.address ? formContact.address.street : ""} // Accédez à street avec formContact.address.street
              name="address.street"
              onChange={handleChange}
            />
            <Input
              placeholder="City"
              value={formContact.address ? formContact.address.city : ""} // Accédez à city avec formContact.address.city
              name="address.city"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="State"
              value={formContact.address ? formContact.address.state : ""} // Accédez à state avec formContact.address.state
              name="address.state"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="Country"
              value={formContact.address ? formContact.address.country : ""} // Accédez à country avec formContact.address.country
              name="address.country"
              onChange={handleChange}
              mt={2}
            />
            <Input
              placeholder="Postal Code"
              value={formContact.address ? formContact.address.zipCode : ""} // Accédez à zipCode avec formContact.address.zipCode
              name="address.zipCode"
              onChange={handleChange}
              mt={2}
            />
          </FormControl>
        </SimpleGrid>
      </VStack>
      <Button bg="black" color="white" type="submit" isLoading={isLoading} w="80%">
        Save
      </Button>
    </form>
  );
};

export default UpdateContactForm;
