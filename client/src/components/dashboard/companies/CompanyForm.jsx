import { updateCompany } from "@/features/companies/companies-slice";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CompanyForm = ({ isOpen, onClose, company }) => {
  const [formCompany, setFormCompany] = useState(company);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCompany({ ...company, ...formCompany }));

    onClose();
    {
      //console.log(company);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{company.companyName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel> company Name</FormLabel>
            <Input
              name="companyName"
              value={formCompany.companyName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>description</FormLabel>
            <Input
              name="description"
              value={formCompany.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>website</FormLabel>
            <Input name="website" value={formCompany.website} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Input
              name="companyType"
              value={formCompany.companyType}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>industry</FormLabel>
            <Input name="industry" value={formCompany.industry} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" onClick={handleSubmit}>
            Close
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            cloooose
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CompanyForm;
