# Department Dashboards Implementation Guide

## Overview
This document provides a comprehensive guide for implementing enhanced department dashboards across the OMBARO platform. All departments now use a unified dashboard architecture with role-based navigation, modular content, and real-time data integration.

## Architecture Components

### Core Infrastructure
1. **DepartmentDashboardLayout** - Main layout with sidebar navigation and header
2. **DashboardStatsGrid** - Reusable statistics display component
3. **QuickActionsPanel** - Action buttons panel for common tasks
4. **EnhancedDepartmentPortal** - Template component for department portals
5. **departmentService** - API service for department data management

### Database Tables Created
- `departments` - Core department information
- `department_user_assignments` - User-department relationships
- `department_modules` - Available modules per department
- `department_widgets` - User widget preferences
- `department_settings` - Department configurations
- `department_activity_logs` - Audit trail

## Implementation Pattern

### Step 1: Define Department Data
```typescript
const stats: StatCard[] = [
  {
    label: 'Metric Name',
    value: 'Value',
    icon: IconComponent,
    color: 'bg-color-500',
    change: 'Change description',
    trend: 'up' | 'down' | 'neutral',
    changeValue: '+XX%'
  }
];

const quickActions: QuickAction[] = [
  {
    title: 'Action Title',
    description: 'Action description',
    icon: IconComponent,
    onClick: () => handleAction(),
    variant: 'primary' | 'secondary'
  }
];
```

### Step 2: Define Module Contents
```typescript
const moduleContents: ModuleContentConfig[] = [
  {
    moduleKey: 'module_name',
    title: 'Module Title',
    content: (
      <div>
        {/* Custom module content JSX */}
      </div>
    )
  }
];
```

### Step 3: Use EnhancedDepartmentPortal
```typescript
return (
  <EnhancedDepartmentPortal
    departmentCode="DEPT_CODE"
    stats={stats}
    quickActions={quickActions}
    moduleContents={moduleContents}
    user={user}
    onBack={onBack}
    onLogout={onLogout}
    headerGradient="from-color-600 to-color-600"
  />
);
```

## Department Specifications

### 1. Finance Department (IMPLEMENTED)
- **Code**: FINANCE
- **Gradient**: from-blue-600 to-cyan-600
- **Modules**: Overview, Budgets, Forecasting, Reports, Analytics
- **Key Metrics**: Total Budget, Utilization, Revenue, Cash Flow
- **Actions**: Create Budget, Financial Forecast, Generate Reports

### 2. Accounts Department (IMPLEMENTED)
- **Code**: ACCOUNTS
- **Gradient**: from-green-600 to-emerald-600
- **Modules**: Overview, Invoices, Payments, Reconciliation, Ledger
- **Key Metrics**: Revenue, Pending Invoices, Payments, Balance
- **Actions**: Create Invoice, Process Payment, Reconcile

### 3. Marketing Department
- **Code**: MARKETING
- **Gradient**: from-pink-600 to-rose-600
- **Modules**: Overview, Campaigns, Analytics, Content, Social Media
- **Key Metrics**: Campaigns, Leads, Conversion Rate, Social Reach
- **Actions**: Create Campaign, View Analytics, Upload Content

### 4. HR Department
- **Code**: HR
- **Gradient**: from-purple-600 to-indigo-600
- **Modules**: Overview, Employees, Recruitment, Payroll, Performance, Leave
- **Key Metrics**: Employees, Attendance, Open Positions, Satisfaction
- **Actions**: Add Employee, Post Job, Process Payroll

### 5. IT Department
- **Code**: IT
- **Gradient**: from-indigo-600 to-blue-600
- **Modules**: Overview, Monitoring, Tickets, Infrastructure, Security, Assets
- **Key Metrics**: System Uptime, Active Users, Open Tickets, DB Health
- **Actions**: System Config, Security Scan, Create Backup

### 6. Legal Department
- **Code**: LEGAL
- **Gradient**: from-red-600 to-pink-600
- **Modules**: Overview, Cases, Contracts, Compliance, Documents
- **Key Metrics**: Active Cases, Contracts, Compliance Score, Filings
- **Actions**: New Contract, Case Management, Compliance Check

