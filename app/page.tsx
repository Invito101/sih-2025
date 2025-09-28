"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Shield, MapPin, MessageCircle, Bell, QrCode, IndianRupee, Camera } from "lucide-react"
import { ProjectPosting } from "@/components/project-posting"
import { BiddingSystem } from "@/components/bidding-system"
import { GovernmentDashboard } from "@/components/government-dashboard"
import { AgencyDashboard } from "@/components/agency-dashboard"
import { CommunicationSystem } from "@/components/communication-system"
import { NotificationCenter } from "@/components/notification-center"
import GeographicMapping from "@/components/geographic-mapping"
import FinancialTracking from "@/components/financial-tracking"
import QRCodeSystem from "@/components/qr-code-system"

type UserRole = "government" | "agency"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  organization: string
  state?: string
  district?: string
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [role, setRole] = useState<UserRole>("government")
  const [user, setUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState<string>("dashboard")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    organization: "",
    state: "",
    district: "",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication
    const mockUser: User = {
      id: "1",
      name: formData.name || "Demo User",
      email: formData.email,
      role: role,
      organization: formData.organization || (role === "government" ? "State Government" : "Construction Agency"),
      state: formData.state || "Maharashtra",
      district: formData.district || "Mumbai",
    }
    setUser(mockUser)
  }

  const handleLogout = () => {
    setUser(null)
    setFormData({
      email: "",
      password: "",
      name: "",
      organization: "",
      state: "",
      district: "",
    })
    setCurrentView("dashboard") // Reset view on logout
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">PM-AJAY Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Project Management & Monitoring System</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setCurrentView("messages")} className="relative">
                  <MessageCircle className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setCurrentView("notifications")} className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </Button>
                <Badge variant={user.role === "government" ? "default" : "secondary"} className="px-3 py-1">
                  {user.role === "government" ? "Government" : "Agency"}
                </Badge>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === "dashboard" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {user.organization} • {user.state} {user.district && `• ${user.district}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹45.2Cr</div>
                    <p className="text-xs text-muted-foreground">Allocated funds</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {user.role === "government" ? "Agencies" : "Assigned Projects"}
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.role === "government" ? "8" : "5"}</div>
                    <p className="text-xs text-muted-foreground">
                      {user.role === "government" ? "Registered agencies" : "In progress"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-xs text-muted-foreground">On-time delivery</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates from your projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">New project proposal submitted</p>
                          <p className="text-xs text-muted-foreground">Hostel construction in Pune district</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Project milestone completed</p>
                          <p className="text-xs text-muted-foreground">Foundation work finished ahead of schedule</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Budget approval pending</p>
                          <p className="text-xs text-muted-foreground">Additional funds requested for Phase 2</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks for your role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3">
                      {user.role === "government" ? (
                        <>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("create-project")}
                          >
                            <Building2 className="mr-2 h-4 w-4" />
                            Create New Project Posting
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("manage-bids")}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Review Agency Bids
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("detailed-dashboard")}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            View Detailed Dashboard
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("geographic-mapping")}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            Geographic Mapping
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("financial-tracking")}
                          >
                            <IndianRupee className="mr-2 h-4 w-4" />
                            Financial Tracking
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("qr-system")}
                          >
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Code Management
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("messages")}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Open Messages
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("browse-projects")}
                          >
                            <Building2 className="mr-2 h-4 w-4" />
                            Browse Available Projects
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("detailed-dashboard")}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            View Project Dashboard
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("geographic-mapping")}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            Project Mapping
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("financial-tracking")}
                          >
                            <IndianRupee className="mr-2 h-4 w-4" />
                            Expense Tracking
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("qr-system")}
                          >
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Scanner & Upload
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("messages")}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Open Messages
                          </Button>
                          <Button
                            className="justify-start bg-transparent"
                            variant="outline"
                            onClick={() => setCurrentView("qr-system")}
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Upload Work Photos
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {currentView === "messages" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Messages & Communication</h2>
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
              <CommunicationSystem currentUser={user} />
            </div>
          )}

          {currentView === "notifications" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Notification Center</h2>
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
              <NotificationCenter userRole={user.role} />
            </div>
          )}

          {currentView === "detailed-dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {user.role === "government" ? "Government Dashboard" : "Agency Dashboard"}
                </h2>
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Back to Overview
                </Button>
              </div>
              {user.role === "government" ? <GovernmentDashboard /> : <AgencyDashboard />}
            </div>
          )}

          {currentView === "create-project" && user.role === "government" && (
            <div className="mt-8">
              <ProjectPosting />
            </div>
          )}

          {(currentView === "manage-bids" || currentView === "browse-projects") && (
            <div className="mt-8">
              <BiddingSystem userRole={user.role} />
            </div>
          )}

          {currentView === "geographic-mapping" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Geographic Mapping & File Uploads</h2>
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
              <GeographicMapping />
            </div>
          )}

          {currentView === "financial-tracking" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Financial Tracking & Analytics</h2>
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
              <FinancialTracking />
            </div>
          )}

          {currentView === "qr-system" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">QR Code System & Mobile Features</h2>
                <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
              <QRCodeSystem />
            </div>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-600 p-3 rounded-full w-fit mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">PM-AJAY Dashboard</CardTitle>
          <CardDescription>Project Management & Monitoring System for Hostel Development</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">State/UT Government</SelectItem>
                  <SelectItem value="agency">Implementing Agency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    placeholder={role === "government" ? "State/UT Government" : "Agency Name"}
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State/UT</Label>
                    <Input
                      id="state"
                      placeholder="State/UT"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="District"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center">
              <Button type="button" variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm">
                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
