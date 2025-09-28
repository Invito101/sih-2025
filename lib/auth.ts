export interface User {
  id: string
  name: string
  email: string
  role: "government" | "agency"
  organization: string
  state?: string
  district?: string
  permissions: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  location: {
    state: string
    district: string
    coordinates?: [number, number]
  }
  budget: number
  timeline: {
    startDate: string
    expectedEndDate: string
    actualEndDate?: string
  }
  status: "draft" | "posted" | "bidding" | "assigned" | "in_progress" | "completed" | "cancelled"
  createdBy: string
  assignedAgency?: string
  bids: Bid[]
  milestones: Milestone[]
  expenses: Expense[]
  documents: Document[]
  communications: Communication[]
}

export interface Bid {
  id: string
  agencyId: string
  agencyName: string
  proposedBudget: number
  timeline: number // days
  experience: string
  proposal: string
  submittedAt: string
  status: "pending" | "accepted" | "rejected"
}

export interface Milestone {
  id: string
  title: string
  description: string
  expectedDate: string
  actualDate?: string
  status: "pending" | "in_progress" | "completed" | "delayed"
  progress: number
  photos: string[]
  reports: string[]
}

export interface Expense {
  id: string
  category: string
  amount: number
  description: string
  date: string
  approvedBy?: string
  receipt?: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadedBy: string
  uploadedAt: string
}

export interface Communication {
  id: string
  from: string
  to: string
  message: string
  timestamp: string
  attachments?: string[]
  read: boolean
}

// Mock data for development
export const mockUsers: User[] = [
  {
    id: "gov1",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gov.in",
    role: "government",
    organization: "Maharashtra State Government",
    state: "Maharashtra",
    district: "Mumbai",
    permissions: ["create_project", "assign_project", "view_all_projects", "approve_budget"],
  },
  {
    id: "agency1",
    name: "Priya Sharma",
    email: "priya@constructionco.com",
    role: "agency",
    organization: "Modern Construction Co.",
    state: "Maharashtra",
    permissions: ["bid_project", "view_assigned_projects", "upload_progress", "submit_reports"],
  },
]

export const mockProjects: Project[] = [
  {
    id: "proj1",
    title: "Girls Hostel - Pune District",
    description: "Construction of 200-capacity girls hostel with modern amenities",
    location: {
      state: "Maharashtra",
      district: "Pune",
      coordinates: [18.5204, 73.8567],
    },
    budget: 25000000, // 2.5 Cr
    timeline: {
      startDate: "2024-01-15",
      expectedEndDate: "2024-12-15",
    },
    status: "in_progress",
    createdBy: "gov1",
    assignedAgency: "agency1",
    bids: [],
    milestones: [
      {
        id: "m1",
        title: "Foundation Work",
        description: "Complete foundation and basement construction",
        expectedDate: "2024-03-15",
        actualDate: "2024-03-10",
        status: "completed",
        progress: 100,
        photos: [],
        reports: [],
      },
      {
        id: "m2",
        title: "Structure Construction",
        description: "Complete building structure up to roof level",
        expectedDate: "2024-07-15",
        status: "in_progress",
        progress: 65,
        photos: [],
        reports: [],
      },
    ],
    expenses: [
      {
        id: "e1",
        category: "Materials",
        amount: 5000000,
        description: "Cement, steel, and construction materials",
        date: "2024-02-01",
        approvedBy: "gov1",
      },
    ],
    documents: [],
    communications: [],
  },
]

export function getUserPermissions(role: "government" | "agency"): string[] {
  if (role === "government") {
    return ["create_project", "assign_project", "view_all_projects", "approve_budget", "manage_agencies"]
  }
  return ["bid_project", "view_assigned_projects", "upload_progress", "submit_reports"]
}

export function hasPermission(user: User, permission: string): boolean {
  return user.permissions.includes(permission)
}