### 7. Customer Care
- **Code**: CUSTOMER_CARE
- **Gradient**: from-emerald-600 to-teal-600
- **Modules**: Overview, Tickets, Live Chat, Feedback, Knowledge Base
- **Key Metrics**: Open Tickets, Avg Response, Resolved Today, Satisfaction
- **Actions**: Create Ticket, Start Chat, View Feedback

### 8. Staff Department
- **Code**: STAFF
- **Gradient**: from-orange-600 to-amber-600
- **Modules**: Overview, Directory, Attendance, Scheduling, Performance
- **Key Metrics**: Active Staff, On Duty, On Leave, Performance
- **Actions**: Add Staff, Manage Schedule, Track Location

### 9. F.O. Department
- **Code**: FO
- **Gradient**: from-yellow-600 to-orange-600
- **Modules**: Overview, Visitors, Bookings, Appointments
- **Key Metrics**: Daily Visitors, Active Bookings, Satisfaction, Efficiency
- **Actions**: Check In Visitor, Manage Bookings, Schedule Appointment

### 10. Vendor List
- **Code**: VENDOR_LIST
- **Gradient**: from-teal-600 to-cyan-600
- **Modules**: Overview, Vendors, Onboarding, Performance, Contracts
- **Key Metrics**: Total Vendors, Active, Pending Approval, Performance Score
- **Actions**: Add Vendor, Approve Application, View Performance

### 11. Customer Data
- **Code**: CUSTOMER_DATA
- **Gradient**: from-cyan-600 to-blue-600
- **Modules**: Overview, Customers, Segments, Analytics, Reports
- **Key Metrics**: Total Customers, Active Users, Segments, Data Quality
- **Actions**: Export Data, Create Segment, Generate Report

### 12. Advocate
- **Code**: ADVOCATE
- **Gradient**: from-rose-600 to-red-600
- **Modules**: Overview, Cases, Hearings, Documents, Clients
- **Key Metrics**: Active Cases, Hearings Scheduled, Documents, Win Rate
- **Actions**: Add Case, Schedule Hearing, Upload Document

### 13. CA & CS
- **Code**: CA_CS
- **Gradient**: from-amber-600 to-yellow-600
- **Modules**: Overview, Audits, Compliance, Tax, Reports
- **Key Metrics**: Audits, Compliance Score, Tax Filings, Financial Health
- **Actions**: Schedule Audit, File Tax, Generate Report

### 14. Directors
- **Code**: DIRECTORS
- **Gradient**: from-slate-600 to-gray-600
- **Modules**: Overview, Board, Meetings, Strategic Plans, Reports
- **Key Metrics**: Board Members, Meetings, Initiatives, Performance
- **Actions**: Schedule Meeting, Create Initiative, View Reports

### 15. H.O. Details
- **Code**: HO
- **Gradient**: from-gray-600 to-slate-600
- **Modules**: Overview, Administration, Staff, Assets, Reports
- **Key Metrics**: Staff Count, Assets Value, Expenses, Efficiency
- **Actions**: Manage Assets, Process Expense, View Reports

### 16. Corporate Office
- **Code**: CORPORATE
- **Gradient**: from-stone-600 to-gray-600
- **Modules**: Overview, Locations, Staff, Financials, Reports
- **Key Metrics**: Locations, Staff, Budget, Performance
- **Actions**: Manage Location, View Financials, Generate Report

## Features Implemented

### 1. Unified Dashboard Layout
- Collapsible sidebar with module navigation
- Role-based menu visibility
- Search functionality for modules
- User profile and logout in sidebar
- Responsive design for all screen sizes

### 2. Dynamic Statistics Display
- Color-coded stat cards
- Trend indicators (up/down/neutral)
- Percentage change displays
- Icon-based visual identification
- Responsive grid layout (2/3/4 columns)

### 3. Quick Actions Panel
- Primary and secondary action variants
- Icon-based action cards
- Hover effects and animations
- Customizable grid layout
- Click handlers for each action

### 4. Module-Based Content
- Overview dashboard (default)
- Custom content for each module
- Smooth module transitions
- Loading states
- Error handling

### 5. Activity Logging
- Real-time activity feed
- Department-specific logs
- User action tracking
- Timestamp display
- Module-level tracking

### 6. Department Information Display
- Status badges
- Department type
- Team size
- Budget information
- Contact details

