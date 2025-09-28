"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Building2,
  Users,
  IndianRupee,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react"

const projectStatusData = [
  { name: "Planning", value: 3, color: "#3b82f6" },
  { name: "In Progress", value: 8, color: "#f59e0b" },
  { name: "Completed", value: 12, color: "#10b981" },
  { name: "Delayed", value: 2, color: "#ef4444" },
]

const budgetData = [
  { month: "Jan", allocated: 45, spent: 38 },
  { month: "Feb", allocated: 52, spent: 45 },
  { month: "Mar", allocated: 48, spent: 42 },
  { month: "Apr", allocated: 61, spent: 55 },
  { month: "May", allocated: 55, spent: 48 },
  { month: "Jun", allocated: 67, spent: 58 },
]

const districtData = [
  { district: "Mumbai", projects: 8, budget: 125 },
  { district: "Pune", projects: 6, budget: 98 },
  { district: "Nashik", projects: 4, budget: 67 },
  { district: "Nagpur", projects: 5, budget: 89 },
  { district: "Aurangabad", projects: 2, budget: 34 },
]

const recentProjects = [
  {
    id: "1",
    title: "Girls Hostel - Pune District",
    status: "in_progress",
    progress: 65,
    budget: 25000000,
    spent: 16250000,
    agency: "Modern Construction Co.",
    startDate: "2024-01-15",
    expectedEnd: "2024-12-15",
    location: "Pune",
    risk: "low",
  },
  {
    id: "2",
    title: "Boys Hostel - Mumbai District",
    status: "delayed",
    progress: 45,
    budget: 32000000,
    spent: 18500000,
    agency: "BuildTech Solutions",
    startDate: "2023-11-01",
    expectedEnd: "2024-10-31",
    location: "Mumbai",
    risk: "high",
  },
  {
    id: "3",
    title: "Mixed Hostel - Nashik District",
    status: "completed",
    progress: 100,
    budget: 18000000,
    spent: 17200000,
    agency: "Elite Builders",
    startDate: "2023-06-01",
    expectedEnd: "2024-05-31",
    location: "Nashik",
    risk: "low",
  },
]

export function GovernmentDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
        return "bg-blue-500"
      case "delayed":
        return "bg-red-500"
      case "planning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Risk</Badge>
      case "low":
        return <Badge variant="outline">Low Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹413Cr</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">₹286Cr</span> utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agencies</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">8</span> with active projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="agencies">Agencies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
                <CardDescription>Current status of all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4">
                  {projectStatusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Utilization Trend</CardTitle>
                <CardDescription>Monthly allocated vs spent (in Crores)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" />
                    <Bar dataKey="spent" fill="#10b981" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* District-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle>District-wise Performance</CardTitle>
              <CardDescription>Projects and budget allocation by district</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtData.map((district) => (
                  <div key={district.district} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{district.district}</p>
                        <p className="text-sm text-muted-foreground">{district.projects} projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{district.budget}Cr</p>
                      <p className="text-sm text-muted-foreground">Budget allocated</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Portfolio</h3>
            <Button>Create New Project</Button>
          </div>

          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {project.location} • {project.agency}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getRiskBadge(project.risk)}
                      <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                        {project.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="flex-1" />
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Budget Utilization</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(project.spent / project.budget) * 100} className="flex-1" />
                        <span className="text-sm font-medium">
                          {Math.round((project.spent / project.budget) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Timeline</p>
                      <p className="text-sm text-muted-foreground">
                        {project.startDate} to {project.expectedEnd}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Total Budget:</span>
                      <p>₹{(project.budget / 10000000).toFixed(1)}Cr</p>
                    </div>
                    <div>
                      <span className="font-medium">Amount Spent:</span>
                      <p>₹{(project.spent / 10000000).toFixed(1)}Cr</p>
                    </div>
                    <div>
                      <span className="font-medium">Remaining:</span>
                      <p>₹{((project.budget - project.spent) / 10000000).toFixed(1)}Cr</p>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                        <span className="capitalize">{project.status.replace("_", " ")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Timeline
                    </Button>
                    <Button variant="outline" size="sm">
                      <IndianRupee className="mr-2 h-4 w-4" />
                      Financials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Project completion rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="allocated" stroke="#3b82f6" name="Projects Started" />
                    <Line type="monotone" dataKey="spent" stroke="#10b981" name="Projects Completed" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Projects categorized by risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg border-red-200 bg-red-50">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-900">High Risk Projects</p>
                        <p className="text-sm text-red-700">Require immediate attention</p>
                      </div>
                    </div>
                    <Badge variant="destructive">2</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg border-yellow-200 bg-yellow-50">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-900">Medium Risk Projects</p>
                        <p className="text-sm text-yellow-700">Monitor closely</p>
                      </div>
                    </div>
                    <Badge variant="secondary">5</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg border-green-200 bg-green-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Low Risk Projects</p>
                        <p className="text-sm text-green-700">On track</p>
                      </div>
                    </div>
                    <Badge variant="outline">18</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agencies" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Modern Construction Co.", rating: 4.5, projects: 8, onTime: 87 },
              { name: "BuildTech Solutions", rating: 4.2, projects: 6, onTime: 83 },
              { name: "Elite Builders", rating: 4.7, projects: 5, onTime: 92 },
              { name: "Infrastructure Pro", rating: 4.1, projects: 4, onTime: 78 },
            ].map((agency) => (
              <Card key={agency.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{agency.name}</CardTitle>
                  <CardDescription>Construction Agency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rating:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{agency.rating}/5</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${i < Math.floor(agency.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Projects:</span>
                    <span className="font-medium">{agency.projects}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">On-time Delivery:</span>
                    <span className="font-medium">{agency.onTime}%</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
