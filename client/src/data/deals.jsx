import { z } from "zod";

const schema = z.object({
  label: z.string().max("69", "Title too long, use the notes").optional(),
  assignee: z
    .object({
      name: z.string().trim().optional(),
      avatar: z.string().url().optional(),
    })
    .optional(),
  contact: z
    .object({
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
      fullName: z.string().trim().optional(),
      email: z.string().email().optional(),
      avatar: z.string().url().optional(),
      phone: z.string().trim().optional(),
    })
    .optional(),
  company: z
    .object({
      name: z.string(),
    })
    .optional(),
  stage: z.enum([
        "New Lead",
        "Qualified Lead",
        "In Draft",
        "Proposal Sent",
        "Negotiation",
        "Deal Won",
        "Deal Lost",
      ]).optional(),
  createdAt: z.date().optional(),
  createdBy: z.string().optional(),
  modifiedAt: z.date().optional(),
  modifiedBy: z.string().optional(),
  amount: z
    .string()
    .regex(/[0-9]/, ":) really ?")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  closingDate: z.date().optional(),
  nextStep: z.string().max(50, "Too long.").optional(),
  leadSource: z
    .enum([
      "Website",
      "Email Campaign",
      "Social Media",
      "Referral",
      "Advertisement",
      "Event",
      "Cold Call",
      "Direct Mail",
      "Search Engine",
      "Partner",
    ])
    .optional(),
  notes: z.string().max(255, "Too long,").optional(),
  attachements: z.array(z.object({
    name: z.string().trim(),
    type: z.string().trim(),
    size: z.number(),
    url: z.string().url(),
  })).optional(),
});

export const sources = [
  { id: 1, label: "Website", value: "Website" },
  { id: 2, label: "Email Campaign", value: "Email Campaign" },
  { id: 3, label: "Social Media", value: "Social Media" },
  { id: 4, label: "Referral", value: "Referral" },
  { id: 5, label: "Advertisement", value: "Advertisement" },
  { id: 6, label: "Event", value: "Event" },
  { id: 7, label: "Cold Call", value: "Cold Call" },
  { id: 8, label: "Direct Mail", value: "Direct Mail" },
  { id: 9, label: "Search Engine", value: "Search Engine" },
  { id: 10, label: "Partner", value: "Partner" },
];

export const stages = [
  {
    id: 1,
    value: "New Lead",
    label: "New Lead",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20 rounded-l-full",
  },
  {
    id: 2,
    value: "Qualified Lead",
    label: "Qualified Lead",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 3,
    value: "In Draft",
    label: "In Draft",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 4,
    value: "Proposal Sent",
    label: "Proposal Sent",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 5,
    value: "Negotiation",
    label: "Negotiation",
    styleWhenCompleted: "bg-[#2e2e2e] text-neutral-20 hover:bg-[#2e2e2e] hover:text-neutral-20",
  },
  {
    id: 6,
    value: "Deal Won",
    label: "Deal Won",
    styleWhenCompleted: "bg-[#2e2e2e] text-white hover:bg-[#19870e] hover:text-neutral-20",
  },
  {
    id: 7,
    value: "Deal Lost",
    label: "Deal Lost",
    styleWhenCompleted: "bg-[#2e2e2e] rounded-r-full text-white hover:bg-[#ab0909] hover:text-neutral-20",
  },
];

export const assignees = [
  {
    name: "Ernestine Sawayn",
    avatar: "https://loremflickr.com/640/480/people?lock=7955103487098880",
  },
  {
    name: "Julio Breitenberg",
    avatar: "https://loremflickr.com/640/480/people?lock=3449100592742400",
  },
  {
    name: "Traci Kuphal",
    avatar: "https://loremflickr.com/640/480/people?lock=7225913890570240",
  },
  {
    name: "Dr. Douglas Schneider",
    avatar: "https://loremflickr.com/640/480/people?lock=2489980026880000",
  },
  {
    name: "Dr. Lowell Windler V",
    avatar: "https://loremflickr.com/640/480/people?lock=2719769633488896",
  },
  {
    name: "Jeannette Heller",
    avatar: "https://loremflickr.com/640/480/people?lock=8926477493993472",
  },
  {
    name: "Frederick Hilpert",
    avatar: "https://loremflickr.com/640/480/people?lock=1565734253625344",
  },
  {
    name: "Dianne Ankunding",
    avatar: "https://loremflickr.com/640/480/people?lock=1091105888141312",
  },
  {
    name: "Stewart Bergstrom",
    avatar: "https://loremflickr.com/640/480/people?lock=7655250980765696",
  },
  {
    name: "Kara Murazik III",
    avatar: "https://loremflickr.com/640/480/people?lock=1389189088149504",
  },
  {
    name: "Traci Keebler",
    avatar: "https://loremflickr.com/640/480/people?lock=3783216603332608",
  },
  {
    name: "Bonnie Sporer",
    avatar: "https://loremflickr.com/640/480/people?lock=8884815635939328",
  },
  {
    name: "Felix Stanton",
    avatar: "https://loremflickr.com/640/480/people?lock=5281813362638848",
  },
  {
    name: "Arturo Reichel",
    avatar: "https://loremflickr.com/640/480/people?lock=6418048000983040",
  },
  {
    name: "Jamie Trantow",
    avatar: "https://loremflickr.com/640/480/people?lock=7323380357267456",
  },
  {
    name: "Mr. Dominic Brekke",
    avatar: "https://loremflickr.com/640/480/people?lock=3502456835145728",
  },
  {
    name: "Gladys Mayert",
    avatar: "https://loremflickr.com/640/480/people?lock=6818265516998656",
  },
  {
    name: "Francis Fisher",
    avatar: "https://loremflickr.com/640/480/people?lock=5249651441664000",
  },
  {
    name: "Mr. Keith Hartmann",
    avatar: "https://loremflickr.com/640/480/people?lock=8874845838245888",
  },
  {
    name: "Phil Koepp",
    avatar: "https://loremflickr.com/640/480/people?lock=4553557460123648",
  },
];

export default schema;
