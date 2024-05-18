import { faker } from "@faker-js/faker";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stageOptions = ['Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
const reasonForLossOptions = ['Competitor', 'Budget Constraints', 'No Decision', 'Other'];
const leadSourceOptions = [
  'None', 'Advertisement', 'Employee Referral', 'Facebook', 'Twitter', 
  'Google+', 'External Referral', 'Public Relations', 'Web Download', 
  'Web Research', 'Cold Call', 'Chat'
];

const deals = Array.from({ length: 100 }, () => ({
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  amount: faker.finance.amount(),
  closingDate: faker.date.future(),
  expectedRevenue: faker.finance.amount(),
  companyId: `CP-${crypto.randomUUID().split("-")[1].toUpperCase()}`,
  contactId: `CT-${crypto.randomUUID().split("-")[0].toUpperCase()}`,
  stage: faker.helpers.arrayElement(stageOptions),
  type: faker.lorem.word(),
  reasonForLoss: faker.helpers.arrayElement(reasonForLossOptions),
  nextStep: faker.lorem.words(3),
  probability: faker.datatype.number({ min: 0, max: 100 }),
  leadSource: faker.helpers.arrayElement(leadSourceOptions),
  tag: faker.lorem.word(),
  id: `DL-${crypto.randomUUID().split('-')[1].toUpperCase()}`,
}));

fs.writeFileSync(
    path.join(__dirname, "deals.json"),
    JSON.stringify(deals, null, 2),
  );
  
  console.log("✅ deals data generated.");