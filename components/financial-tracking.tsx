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
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Receipt,
  FileText,
  Download,
} from "lucide-react"

interface Expense {
  id: string
  projectId: string
  category: "material" | "labor" | "equipment" | "transport" | "overhead" | "other"
  description: string
  amount: number
  date: string
  approvedBy: string
  status: "pending" | "approved" | "rejected"
  receipt?: string
  vendor: string
}

interface BudgetAllocation {
  category: string
  allocated: number
  spent: number
  remaining: number
  percentage: number
}

interface FinancialSummary {
  totalBudget: number
  totalSpent: number
  totalRemaining: number
  pendingApprovals: number
  monthlyBurn: number
  projectedCompletion: number
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    projectId: "1",
    category: "material",
    description: "Cement and steel for foundation",
    amount: 450000,
    date: "2024-01-15",
    approvedBy: "Project Manager",
    status: "approved",
    vendor: "ABC Materials Ltd",
  },
  {
    id: "2",
    projectId: "1",
    category: "labor",
    description: "Construction workers - Week 8",
    amount: 125000,
    date: "2024-01-20",
    approvedBy: "Site Engineer",
    status: "approved",
    vendor: "Labor Contractor",
  },
  {
    id: "3",
    projectId: "1",
    category: "equipment",
    description: "Crane rental for 5 days",
    amount: 75000,
    date: "2024-01-22",
    approvedBy: "",
    status: "pending",
    vendor: "Heavy Equipment Co",
  },
]

const budgetData: BudgetAllocation[] = [
  { category: "Materials", allocated: 1200000, spent: 450000, remaining: 750000, percentage: 37.5 },
  { category: "Labor", allocated: 800000, spent: 325000, remaining: 475000, percentage: 40.6 },
  { category: "Equipment", allocated: 300000, spent: 125000, remaining: 175000, percentage: 41.7 },
  { category: "Transport", allocated: 150000, spent: 45000, remaining: 105000, percentage: 30.0 },
  { category: "Overhead", allocated: 200000, spent: 85000, remaining: 115000, percentage: 42.5 },
]

const monthlySpendData = [
  { month: "Oct", spent: 180000, budget: 200000 },
  { month: "Nov", spent: 220000, budget: 250000 },
  { month: "Dec", spent: 195000, budget: 200000 },
  { month: "Jan", spent: 275000, budget: 300000 },
]

const expenseBreakdown = [
  { name: "Materials", value: 450000, color: "#3b82f6" },
  { name: "Labor", value: 325000, color: "#10b981" },
  { name: "Equipment", value: 125000, color: "#f59e0b" },
  { name: "Transport", value: 45000, color: "#ef4444" },
  { name: "Overhead", value: 85000, color: "#8b5cf6" },
]

