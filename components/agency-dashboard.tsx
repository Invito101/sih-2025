"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Building2, IndianRupee, Clock, Upload, Camera, FileText, MapPin, Users } from "lucide-react"

const monthlyProgress = [
  { month: "Jan", planned: 15, actual: 12 },
  { month: "Feb", planned: 25, actual: 28 },
  { month: "Mar", planned: 35, actual: 32 },
  { month: "Apr", planned: 50, actual: 48 },
  { month: "May", planned: 65, actual: 62 },
  { month: "Jun", planned: 75, actual: 78 },
]

const expenseData = [
  { category: "Materials", amount: 45, percentage: 60 },
  { category: "Labor", amount: 18, percentage: 24 },
  { category: "Equipment", amount: 8, percentage: 11 },
  { category: "Other", amount: 4, percentage: 5 },
]

const assignedProjects = [
  {
    id: "1",
    title: "Girls Hostel - Pune District",
    status: "in_progress",
    progress: 65,
    budget: 25000000,
    spent: 16250000,
    startDate: "2024-01-15",
    expectedEnd: "2024-12-15",
    location: "Pune",
    milestones: [
      { name: "Foundation", status: "completed", date: "2024-03-15" },
      { name: "Structure", status: "in_progress", date: "2024-07-15" },
      { name: "Finishing", status: "pending", date: "2024-11-15" },
    ],
    nextDeadline: "2024-07-15",
    team: 25,
    lastUpdate: "2024-06-20",
  },
  {
    id: "2",
    title: "Boys Hostel - Nashik District",
    status: "planning",
    progress: 5,
    budget: 18000000,
    spent: 900000,
    startDate: "2024-07-01",
    expectedEnd: "2025-05-31",
    location: "Nashik",
    milestones: [
      { name: "Site Preparation", status: "in_progress", date: "2024-08-01" },
      { name: "Foundation", status: "pending", date: "2024-10-01" },
      { name: "Structure", status: "pending", date: "2025-02-01" },
    ],
    nextDeadline: "2024-08-01",
    team: 15,
    lastUpdate: "2024-06-25",
  },
]

export function AgencyDashboard() {
  const [selectedProject, setSelectedProject] = useState(assignedProjects[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "planning":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓"
      case "in_progress":
        return "⏳"
      case "pending":
        return "⏸"
      default:
        return "○"
    }
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">2</span> ahead of schedule
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹43Cr</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">₹17.15Cr</span> utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="reports">Reports & Updates</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="space-y-4">
            {assignedProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {project.location} • {project.team} team members
                      </CardDescription>
                    </div>
                    <Badge variant={project.status === "in_progress" ? "default" : "secondary"}>
                      {project.status.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Overall Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="flex-1" />
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Budget Utilization</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(project.spent / project.budget) * 100} className="flex-1" />
                        <span className="text-sm font-medium">
                          {Math.round((project.spent / project.budget) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Next Deadline:</span>
                      <p className="text-red-600">{project.nextDeadline}</p>
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span>
                      <p>₹{(project.budget / 10000000).toFixed(1)}Cr</p>
                    </div>
                    <div>
                      <span className="font-medium">Last Update:</span>
                      <p>{project.lastUpdate}</p>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <p className="text-sm font-medium mb-2">Project Milestones</p>
                    <div className="flex gap-4">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${getStatusColor(milestone.status)}`}
                          >
                            {getMilestoneIcon(milestone.status)}
                          </div>
                          <div>
                            <p className="text-xs font-medium">{milestone.name}</p>
                            <p className="text-xs text-muted-foreground">{milestone.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Progress
                    </Button>
                    <Button variant="outline" size="sm">
                      <Camera className="mr-2 h-4 w-4" />
                      Add Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress vs Timeline</CardTitle>
                <CardDescription>Planned vs actual progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="planned" stroke="#3b82f6" name="Planned" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="actual" stroke="#10b981" name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Current project expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Progress Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Progress Updates</CardTitle>
              <CardDescription>Latest work completed and milestones achieved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "2024-06-20",
                    activity: "Foundation concrete pouring completed",
                    project: "Girls Hostel - Pune",
                    status: "completed",
                  },
                  {
                    date: "2024-06-19",
                    activity: "Electrical wiring installation - 2nd floor",
                    project: "Girls Hostel - Pune",
                    status: "in_progress",
                  },
                  {
                    date: "2024-06-18",
                    activity: "Site preparation and leveling",
                    project: "Boys Hostel - Nashik",
                    status: "completed",
                  },
                  {
                    date: "2024-06-17",
                    activity: "Material delivery and inspection",
                    project: "Girls Hostel - Pune",
                    status: "completed",
                  },
                ].map((update, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(update.status)}`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{update.activity}</p>
                      <p className="text-xs text-muted-foreground">{update.project}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{update.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Progress Report</CardTitle>
                <CardDescription>Upload weekly/monthly progress reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drag and drop your report files here, or click to browse</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Choose Files
                  </Button>
                </div>
                <Button className="w-full">Submit Report</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Photo Documentation</CardTitle>
                <CardDescription>Upload site photos and progress images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Upload photos from the construction site</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Upload Photos
                  </Button>
                </div>
                <Button className="w-full">Add to Gallery</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Previously submitted reports and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Weekly Progress Report - Week 25", date: "2024-06-20", type: "PDF", status: "approved" },
                  { name: "Material Quality Report", date: "2024-06-18", type: "PDF", status: "pending" },
                  { name: "Site Photos - Foundation Work", date: "2024-06-15", type: "Images", status: "approved" },
                  { name: "Monthly Progress Report - May", date: "2024-05-31", type: "PDF", status: "approved" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.type} • {report.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant={report.status === "approved" ? "default" : "secondary"}>{report.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Kumar", role: "Site Engineer", project: "Girls Hostel - Pune", status: "active" },
              { name: "Priya Sharma", role: "Project Manager", project: "All Projects", status: "active" },
              { name: "Amit Singh", role: "Safety Officer", project: "Girls Hostel - Pune", status: "active" },
              { name: "Sunita Devi", role: "Quality Inspector", project: "Boys Hostel - Nashik", status: "active" },
              { name: "Vikram Patel", role: "Supervisor", project: "Girls Hostel - Pune", status: "on_leave" },
              { name: "Meera Joshi", role: "Architect", project: "All Projects", status: "active" },
            ].map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Assigned to: {member.project}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Productivity and attendance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <p className="text-sm text-muted-foreground">Task Completion</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4.2/5</div>
                  <p className="text-sm text-muted-foreground">Quality Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
