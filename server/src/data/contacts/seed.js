import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const salutationOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", ""];
const leadSourceOptions = [
  "None",
  "Advertisement",
  "Employee Referral",
  "Facebook",
  "Twitter",
  "Google+",
  "External Referral",
  "Public Relations",
  "Web Download",
  "Web Research",
  "Cold Call",
  "Chat",
  "",
];

const contacts = Array.from({ length: 100 }, () => ({
  salutation: faker.helpers.arrayElement(salutationOptions),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number("+1-###-###-####"),
  birthday: faker.date.past({ years: 50 }),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    zipCode: faker.location.zipCode(),
  },
  description: faker.lorem.sentence({ min: 5, max: 15 }),
  emailOptOut: Boolean(faker.datatype.boolean()),
  socials: {
    X: `https://twitter.com/${faker.internet.userName()}`,
    LinkedIn: `https://linkedin.com/in/${faker.internet.userName()}`,
  },
  leadSource: faker.helpers.arrayElement(leadSourceOptions),
  companyId: `CP-${crypto.randomUUID().split("-")[1].toUpperCase()}`,
  title: faker.person.jobTitle(),
  skypeId: `live:${faker.internet.userName()}`,
}));

fs.writeFileSync(
  path.join(__dirname, "contacts.json"),
  JSON.stringify(contacts, null, 2),
);

console.log("✅ Contacts data generated.");