export default function FinancialTracking() {
  const [selectedProject, setSelectedProject] = useState("1")
  const [newExpense, setNewExpense] = useState({
    category: "material" as Expense["category"],
    description: "",
    amount: "",
    vendor: "",
  })
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false)

  const financialSummary: FinancialSummary = {
    totalBudget: 2650000,
    totalSpent: 1030000,
    totalRemaining: 1620000,
    pendingApprovals: 75000,
    monthlyBurn: 225000,
    projectedCompletion: 2580000,
  }

  const handleExpenseSubmit = () => {
    console.log("[v0] New expense:", newExpense)
    setExpenseDialogOpen(false)
    setNewExpense({ category: "material", description: "", amount: "", vendor: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50"
      case "pending":
        return "text-yellow-600 bg-yellow-50"
      case "rejected":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "material":
        return "🏗️"
      case "labor":
        return "👷"
      case "equipment":
        return "🚜"
      case "transport":
        return "🚛"
      case "overhead":
        return "📊"
      default:
        return "📋"
    }
  }

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Budget</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{(financialSummary.totalBudget / 100000).toFixed(1)}L
                </p>
              </div>
              <IndianRupee className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Spent</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{(financialSummary.totalSpent / 100000).toFixed(1)}L
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2">
              <Progress value={(financialSummary.totalSpent / financialSummary.totalBudget) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Remaining</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{(financialSummary.totalRemaining / 100000).toFixed(1)}L
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-orange-600">
                  ₹{(financialSummary.pendingApprovals / 1000).toFixed(0)}K
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Financial Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Analytics Dashboard</CardTitle>
          <CardDescription>Comprehensive expense tracking and budget analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Spending Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Spending Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlySpendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                        <Area
                          type="monotone"
                          dataKey="spent"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="budget"
                          stackId="2"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Expense Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Budget Utilization */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget Utilization by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {budgetData.map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.category}</span>
                          <span className="text-sm text-slate-600">
                            ₹{(item.spent / 1000).toFixed(0)}K / ₹{(item.allocated / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>{item.percentage.toFixed(1)}% utilized</span>
                          <span>₹{(item.remaining / 1000).toFixed(0)}K remaining</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Expense Management</h3>
                <Dialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Receipt className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Expense</DialogTitle>
                      <DialogDescription>Record a new project expense with receipt details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="expense-category">Category</Label>
                        <Select
                          value={newExpense.category}
                          onValueChange={(value: Expense["category"]) =>
                            setNewExpense({ ...newExpense, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="material">Materials</SelectItem>
                            <SelectItem value="labor">Labor</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="transport">Transport</SelectItem>
                            <SelectItem value="overhead">Overhead</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="expense-description">Description</Label>
                        <Textarea
                          id="expense-description"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                          placeholder="Detailed description of the expense..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="expense-amount">Amount (₹)</Label>
                        <Input
                          id="expense-amount"
                          type="number"
                          value={newExpense.amount}
                          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expense-vendor">Vendor/Supplier</Label>
                        <Input
                          id="expense-vendor"
                          value={newExpense.vendor}
                          onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                          placeholder="Vendor name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expense-receipt">Upload Receipt</Label>
                        <Input id="expense-receipt" type="file" accept="image/*,.pdf" />
                      </div>
                      <Button onClick={handleExpenseSubmit} className="w-full">
                        Submit Expense
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {mockExpenses.map((expense) => (
                  <Card key={expense.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getCategoryIcon(expense.category)}</span>
                          <div>
                            <h4 className="font-medium">{expense.description}</h4>
                            <p className="text-sm text-slate-600">{expense.vendor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">₹{expense.amount.toLocaleString()}</p>
                          <Badge className={getStatusColor(expense.status)}>{expense.status}</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-500">
                        <span>{expense.date}</span>
                        <span>{expense.approvedBy || "Pending approval"}</span>
                      </div>
                      {expense.status === "pending" && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-green-600 bg-transparent">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="budget" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs Actual Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={budgetData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                      <Legend />
                      <Bar dataKey="allocated" fill="#3b82f6" name="Allocated" />
                      <Bar dataKey="spent" fill="#10b981" name="Spent" />
                      <Bar dataKey="remaining" fill="#f59e0b" name="Remaining" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Health Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">85/100</div>
                      <p className="text-slate-600">Excellent financial management</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Budget Adherence</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expense Approval Rate</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost Efficiency</span>
                          <span className="font-medium">76%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projected Completion Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">₹25.8L</div>
                        <p className="text-slate-600">Estimated total cost</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Original Budget</span>
                          <span>₹26.5L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Spent</span>
                          <span>₹10.3L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Projected Savings</span>
                          <span className="text-green-600 font-medium">₹0.7L</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Financial Reports</h3>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Monthly Financial Report</h4>
                        <p className="text-sm text-slate-600">January 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Receipt className="h-8 w-8 text-green-600" />
                      <div>
                        <h4 className="font-medium">Expense Summary</h4>
                        <p className="text-sm text-slate-600">All categories</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                      <div>
                        <h4 className="font-medium">Budget Analysis</h4>
                        <p className="text-sm text-slate-600">Variance report</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
