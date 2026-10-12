export interface Founder {
  id: string;
  name: string;
  role: string;
  biography: string[];
  responsibilities: string[];
  image?: { src: string; alt: string; width: number; height: number };
  links?: { label: string; url: string }[];
  approvedForPublication: boolean;
}

// Add only supplied, publication-approved founder information.
export const founders: Founder[] = [
  {
    id: "mohammad-sulema-khan",
    name: "Mohammad Sulema Khan",
    role: "Co-founder",
    biography: [],
    responsibilities: [],
    approvedForPublication: true,
  },
  {
    id: "muhammad-zaigham",
    name: "Muhammad Zaigham",
    role: "Co-founder",
    biography: [],
    responsibilities: [],
    approvedForPublication: true,
  },
];
export const publishedFounders = founders.filter(
  (founder) => founder.approvedForPublication,
);
