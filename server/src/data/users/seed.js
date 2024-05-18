import { allLocales, faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = Array.from({ length: 100 }, () => ({
  uuid: `${crypto.randomUUID().split("-").slice(1).join('')}`, // Using the provided code generator
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    zipCode: faker.location.zipCode(),
  },
  username: faker.internet.userName(),
  password: faker.internet.password(),
  dateOfBirth: faker.date.past(),
  website: faker.internet.url(),
  avatar: faker.image.avatar(),
  language: faker.helpers.objectKey(allLocales),
  countryLocale: faker.location.countryCode(),
  timeZone: faker.helpers.arrayElement(faker.definitions.location.time_zone),
  dateFormat: faker.helpers.arrayElement(['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY']),
  timeFormat: faker.helpers.arrayElement(['HH:mm', 'h:mm A', 'HH:mm:ss']),
  role: faker.helpers.arrayElement(['admin', 'user', 'editor']),
  addedBy: `${crypto.randomUUID().split("-").slice(1).join('')}`, // Using the provided code generator
  modifiedBy: `${crypto.randomUUID().split("-").slice(1).join('')}`, // Using the provided code generator
  isActive: faker.datatype.boolean(),
  verified: faker.datatype.boolean(),
  alias: faker.lorem.word(),
  grouping: faker.lorem.word(),
  sortOrder: faker.helpers.arrayElement(['asc', 'desc']),
  confirm: faker.datatype.boolean(),
  notes: faker.lorem.sentence(),
}));

fs.writeFileSync(
    path.join(__dirname, "users.json"),
    JSON.stringify(users, null, 2),
  );
  
  console.log("✅ users data generated.");