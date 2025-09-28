"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  QrCode,
  Smartphone,
  Camera,
  Download,
  MapPin,
  IndianRupee,
  Calendar,
  Users,
  Building,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface QRCodeData {
  id: string
  projectId: string
  projectName: string
  location: string
  qrType: "project-info" | "photo-upload" | "fund-access" | "worker-checkin"
  generatedAt: string
  expiresAt: string
  isActive: boolean
  scanCount: number
}

interface WorkerAccess {
  workerId: string
  workerName: string
  role: string
  permissions: string[]
  lastScan: string
  totalScans: number
}

interface MobileUpload {
  id: string
  workerId: string
  workerName: string
  projectId: string
  type: "photo" | "report" | "checkin" | "issue"
  content: string
  location: { lat: number; lng: number }
  timestamp: string
  status: "uploaded" | "processing" | "approved" | "rejected"
}

const mockQRCodes: QRCodeData[] = [
  {
    id: "qr1",
    projectId: "1",
    projectName: "Girls Hostel - Sector 15",
    location: "Chandigarh",
    qrType: "photo-upload",
    generatedAt: "2024-01-15",
    expiresAt: "2024-12-31",
    isActive: true,
    scanCount: 45,
  },
  {
    id: "qr2",
    projectId: "1",
    projectName: "Girls Hostel - Sector 15",
    location: "Chandigarh",
    qrType: "project-info",
    generatedAt: "2024-01-15",
    expiresAt: "2024-12-31",
    isActive: true,
    scanCount: 23,
  },
]

const mockWorkerAccess: WorkerAccess[] = [
  {
    workerId: "w1",
    workerName: "Rajesh Kumar",
    role: "Site Engineer",
    permissions: ["photo-upload", "project-info", "fund-access"],
    lastScan: "2024-01-22 14:30",
    totalScans: 12,
  },
  {
    workerId: "w2",
    workerName: "Priya Singh",
    role: "Construction Worker",
    permissions: ["photo-upload", "checkin"],
    lastScan: "2024-01-22 09:15",
    totalScans: 8,
  },
]

const mockMobileUploads: MobileUpload[] = [
  {
    id: "mu1",
    workerId: "w1",
    workerName: "Rajesh Kumar",
    projectId: "1",
    type: "photo",
    content: "Foundation work progress - Day 5",
    location: { lat: 30.7333, lng: 76.7794 },
    timestamp: "2024-01-22 14:30",
    status: "approved",
  },
  {
    id: "mu2",
    workerId: "w2",
    workerName: "Priya Singh",
    projectId: "1",
    type: "issue",
    content: "Material shortage - cement bags",
    location: { lat: 30.7333, lng: 76.7794 },
    timestamp: "2024-01-22 11:45",
    status: "processing",
  },
]

