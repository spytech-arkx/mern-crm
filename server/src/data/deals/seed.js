/* eslint-disable camelcase */
const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");
const icons = require("simple-icons");

const stages = [
  "New Lead",
  "Qualified Lead",
  "In Draft",
  "Proposal Sent",
  "Negotiation",
  "Deal Won",
  "Deal Lost",
];

const deals = Array.from({ length: 40 }, () => ({
  title: faker.word.words({ count: { min: 4, max: 6 } }),
  description: faker.lorem.sentence(),
  amount: faker.finance.amount(),
  closingDate: faker.date.future(),
  contact: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    fullName: faker.person.fullName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
  },
  company: {
    name: faker.company.name(),
  },
  assignee: {
    name: faker.person.fullName(),
    avatar: faker.image.urlLoremFlickr({ category: "people" }),
  },
  expectedRevenue: faker.finance.amount(),
  stage: faker.helpers.arrayElement(stages),
}));

fs.writeFileSync(path.join(__dirname, "deals.json"), JSON.stringify(deals, null, 2));

console.log("✅ deals data generated.");
