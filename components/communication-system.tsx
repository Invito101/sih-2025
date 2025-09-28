"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  Paperclip,
  Phone,
  Video,
  Bell,
  Search,
  MoreVertical,
  FileText,
  ImageIcon,
  Clock,
} from "lucide-react"
import { format } from "date-fns"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: "government" | "agency"
  content: string
  timestamp: string
  projectId?: string
  attachments?: Attachment[]
  read: boolean
  type: "text" | "file" | "system"
}

interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

interface Conversation {
  id: string
  participants: Participant[]
  projectId?: string
  projectTitle?: string
  lastMessage: Message
  unreadCount: number
  type: "direct" | "project" | "group"
}

interface Participant {
  id: string
  name: string
  role: "government" | "agency"
  organization: string
  avatar?: string
  online: boolean
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    participants: [
      { id: "gov1", name: "Rajesh Kumar", role: "government", organization: "Maharashtra Govt", online: true },
      { id: "agency1", name: "Priya Sharma", role: "agency", organization: "Modern Construction", online: true },
    ],
    projectId: "proj1",
    projectTitle: "Girls Hostel - Pune District",
    lastMessage: {
      id: "msg1",
      senderId: "agency1",
      senderName: "Priya Sharma",
      senderRole: "agency",
      content: "Foundation work completed ahead of schedule. Please review the progress report.",
      timestamp: "2024-06-20T14:30:00Z",
      read: false,
      type: "text",
    },
    unreadCount: 2,
    type: "project",
  },
  {
    id: "2",
    participants: [
      { id: "gov1", name: "Rajesh Kumar", role: "government", organization: "Maharashtra Govt", online: true },
      { id: "agency2", name: "Amit Singh", role: "agency", organization: "BuildTech Solutions", online: false },
    ],
    projectId: "proj2",
    projectTitle: "Boys Hostel - Mumbai District",
    lastMessage: {
      id: "msg2",
      senderId: "gov1",
      senderName: "Rajesh Kumar",
      senderRole: "government",
      content: "Budget approval for additional materials has been processed.",
      timestamp: "2024-06-19T16:45:00Z",
      read: true,
      type: "text",
    },
    unreadCount: 0,
    type: "project",
  },
  {
    id: "3",
    participants: [
      { id: "gov1", name: "Rajesh Kumar", role: "government", organization: "Maharashtra Govt", online: true },
      { id: "agency3", name: "Sunita Devi", role: "agency", organization: "Elite Builders", online: true },
    ],
    lastMessage: {
      id: "msg3",
      senderId: "agency3",
      senderName: "Sunita Devi",
      senderRole: "agency",
      content: "Thank you for the project assignment. We'll start next week.",
      timestamp: "2024-06-18T10:20:00Z",
      read: true,
      type: "text",
    },
    unreadCount: 0,
    type: "direct",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "gov1",
    senderName: "Rajesh Kumar",
    senderRole: "government",
    content: "Good morning! I wanted to discuss the progress on the foundation work.",
    timestamp: "2024-06-20T09:00:00Z",
    projectId: "proj1",
    read: true,
    type: "text",
  },
  {
    id: "2",
    senderId: "agency1",
    senderName: "Priya Sharma",
    senderRole: "agency",
    content: "Good morning! The foundation work is progressing well. We're actually ahead of schedule by 3 days.",
    timestamp: "2024-06-20T09:15:00Z",
    projectId: "proj1",
    read: true,
    type: "text",
  },
  {
    id: "3",
    senderId: "agency1",
    senderName: "Priya Sharma",
    senderRole: "agency",
    content: "I've uploaded the latest progress photos and quality inspection report.",
    timestamp: "2024-06-20T09:16:00Z",
    projectId: "proj1",
    attachments: [
      { id: "att1", name: "foundation_progress.pdf", type: "application/pdf", size: 2048000, url: "#" },
      { id: "att2", name: "site_photos.zip", type: "application/zip", size: 15360000, url: "#" },
    ],
    read: true,
    type: "file",
  },
  {
    id: "4",
    senderId: "gov1",
    senderName: "Rajesh Kumar",
    senderRole: "government",
    content: "Excellent work! I'll review the documents and get back to you with any feedback.",
    timestamp: "2024-06-20T10:30:00Z",
    projectId: "proj1",
    read: true,
    type: "text",
  },
  {
    id: "5",
    senderId: "agency1",
    senderName: "Priya Sharma",
    senderRole: "agency",
    content: "Foundation work completed ahead of schedule. Please review the progress report.",
    timestamp: "2024-06-20T14:30:00Z",
    projectId: "proj1",
    read: false,
    type: "text",
  },
]

