export type CareerDiscipline =
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "Mobile"
  | "AI & Automation"
  | "UI/UX"
  | "QA"
  | "Social Media"
  | "Digital Marketing"
  | "Business Development"
  | "Lead Generation"
  | "Upwork Bidding / Proposal Writing";

export interface CareerRole {
  slug: string;
  title: string;
  discipline: CareerDiscipline;
  status: "draft" | "open" | "closed";
  location: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

// Publish a role only after the business approves its details.
export const careers: CareerRole[] = [];
export const getOpenRoles = () =>
  careers.filter((role) => role.status === "open");
