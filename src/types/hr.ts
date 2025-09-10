export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: 'active' | 'inactive' | 'terminated';
  reportingManager?: string;
  profilePhoto?: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: AttendanceStatus;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  workingHours?: number;
  notes?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'emergency';
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
  documents?: string[];
}

export interface SalaryRecord {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    pf: number;
    esi: number;
    tax: number;
    other: number;
  };
  grossSalary: number;
  netSalary: number;
  paymentDate?: string;
  status: 'pending' | 'paid' | 'hold';
}

export interface HRDocument {
  id: string;
  employeeId: string;
  type: 'offer_letter' | 'appointment_letter' | 'contract' | 'increment_letter' | 'warning' | 'appreciation' | 'other';
  title: string;
  description?: string;
  fileUrl: string;
  uploadedDate: string;
  uploadedBy: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewPeriod: string;
  rating: number;
  goals: string[];
  achievements: string[];
  areasOfImprovement: string[];
  reviewerComments: string;
  employeeComments?: string;
  reviewDate: string;
  reviewedBy: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'leave' | 'work_from_home';

export interface LocationTracking {
  id: string;
  employeeId: string;
  latitude: number;
  longitude: number;
  address: string;
  timestamp: string;
  activity: 'check_in' | 'check_out' | 'break' | 'field_work' | 'client_visit';
}

export interface WorkSchedule {
  id: string;
  employeeId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isWorkingDay: boolean;
  breakDuration: number; // in minutes
}