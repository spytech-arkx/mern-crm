import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ratingOptions = ['Acquired', 'Active', 'Market Failed', 'Project Cancelled', 'Shut Down'];
const companyTypeOptions = ['Customer', 'Partner', 'Vendor'];
const ownershipOptions = ['Public', 'Private', 'Government'];
const industryOptions = ['Technology', 'Finance', 'Education', 'Real Estate'];

const companies = Array.from({ length: 100 }, () => ({
  name: faker.company.name(),
  billingAddress: {
    Street: faker.location.streetAddress(),
    City: faker.location.city(),
    State: faker.location.state(),
    BillingCode: faker.lorem.word(),
    PostalCode: faker.location.zipCode(),
  },
  shippingAddress: {
    Street: faker.location.streetAddress(),
    City: faker.location.city(),
    ShippingCode: faker.lorem.word(),
    PostalCode: faker.location.zipCode(),
  },
  owner: `${crypto.randomUUID().split("-").slice(1).join('')}`,
  parentCompany: `CP-${crypto.randomUUID().split("-")[1].toUpperCase()}`,
  description: faker.lorem.sentence(),
  rating: faker.helpers.arrayElement(ratingOptions),
  website: faker.internet.url(),
  tickerSymbol: faker.lorem.word().toUpperCase(),
  companyType: faker.helpers.arrayElement(companyTypeOptions),
  ownership: faker.helpers.arrayElement(ownershipOptions),
  industry: faker.helpers.arrayElement(industryOptions),
  employees: faker.datatype.number({ min: 1 }),
  annualRevenue: faker.finance.amount(),
  tag: faker.lorem.word(),
}));

fs.writeFileSync(
    path.join(__dirname, "companies.json"),
    JSON.stringify(companies, null, 2),
  );
  
  console.log("✅ Companies data generated.");