import { useDeleteContactMutation } from "@/features/api/contacts";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";

function ContactDelete({ isOpen, onClose, contact, contactName }) {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      console.log(`Modal opened for ${contactName}`);
    }
  }, [isOpen, contactName]);

  const handleDelete = async () => {
    try {
      await deleteContact(contact).unwrap();
      toast({
        title: `${contactName} deleted`,
        description: "The Contact has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Ferme le modal après suppression
    } catch (err) {
      console.log(err);
      toast({
        title: "An error occurred.",
        description: "Failed to delete the Contact.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete<strong> {contactName}</strong>?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="ghost"
            colorScheme="red"
            isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ContactDelete;
