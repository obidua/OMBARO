export type AttendanceStatus = 'present' | 'absent' | 'on-leave' | 'half-day';

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  notes?: string;
  workHours?: number;
}

export interface LocationTracking {
  id: string;
  userId: string;
  userName: string;
  userType: 'employee' | 'therapist' | 'vendor';
  latitude: number;
  longitude: number;
  address: string;
  timestamp: string;
  activity: string;
  isOnDuty: boolean;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  employeeId: string;
  dateOfJoining: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  status: 'active' | 'inactive' | 'on-leave';
  profilePhoto?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'sick' | 'casual' | 'annual' | 'unpaid' | 'maternity' | 'paternity';
  startDate: string;
  endDate: string;
  numberOfDays: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewerComments?: string;
}

export interface HRDocument {
  id: string;
  employeeId: string;
  documentType: 'offer-letter' | 'contract' | 'policy' | 'certificate' | 'payslip' | 'other';
  title: string;
  description?: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  expiryDate?: string;
}

export interface SalaryRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: {
    name: string;
    amount: number;
  }[];
  deductions: {
    name: string;
    amount: number;
  }[];
  bonuses: number;
  grossSalary: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
  paymentDate?: string;
  paymentMode?: 'bank-transfer' | 'cash' | 'cheque';
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  reviewPeriod: string;
  reviewDate: string;
  reviewerId: string;
  reviewerName: string;
  ratings: {
    category: string;
    score: number;
    maxScore: number;
    comments?: string;
  }[];
  overallRating: number;
  strengths: string[];
  areasForImprovement: string[];
  goals: string[];
  comments: string;
  status: 'draft' | 'completed' | 'acknowledged';
}
