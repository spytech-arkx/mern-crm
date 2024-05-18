import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const labels = [
  {
    value: "urgent",
    label: "Urgent",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "document",
    label: "Document",
  },
  {
    value: "internal",
    label: "Internal",
  },
  {
    value: "report",
    label: "Report",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "To-do",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
  {
    value: "impeded",
    label: "Impeded",
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
]

const tasks = Array.from({ length: 100 }, () => ({
  id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
  title: faker.lorem.sentence({ min: 5, max: 7}),
  status: faker.helpers.arrayElement(statuses).value,
  label: faker.helpers.arrayElement(labels).value,
  priority: faker.helpers.arrayElement(priorities).value,
  assignee: {
    name: faker.person.fullName(),
    avatar: faker.image.avatarGitHub(),
  },
  dueDate: faker.date.future(),
}))

fs.writeFileSync(
  path.join(__dirname, "tasks.json"),
  JSON.stringify(tasks, null, 2)
)

console.log("✅ Tasks data generated.")
