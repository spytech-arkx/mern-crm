import { useDeleteCompanyMutation } from "@/features/api/companies";
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

function CompanyDelete({ isOpen, onClose, company, companyName }) {
  const [deleteCompany, { isLoading }] = useDeleteCompanyMutation();
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      console.log(`Modal opened for ${companyName}`);
    }
  }, [isOpen, companyName]);

  const handleDelete = async () => {
    try {
      await deleteCompany(company).unwrap();
      toast({
        title: `${companyName} deleted`,
        description: "The company has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Ferme le modal après suppression
    } catch (err) {
      console.error(err);
      toast({
        title: "An error occurred.",
        description: "Failed to delete the company.",
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
        <ModalHeader>Delete Company</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete<strong> {companyName}</strong>?
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

export default CompanyDelete;