export default function QRCodeSystem() {
  const [selectedProject, setSelectedProject] = useState("1")
  const [newQRCode, setNewQRCode] = useState({
    type: "photo-upload" as QRCodeData["qrType"],
    expiryDays: "365",
  })
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null)

  const generateQRCode = () => {
    console.log("[v0] Generating QR code:", newQRCode)
    setQrDialogOpen(false)
    setNewQRCode({ type: "photo-upload", expiryDays: "365" })
  }

  const getQRTypeIcon = (type: string) => {
    switch (type) {
      case "photo-upload":
        return <Camera className="h-4 w-4" />
      case "project-info":
        return <Building className="h-4 w-4" />
      case "fund-access":
        return <IndianRupee className="h-4 w-4" />
      case "worker-checkin":
        return <Users className="h-4 w-4" />
      default:
        return <QrCode className="h-4 w-4" />
    }
  }

  const getQRTypeColor = (type: string) => {
    switch (type) {
      case "photo-upload":
        return "bg-blue-50 text-blue-600"
      case "project-info":
        return "bg-green-50 text-green-600"
      case "fund-access":
        return "bg-purple-50 text-purple-600"
      case "worker-checkin":
        return "bg-orange-50 text-orange-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50"
      case "processing":
        return "text-yellow-600 bg-yellow-50"
      case "rejected":
        return "text-red-600 bg-red-50"
      case "uploaded":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      {/* QR Code Management Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                QR Code Management System
              </CardTitle>
              <CardDescription>Generate and manage QR codes for field workers and project access</CardDescription>
            </div>
            <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate New QR Code</DialogTitle>
                  <DialogDescription>Create a QR code for specific project functionality</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="qr-type">QR Code Type</Label>
                    <Select
                      value={newQRCode.type}
                      onValueChange={(value: QRCodeData["qrType"]) => setNewQRCode({ ...newQRCode, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photo-upload">Photo Upload</SelectItem>
                        <SelectItem value="project-info">Project Information</SelectItem>
                        <SelectItem value="fund-access">Fund Access</SelectItem>
                        <SelectItem value="worker-checkin">Worker Check-in</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="expiry-days">Expiry (Days)</Label>
                    <Select
                      value={newQRCode.expiryDays}
                      onValueChange={(value) => setNewQRCode({ ...newQRCode, expiryDays: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="180">180 Days</SelectItem>
                        <SelectItem value="365">1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={generateQRCode} className="w-full">
                    Generate QR Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Main QR System Dashboard */}
      <Tabs defaultValue="qr-codes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="qr-codes">QR Codes</TabsTrigger>
          <TabsTrigger value="mobile-access">Mobile Access</TabsTrigger>
          <TabsTrigger value="uploads">Mobile Uploads</TabsTrigger>
          <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
        </TabsList>

        <TabsContent value="qr-codes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockQRCodes.map((qr) => (
              <Card
                key={qr.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedQR(qr)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={getQRTypeColor(qr.qrType)}>
                      {getQRTypeIcon(qr.qrType)}
                      <span className="ml-1 capitalize">{qr.qrType.replace("-", " ")}</span>
                    </Badge>
                    <Badge variant={qr.isActive ? "default" : "secondary"}>{qr.isActive ? "Active" : "Inactive"}</Badge>
                  </div>

                  {/* Mock QR Code Visual */}
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-3 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }, (_, i) => (
                        <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">{qr.projectName}</h4>
                    <p className="text-sm text-slate-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {qr.location}
                    </p>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Scans: {qr.scanCount}</span>
                      <span>Expires: {qr.expiresAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* QR Code Details Modal */}
          {selectedQR && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>QR Code Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Project</Label>
                      <p className="font-medium">{selectedQR.projectName}</p>
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Badge className={getQRTypeColor(selectedQR.qrType)}>
                        {getQRTypeIcon(selectedQR.qrType)}
                        <span className="ml-1 capitalize">{selectedQR.qrType.replace("-", " ")}</span>
                      </Badge>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Badge variant={selectedQR.isActive ? "default" : "secondary"}>
                        {selectedQR.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div>
                      <Label>Scan Count</Label>
                      <p className="font-medium">{selectedQR.scanCount} scans</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                      <div className="grid grid-cols-12 gap-1">
                        {Array.from({ length: 144 }, (_, i) => (
                          <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Smartphone className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="mobile-access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Worker Mobile Access</CardTitle>
              <CardDescription>Manage field worker permissions and access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWorkerAccess.map((worker) => (
                  <Card key={worker.workerId}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{worker.workerName}</h4>
                          <p className="text-sm text-slate-600">{worker.role}</p>
                        </div>
                        <Badge variant="outline">{worker.totalScans} scans</Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs">Permissions</Label>
                          <div className="flex gap-1 mt-1">
                            {worker.permissions.map((permission) => (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {permission.replace("-", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Last scan: {worker.lastScan}</span>
                          <span>Total scans: {worker.totalScans}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uploads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Uploads</CardTitle>
              <CardDescription>Photos and reports uploaded by field workers via QR codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMobileUploads.map((upload) => (
                  <Card key={upload.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            {upload.type === "photo" && <Camera className="h-4 w-4 text-blue-600" />}
                            {upload.type === "report" && <Building className="h-4 w-4 text-green-600" />}
                            {upload.type === "issue" && <AlertCircle className="h-4 w-4 text-red-600" />}
                            {upload.type === "checkin" && <CheckCircle className="h-4 w-4 text-purple-600" />}
                          </div>
                          <div>
                            <h4 className="font-medium capitalize">{upload.type}</h4>
                            <p className="text-sm text-slate-600">{upload.content}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(upload.status)}>{upload.status}</Badge>
                      </div>

                      <div className="flex justify-between items-center text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {upload.workerName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {upload.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {upload.location.lat.toFixed(4)}, {upload.location.lng.toFixed(4)}
                        </span>
                      </div>

                      {upload.status === "processing" && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-green-600 bg-transparent">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scanner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Scanner</CardTitle>
              <CardDescription>Scan QR codes to access project information and upload content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                {/* Mock Camera View */}
                <div className="bg-gray-100 rounded-lg p-8 mx-auto max-w-md">
                  <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Camera view for QR scanning</p>
                    <p className="text-sm text-gray-500 mt-2">Position QR code within the frame</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full max-w-md">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera
                  </Button>

                  <div className="text-sm text-slate-600">
                    <p>Or manually enter QR code:</p>
                    <div className="flex gap-2 mt-2 max-w-md mx-auto">
                      <Input placeholder="Enter QR code..." />
                      <Button variant="outline">Scan</Button>
                    </div>
                  </div>
                </div>

                {/* Recent Scans */}
                <div className="text-left max-w-md mx-auto">
                  <h4 className="font-medium mb-3">Recent Scans</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                      <span className="text-sm">Photo Upload - Sector 15</span>
                      <span className="text-xs text-slate-500">2 min ago</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                      <span className="text-sm">Project Info - Model Town</span>
                      <span className="text-xs text-slate-500">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