export function CommunicationSystem({
  currentUser,
}: { currentUser: { id: string; name: string; role: "government" | "agency" } }) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      content: newMessage,
      timestamp: new Date().toISOString(),
      projectId: selectedConversation.projectId,
      read: false,
      type: "text",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || !selectedConversation) return

    Array.from(files).forEach((file) => {
      const attachment: Attachment = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      }

      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        content: `Shared ${file.name}`,
        timestamp: new Date().toISOString(),
        projectId: selectedConversation.projectId,
        attachments: [attachment],
        read: false,
        type: "file",
      }

      setMessages((prev) => [...prev, message])
    })
  }

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.participants.some((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      conv.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <ImageIcon className="h-4 w-4" />
    if (type.includes("pdf")) return <FileText className="h-4 w-4" />
    return <Paperclip className="h-4 w-4" />
  }

  return (
    <div className="h-[600px] border rounded-lg bg-white dark:bg-gray-900 flex">
      {/* Sidebar - Conversations List */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Messages</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 mb-2 ${
                  selectedConversation?.id === conversation.id
                    ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200"
                    : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {conversation.participants
                          .find((p) => p.id !== currentUser.id)
                          ?.name.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.participants.find((p) => p.id !== currentUser.id)?.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">
                        {conversation.participants.find((p) => p.id !== currentUser.id)?.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(conversation.lastMessage.timestamp), "HH:mm")}
                      </span>
                    </div>
                    {conversation.projectTitle && (
                      <p className="text-xs text-blue-600 mb-1">{conversation.projectTitle}</p>
                    )}
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant={conversation.type === "project" ? "default" : "secondary"} className="text-xs">
                        {conversation.type}
                      </Badge>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedConversation.participants
                      .find((p) => p.id !== currentUser.id)
                      ?.name.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedConversation.participants.find((p) => p.id !== currentUser.id)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.participants.find((p) => p.id !== currentUser.id)?.organization}
                  </p>
                  {selectedConversation.projectTitle && (
                    <p className="text-xs text-blue-600">{selectedConversation.projectTitle}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages
                  .filter((msg) =>
                    selectedConversation.projectId ? msg.projectId === selectedConversation.projectId : true,
                  )
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${message.senderId === currentUser.id ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.senderId === currentUser.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          {message.senderId !== currentUser.id && (
                            <p className="text-xs font-medium mb-1 opacity-70">{message.senderName}</p>
                          )}
                          <p className="text-sm">{message.content}</p>

                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className="flex items-center gap-2 p-2 bg-white/10 rounded border"
                                >
                                  {getFileIcon(attachment.type)}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{attachment.name}</p>
                                    <p className="text-xs opacity-70">{formatFileSize(attachment.size)}</p>
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Paperclip className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(message.timestamp), "HH:mm")}
                          </span>
                          {message.senderId === currentUser.id && (
                            <span className="text-xs text-muted-foreground">{message.read ? "✓✓" : "✓"}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple className="hidden" />
                <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    rows={1}
                    className="resize-none"
                  />
                </div>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium">Select a conversation</p>
              <p className="text-muted-foreground">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="w-80 border-l bg-white dark:bg-gray-900">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {[
                { type: "message", title: "New message from Priya Sharma", time: "5 min ago", unread: true },
                { type: "project", title: "Project milestone completed", time: "1 hour ago", unread: true },
                { type: "budget", title: "Budget approval required", time: "2 hours ago", unread: false },
                { type: "system", title: "System maintenance scheduled", time: "1 day ago", unread: false },
              ].map((notification, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${notification.unread ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-blue-600" : "bg-gray-400"}`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
