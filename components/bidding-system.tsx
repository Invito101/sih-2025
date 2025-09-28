"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, IndianRupee, Clock, Users, FileText, Award } from "lucide-react"
import { format } from "date-fns"

interface Project {
  id: string
  title: string
  description: string
  location: { state: string; district: string }
  budget: number
  expectedDuration: number
  startDate: string
  endDate: string
  capacity: number
  amenities: string[]
  requirements: string
  status: "posted" | "bidding" | "assigned"
  bidsCount: number
  postedDate: string
}

interface Bid {
  id: string
  projectId: string
  agencyName: string
  proposedBudget: number
  timeline: number
  experience: string
  proposal: string
  submittedAt: string
  status: "pending" | "accepted" | "rejected"
  agencyRating: number
  pastProjects: number
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Girls Hostel - Pune District",
    description:
      "Construction of 200-capacity girls hostel with modern amenities including Wi-Fi, 24/7 security, mess facility, and recreational areas.",
    location: { state: "Maharashtra", district: "Pune" },
    budget: 25000000,
    expectedDuration: 12,
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    capacity: 200,
    amenities: ["Wi-Fi Internet", "24/7 Security", "Mess/Dining Hall", "Recreation Room", "Study Hall"],
    requirements: "Must comply with fire safety norms and accessibility standards",
    status: "bidding",
    bidsCount: 5,
    postedDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Boys Hostel - Nashik District",
    description: "Modern boys hostel facility for 150 students with solar power and water purification systems.",
    location: { state: "Maharashtra", district: "Nashik" },
    budget: 18000000,
    expectedDuration: 10,
    startDate: "2024-04-01",
    endDate: "2025-01-31",
    capacity: 150,
    amenities: ["Solar Power", "Water Purification", "Parking Area", "Medical Room"],
    requirements: "Green building certification preferred",
    status: "posted",
    bidsCount: 2,
    postedDate: "2024-01-20",
  },
]

const mockBids: Bid[] = [
  {
    id: "1",
    projectId: "1",
    agencyName: "Modern Construction Co.",
    proposedBudget: 24500000,
    timeline: 11,
    experience: "15 years in educational infrastructure",
    proposal: "We propose a phased construction approach with emphasis on quality materials and timely delivery.",
    submittedAt: "2024-01-18",
    status: "pending",
    agencyRating: 4.5,
    pastProjects: 23,
  },
  {
    id: "2",
    projectId: "1",
    agencyName: "BuildTech Solutions",
    proposedBudget: 26000000,
    timeline: 12,
    experience: "12 years specializing in hostel construction",
    proposal: "Comprehensive solution with modern amenities and sustainable construction practices.",
    submittedAt: "2024-01-19",
    status: "pending",
    agencyRating: 4.2,
    pastProjects: 18,
  },
]

export function BiddingSystem({ userRole }: { userRole: "government" | "agency" }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [bidForm, setBidForm] = useState({
    proposedBudget: "",
    timeline: "",
    experience: "",
    proposal: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) return

    setIsSubmitting(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Bid submitted:", { projectId: selectedProject.id, ...bidForm })
    alert("Bid submitted successfully!")

    setBidForm({
      proposedBudget: "",
      timeline: "",
      experience: "",
      proposal: "",
    })
    setSelectedProject(null)
    setIsSubmitting(false)
  }

  const handleAcceptBid = async (bidId: string) => {
    console.log("[v0] Accepting bid:", bidId)
    alert("Bid accepted! Project has been assigned to the agency.")
  }

  const handleRejectBid = async (bidId: string) => {
    console.log("[v0] Rejecting bid:", bidId)
    alert("Bid rejected.")
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {userRole === "government" ? "Project Bids Management" : "Available Projects"}
        </h1>
        <p className="text-muted-foreground">
          {userRole === "government"
            ? "Review and manage bids for your posted projects"
            : "Browse available projects and submit your bids"}
        </p>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">{userRole === "government" ? "My Projects" : "Available Projects"}</TabsTrigger>
          {userRole === "government" && <TabsTrigger value="bids">Received Bids</TabsTrigger>}
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {project.location.district}, {project.location.state}
                      </CardDescription>
                    </div>
                    <Badge variant={project.status === "posted" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <span>₹{(project.budget / 10000000).toFixed(1)}Cr</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{project.expectedDuration} months</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{project.capacity} capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{project.bidsCount} bids</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {project.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{project.title}</DialogTitle>
                          <DialogDescription>Posted on {format(new Date(project.postedDate), "PPP")}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Budget</h4>
                              <p className="text-sm">₹{(project.budget / 10000000).toFixed(2)} Crores</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Timeline</h4>
                              <p className="text-sm">{project.expectedDuration} months</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Required Amenities</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.amenities.map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {project.requirements && (
                            <div>
                              <h4 className="font-semibold mb-2">Additional Requirements</h4>
                              <p className="text-sm text-muted-foreground">{project.requirements}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {userRole === "agency" && project.status !== "assigned" && (
                      <Button size="sm" onClick={() => setSelectedProject(project)} className="flex-1">
                        Submit Bid
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {userRole === "government" && (
          <TabsContent value="bids" className="space-y-4">
            <div className="space-y-4">
              {mockBids.map((bid) => {
                const project = mockProjects.find((p) => p.id === bid.projectId)
                return (
                  <Card key={bid.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{bid.agencyName}</CardTitle>
                          <CardDescription>Bid for: {project?.title}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{bid.agencyRating}/5</span>
                          </div>
                          <Badge variant={bid.status === "pending" ? "default" : "secondary"}>{bid.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Proposed Budget:</span>
                          <p>₹{(bid.proposedBudget / 10000000).toFixed(2)}Cr</p>
                        </div>
                        <div>
                          <span className="font-medium">Timeline:</span>
                          <p>{bid.timeline} months</p>
                        </div>
                        <div>
                          <span className="font-medium">Past Projects:</span>
                          <p>{bid.pastProjects} completed</p>
                        </div>
                      </div>

                      <div>
                        <span className="font-medium">Experience:</span>
                        <p className="text-sm text-muted-foreground mt-1">{bid.experience}</p>
                      </div>

                      <div>
                        <span className="font-medium">Proposal:</span>
                        <p className="text-sm text-muted-foreground mt-1">{bid.proposal}</p>
                      </div>

                      {bid.status === "pending" && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptBid(bid.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept Bid
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleRejectBid(bid.id)}>
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Bid Submission Dialog */}
      {selectedProject && userRole === "agency" && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Bid for {selectedProject.title}</DialogTitle>
              <DialogDescription>Provide your proposal details for this project</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="proposedBudget">Proposed Budget (₹)</Label>
                  <Input
                    id="proposedBudget"
                    type="number"
                    placeholder="Enter your budget"
                    value={bidForm.proposedBudget}
                    onChange={(e) => setBidForm({ ...bidForm, proposedBudget: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline (months)</Label>
                  <Input
                    id="timeline"
                    type="number"
                    placeholder="Project duration"
                    value={bidForm.timeline}
                    onChange={(e) => setBidForm({ ...bidForm, timeline: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe your relevant experience and past projects..."
                  value={bidForm.experience}
                  onChange={(e) => setBidForm({ ...bidForm, experience: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal">Detailed Proposal</Label>
                <Textarea
                  id="proposal"
                  placeholder="Provide a detailed proposal including methodology, materials, and approach..."
                  value={bidForm.proposal}
                  onChange={(e) => setBidForm({ ...bidForm, proposal: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Submit Bid"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setSelectedProject(null)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
