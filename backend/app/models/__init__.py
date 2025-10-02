# Database Models
from app.models.user import UserProfile, UserRole, UserSession, UserDocument
from app.models.department import Department, Role, Permission, RolePermission
from app.models.vendor import (
    Vendor, VendorDocument, VendorService, VendorAvailability,
    VendorPayout, VendorReview, VendorContract
)
from app.models.therapist import (
    Therapist, TherapistCertification, TherapistSchedule,
    TherapistAvailability, TherapistLeave, TherapistPerformance,
    TherapistAssignment, TherapistEarnings, TherapistLocation
)
from app.models.service import (
    Service, ServiceCategory, ServiceVariant, ServicePricingTier,
    ServiceReview, ServiceAvailability, ServiceTag, PopularService
)
from app.models.booking import (
    Booking, BookingService, BookingStatusHistory, BookingNote,
    BookingCancellation, BookingReschedule, ServiceExecutionLog,
    BookingPhoto, BookingReview
)
from app.models.payment import (
    Payment, PaymentMethod, PaymentGateway, Refund,
    Wallet, WalletTransaction, Invoice, InvoiceItem
)
from app.models.customer import (
    Customer, CustomerAddress, CustomerSegment, CustomerPreference,
    CustomerLoyaltyTier, LoyaltyPointsTransaction, CustomerReferral,
    CustomerComplaint, CustomerCommunicationLog, CustomerFavorite
)
from app.models.hr import (
    Employee, EmployeeOnboarding, Attendance, AttendancePolicy,
    Leave, LeaveType, LeaveBalance, Holiday, WorkShift,
    OvertimeRecord, SalaryStructure, SalaryComponent, Training,
    PerformanceReview, Document as EmployeeDocument
)
from app.models.marketing import (
    Campaign, CampaignTarget, CampaignAnalytics, Promotion,
    PromotionRule, Coupon, CouponUsage, ReferralProgram,
    EmailTemplate, SMSTemplate, Notification
)
from app.models.support import (
    Ticket, TicketCategory, TicketPriority, TicketMessage,
    TicketSLA, CannedResponse, ChatConversation, ChatMessage, FAQ
)
from app.models.legal import (
    Contract, ContractType, LegalDocument, ComplianceRequirement,
    ComplianceAudit, LitigationCase, LegalNotice, RegulatoryFiling
)
from app.models.operations import (
    InventoryItem, InventoryTransaction, InventoryLocation,
    Supplier, PurchaseOrder, PurchaseOrderItem, Warehouse,
    StockLevel, StockAlert, AssetManagement
)
from app.models.finance import (
    ExpenseCategory, Expense, BudgetAllocation, FinancialReport,
    TaxRecord, AccountingEntry, BankAccount, CommissionRule,
    CommissionRecord
)
from app.models.analytics import (
    UserActivity, PageView, SearchQuery, ConversionEvent,
    ABTest, ABTestVariant, AnalyticsReport, KPI, Dashboard
)
from app.models.system import (
    AuditLog, SystemSetting, FeatureFlag, APIKey, Webhook,
    WebhookLog, ScheduledJob, ErrorLog, AppVersion
)
from app.models.location import (
    City, State, Country, Zone, ServiceArea, LocationTracking
)
from app.models.communication import (
    EmailLog, SMSLog, PushNotification, InAppMessage, Broadcast
)

__all__ = [
    # User models
    "UserProfile", "UserRole", "UserSession", "UserDocument",

    # Department models
    "Department", "Role", "Permission", "RolePermission",

    # Vendor models
    "Vendor", "VendorDocument", "VendorService", "VendorAvailability",
    "VendorPayout", "VendorReview", "VendorContract",

    # Therapist models
    "Therapist", "TherapistCertification", "TherapistSchedule",
    "TherapistAvailability", "TherapistLeave", "TherapistPerformance",
    "TherapistAssignment", "TherapistEarnings", "TherapistLocation",

    # Service models
    "Service", "ServiceCategory", "ServiceVariant", "ServicePricingTier",
    "ServiceReview", "ServiceAvailability", "ServiceTag", "PopularService",

    # Booking models
    "Booking", "BookingService", "BookingStatusHistory", "BookingNote",
    "BookingCancellation", "BookingReschedule", "ServiceExecutionLog",
    "BookingPhoto", "BookingReview",

    # Payment models
    "Payment", "PaymentMethod", "PaymentGateway", "Refund",
    "Wallet", "WalletTransaction", "Invoice", "InvoiceItem",

    # Customer models
    "Customer", "CustomerAddress", "CustomerSegment", "CustomerPreference",
    "CustomerLoyaltyTier", "LoyaltyPointsTransaction", "CustomerReferral",
    "CustomerComplaint", "CustomerCommunicationLog", "CustomerFavorite",

    # HR models
    "Employee", "EmployeeOnboarding", "Attendance", "AttendancePolicy",
    "Leave", "LeaveType", "LeaveBalance", "Holiday", "WorkShift",
    "OvertimeRecord", "SalaryStructure", "SalaryComponent", "Training",
    "PerformanceReview", "EmployeeDocument",

    # Marketing models
    "Campaign", "CampaignTarget", "CampaignAnalytics", "Promotion",
    "PromotionRule", "Coupon", "CouponUsage", "ReferralProgram",
    "EmailTemplate", "SMSTemplate", "Notification",

    # Support models
    "Ticket", "TicketCategory", "TicketPriority", "TicketMessage",
    "TicketSLA", "CannedResponse", "ChatConversation", "ChatMessage", "FAQ",

    # Legal models
    "Contract", "ContractType", "LegalDocument", "ComplianceRequirement",
    "ComplianceAudit", "LitigationCase", "LegalNotice", "RegulatoryFiling",

    # Operations models
    "InventoryItem", "InventoryTransaction", "InventoryLocation",
    "Supplier", "PurchaseOrder", "PurchaseOrderItem", "Warehouse",
    "StockLevel", "StockAlert", "AssetManagement",

    # Finance models
    "ExpenseCategory", "Expense", "BudgetAllocation", "FinancialReport",
    "TaxRecord", "AccountingEntry", "BankAccount", "CommissionRule",
    "CommissionRecord",

    # Analytics models
    "UserActivity", "PageView", "SearchQuery", "ConversionEvent",
    "ABTest", "ABTestVariant", "AnalyticsReport", "KPI", "Dashboard",

    # System models
    "AuditLog", "SystemSetting", "FeatureFlag", "APIKey", "Webhook",
    "WebhookLog", "ScheduledJob", "ErrorLog", "AppVersion",

    # Location models
    "City", "State", "Country", "Zone", "ServiceArea", "LocationTracking",

    # Communication models
    "EmailLog", "SMSLog", "PushNotification", "InAppMessage", "Broadcast",
]