## Data Integration

### Fetching Department Data
```typescript
const dept = await departmentService.getDepartmentByCode('CODE');
const modules = await departmentService.getDepartmentModules(dept.id);
const activities = await departmentService.getDepartmentActivityLogs(dept.id, 10);
```

### Logging Activity
```typescript
await departmentService.logActivity(
  departmentId,
  userId,
  'action_name',
  {
    moduleKey: 'module_name',
    description: 'Action description',
    metadata: {}
  }
);
```

### Checking Access
```typescript
const hasAccess = await departmentService.checkUserDepartmentAccess(userId, departmentId);
const role = await departmentService.getUserDepartmentRole(userId, departmentId);
```

## Customization Guide

### Adding a New Module
1. Add module definition to database via migration
2. Create module content component
3. Add to `moduleContents` array in department file
4. Update department configuration

### Styling Department Header
Use Tailwind gradient classes:
```typescript
headerGradient="from-{color}-600 to-{color}-600"
```

### Adding Custom Widgets
1. Define widget configuration
2. Save to `department_widgets` table
3. Render in overview or custom module

### Permission Integration
Modules support required permissions array:
```typescript
required_permissions: ['module:action', 'resource:read']
```

## Best Practices

1. **Consistent Naming**: Use clear, descriptive names for modules
2. **Icon Usage**: Choose appropriate Lucide icons for visual consistency
3. **Color Coding**: Use semantic colors (green=good, yellow=warning, red=critical)
4. **Loading States**: Always show loading indicators for async operations
5. **Error Handling**: Implement proper error boundaries and fallbacks
6. **Responsive Design**: Test all layouts on mobile, tablet, and desktop
7. **Accessibility**: Use proper ARIA labels and keyboard navigation
8. **Performance**: Lazy load module content when possible
9. **Data Freshness**: Implement real-time updates or periodic refresh
10. **User Feedback**: Show toast notifications for actions

## Migration Path

To convert an existing department to the new system:

1. **Backup** existing file
2. **Create** new file using EnhancedDepartmentPortal template
3. **Define** stats, quick actions, and module contents
4. **Test** all modules and navigation
5. **Replace** old file with new implementation
6. **Update** imports in parent components if needed

## Testing Checklist

- [ ] Department loads without errors
- [ ] All statistics display correctly
- [ ] Quick actions trigger appropriate handlers
- [ ] Module navigation works smoothly
- [ ] Sidebar collapses/expands properly
- [ ] Mobile responsive layout works
- [ ] Logout functionality works
- [ ] Loading states display correctly
- [ ] Activity logs fetch and display
- [ ] Department info shows accurate data

## Performance Considerations

1. **Code Splitting**: Each department can be lazy-loaded
2. **Data Caching**: Cache department and module data
3. **Optimistic UI**: Update UI before API responses
4. **Debounced Search**: Debounce module search input
5. **Virtual Lists**: Use virtualization for long lists

## Security Considerations

1. **RLS Policies**: All tables have Row Level Security enabled
2. **Permission Checks**: Module visibility based on user roles
3. **Audit Logging**: All actions logged to activity table
4. **Data Isolation**: Users only see their assigned departments
5. **Session Management**: Proper authentication checks

## Future Enhancements

1. **Dashboard Customization**: Allow users to customize widget layout
2. **Real-time Notifications**: WebSocket integration for live updates
3. **Advanced Analytics**: Chart libraries for data visualization
4. **Export Functionality**: PDF/Excel export for reports
5. **Mobile App**: React Native version using same architecture
6. **Collaborative Features**: Real-time collaboration on documents
7. **AI Integration**: Smart insights and recommendations
8. **Workflow Automation**: Automated approval workflows
9. **Integration Hub**: Connect external tools and services
10. **Advanced Reporting**: Custom report builder

## Support

For questions or issues with department dashboard implementation:
1. Review this documentation
2. Check database schema in migrations
3. Examine EnhancedDepartmentPortal component
4. Review departmentService API methods
5. Test with sample data in development

## Conclusion

The enhanced department dashboard system provides a scalable, maintainable architecture for all departmental portals. By following the patterns and guidelines in this document, developers can quickly create consistent, feature-rich dashboards for any department in the organization.
