import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "@/features/companies/companies-slice";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { useEffect } from "react";

const CompaniesList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.companies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCompanies());
    }
  }, [status, dispatch]);
  if (status === "loading") {
    return <div>loading...</div>;
  }
  if (status === "failed") {
    return <div className="px-4">{error}</div>;
  }

  return (
    <div className="px-4">
      <Text>Companies </Text>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {items.map((company, index) => (
          <Card key={index}>
            <CardHeader>
              <Heading size="md"> {company.name}</Heading>
            </CardHeader>
            <Text>{company.industry}</Text>
            <CardBody>
              <Text>{company.website}</Text>
            </CardBody>

            <CardFooter>
              <Button>
                <Link
                  as={RouterLink}
                  to={`/companies/${company._id}`}
                  key={company._id}
                  _hover={{ textDecoration: "none" }}>
                  View details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default CompaniesList;
