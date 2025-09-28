"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Upload, Camera, FileImage, Calendar, User } from "lucide-react"

interface ProjectLocation {
  id: string
  name: string
  district: string
  state: string
  coordinates: { lat: number; lng: number }
  status: "planning" | "in-progress" | "completed" | "delayed"
  agency: string
  progress: number
  budget: number
  photos: ProjectPhoto[]
  reports: ProjectReport[]
}

interface ProjectPhoto {
  id: string
  url: string
  caption: string
  uploadedBy: string
  uploadedAt: string
  location: { lat: number; lng: number }
  category: "progress" | "milestone" | "issue" | "completion"
}

interface ProjectReport {
  id: string
  title: string
  description: string
  uploadedBy: string
  uploadedAt: string
  attachments: string[]
  category: "weekly" | "monthly" | "milestone" | "issue"
}

const mockProjects: ProjectLocation[] = [
  {
    id: "1",
    name: "Girls Hostel - Sector 15",
    district: "Chandigarh",
    state: "Chandigarh",
    coordinates: { lat: 30.7333, lng: 76.7794 },
    status: "in-progress",
    agency: "BuildTech Solutions",
    progress: 65,
    budget: 2500000,
    photos: [
      {
        id: "p1",
        url: "/construction-foundation.png",
        caption: "Foundation work completed",
        uploadedBy: "Site Engineer",
        uploadedAt: "2024-01-15",
        location: { lat: 30.7333, lng: 76.7794 },
        category: "progress",
      },
    ],
    reports: [
      {
        id: "r1",
        title: "Weekly Progress Report - Week 8",
        description: "Foundation work completed, starting wall construction",
        uploadedBy: "Project Manager",
        uploadedAt: "2024-01-15",
        attachments: ["progress-report-w8.pdf"],
        category: "weekly",
      },
    ],
  },
  {
    id: "2",
    name: "Boys Hostel - Model Town",
    district: "Ludhiana",
    state: "Punjab",
    coordinates: { lat: 30.901, lng: 75.8573 },
    status: "completed",
    agency: "Punjab Constructions",
    progress: 100,
    budget: 3200000,
    photos: [],
    reports: [],
  },
]

export default function GeographicMapping() {
  const [selectedProject, setSelectedProject] = useState<ProjectLocation | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [newPhoto, setNewPhoto] = useState({
    caption: "",
    category: "progress" as ProjectPhoto["category"],
  })
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    category: "weekly" as ProjectReport["category"],
  })

  const filteredProjects = mockProjects.filter((project) => {
    const districtMatch = selectedDistrict === "all" || project.district === selectedDistrict
    const statusMatch = selectedStatus === "all" || project.status === selectedStatus
    return districtMatch && statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "delayed":
        return "bg-red-500"
      case "planning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const handlePhotoUpload = () => {
    // Mock photo upload
    console.log("[v0] Photo upload:", newPhoto)
    setUploadDialogOpen(false)
    setNewPhoto({ caption: "", category: "progress" })
  }

  const handleReportUpload = () => {
    // Mock report upload
    console.log("[v0] Report upload:", newReport)
    setNewReport({ title: "", description: "", category: "weekly" })
  }

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geographic Project Mapping
          </CardTitle>
          <CardDescription>Interactive map view of all hostel projects across districts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="district-filter">Filter by District</Label>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                  <SelectItem value="Ludhiana">Ludhiana</SelectItem>
                  <SelectItem value="Amritsar">Amritsar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mock Map Area */}
          <div className="relative bg-slate-100 rounded-lg h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
            <div className="absolute inset-0 p-4">
              <div className="text-sm text-slate-600 mb-4">Interactive Map View</div>

              {/* Project Markers */}
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 20}%`,
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${getStatusColor(project.status)} border-2 border-white shadow-lg`}
                  ></div>
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                    {project.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Delayed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Planning</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      {selectedProject && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{selectedProject.name}</CardTitle>
                <CardDescription>
                  {selectedProject.district}, {selectedProject.state} • {selectedProject.agency}
                </CardDescription>
              </div>
              <Badge variant={selectedProject.status === "completed" ? "default" : "secondary"}>
                {selectedProject.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedProject.progress}%</div>
                    <div className="text-sm text-slate-600">Progress</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{(selectedProject.budget / 100000).toFixed(1)}L
                    </div>
                    <div className="text-sm text-slate-600">Budget</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedProject.photos.length}</div>
                    <div className="text-sm text-slate-600">Photos</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{selectedProject.reports.length}</div>
                    <div className="text-sm text-slate-600">Reports</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photos" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Project Photos</h3>
                  <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Project Photo</DialogTitle>
                        <DialogDescription>Add a new photo with location and progress details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="photo-upload">Select Photo</Label>
                          <Input id="photo-upload" type="file" accept="image/*" />
                        </div>
                        <div>
                          <Label htmlFor="photo-caption">Caption</Label>
                          <Input
                            id="photo-caption"
                            value={newPhoto.caption}
                            onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                            placeholder="Describe what this photo shows..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="photo-category">Category</Label>
                          <Select
                            value={newPhoto.category}
                            onValueChange={(value: ProjectPhoto["category"]) =>
                              setNewPhoto({ ...newPhoto, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="progress">Progress Update</SelectItem>
                              <SelectItem value="milestone">Milestone</SelectItem>
                              <SelectItem value="issue">Issue/Problem</SelectItem>
                              <SelectItem value="completion">Completion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handlePhotoUpload} className="w-full">
                          Upload Photo
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProject.photos.map((photo) => (
                    <Card key={photo.id}>
                      <CardContent className="p-4">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.caption}
                          className="w-full h-48 object-cover rounded-lg mb-3"
                        />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{photo.caption}</p>
                          <div className="flex justify-between items-center text-xs text-slate-600">
                            <span>{photo.uploadedBy}</span>
                            <span>{photo.uploadedAt}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {photo.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Project Reports</h3>
                  <Button size="sm">
                    <FileImage className="h-4 w-4 mr-2" />
                    Upload Report
                  </Button>
                </div>

                <div className="space-y-4">
                  {selectedProject.reports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{report.title}</h4>
                          <Badge variant="outline">{report.category}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{report.description}</p>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {report.uploadedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.uploadedAt}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo Upload */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        Upload Photos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="bulk-photos">Select Multiple Photos</Label>
                        <Input id="bulk-photos" type="file" accept="image/*" multiple />
                      </div>
                      <div>
                        <Label htmlFor="bulk-caption">Default Caption</Label>
                        <Input id="bulk-caption" placeholder="Progress update for week..." />
                      </div>
                      <Button className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photos
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Report Upload */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileImage className="h-5 w-5" />
                        Upload Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="report-title">Report Title</Label>
                        <Input
                          id="report-title"
                          value={newReport.title}
                          onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                          placeholder="Weekly Progress Report..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="report-description">Description</Label>
                        <Textarea
                          id="report-description"
                          value={newReport.description}
                          onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                          placeholder="Detailed progress description..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="report-category">Category</Label>
                        <Select
                          value={newReport.category}
                          onValueChange={(value: ProjectReport["category"]) =>
                            setNewReport({ ...newReport, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly Report</SelectItem>
                            <SelectItem value="monthly">Monthly Report</SelectItem>
                            <SelectItem value="milestone">Milestone Report</SelectItem>
                            <SelectItem value="issue">Issue Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="report-files">Attach Files</Label>
                        <Input id="report-files" type="file" multiple />
                      </div>
                      <Button onClick={handleReportUpload} className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
