"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, MessageCircle, AlertTriangle, CheckCircle, Clock, IndianRupee, Building2, X } from "lucide-react"
import { format } from "date-fns"

interface Notification {
  id: string
  type: "message" | "project" | "budget" | "system" | "milestone" | "alert"
  title: string
  description: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
  projectId?: string
  senderId?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from Priya Sharma",
    description: "Foundation work completed ahead of schedule. Please review the progress report.",
    timestamp: "2024-06-20T14:30:00Z",
    read: false,
    priority: "medium",
    projectId: "proj1",
    senderId: "agency1",
  },
  {
    id: "2",
    type: "milestone",
    title: "Project milestone completed",
    description: "Foundation work for Girls Hostel - Pune District has been completed successfully.",
    timestamp: "2024-06-20T12:15:00Z",
    read: false,
    priority: "high",
    projectId: "proj1",
  },
  {
    id: "3",
    type: "budget",
    title: "Budget approval required",
    description: "Additional materials budget of ₹2.5Cr requires your approval for Boys Hostel - Mumbai.",
    timestamp: "2024-06-20T10:45:00Z",
    read: true,
    priority: "high",
    projectId: "proj2",
  },
  {
    id: "4",
    type: "alert",
    title: "Project delay warning",
    description: "Boys Hostel - Mumbai project is at risk of delay due to material shortage.",
    timestamp: "2024-06-19T16:20:00Z",
    read: true,
    priority: "high",
    projectId: "proj2",
  },
  {
    id: "5",
    type: "project",
    title: "New bid received",
    description: "Elite Builders has submitted a bid for Mixed Hostel - Nashik District project.",
    timestamp: "2024-06-19T14:10:00Z",
    read: true,
    priority: "medium",
    projectId: "proj3",
  },
  {
    id: "6",
    type: "system",
    title: "System maintenance scheduled",
    description: "Scheduled maintenance on June 25th from 2:00 AM to 4:00 AM IST.",
    timestamp: "2024-06-18T09:00:00Z",
    read: true,
    priority: "low",
  },
]

export function NotificationCenter({ userRole }: { userRole: "government" | "agency" }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedTab, setSelectedTab] = useState("all")

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-5 w-5 text-blue-600" />
      case "project":
        return <Building2 className="h-5 w-5 text-green-600" />
      case "budget":
        return <IndianRupee className="h-5 w-5 text-purple-600" />
      case "milestone":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "system":
        return <Bell className="h-5 w-5 text-gray-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-gray-500 bg-gray-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const filterNotifications = (tab: string) => {
    switch (tab) {
      case "unread":
        return notifications.filter((n) => !n.read)
      case "messages":
        return notifications.filter((n) => n.type === "message")
      case "projects":
        return notifications.filter((n) => ["project", "milestone", "budget", "alert"].includes(n.type))
      case "system":
        return notifications.filter((n) => n.type === "system")
      default:
        return notifications
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Stay updated with project activities and messages</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread{" "}
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab}>
            <ScrollArea className="h-[500px]">
              <div className="space-y-3">
                {filterNotifications(selectedTab).length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">No notifications</p>
                    <p className="text-muted-foreground">You're all caught up!</p>
                  </div>
                ) : (
                  filterNotifications(selectedTab).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${getPriorityColor(
                        notification.priority,
                      )} ${!notification.read ? "border-2 border-blue-200" : "border border-gray-200"}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p
                                className={`font-medium text-sm ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {format(new Date(notification.timestamp), "MMM dd, HH:mm")}
                                  </span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {notification.type}
                                </Badge>
                                <Badge
                                  variant={notification.priority === "high" ? "destructive" : "secondary"}
                                  className="text-xs"
                                >
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {notification.actionUrl && (
                            <div className="mt-3">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
