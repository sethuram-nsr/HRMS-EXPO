import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X 
} from 'lucide-react-native';

export default function EmployeeDashBoard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const [employees, setEmployees] = useState<any>([
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', email: 'john@company.com', status: 'Active', salary: 75000 },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product', email: 'jane@company.com', status: 'Active', salary: 85000 },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer', department: 'Design', email: 'mike@company.com', status: 'Active', salary: 70000 },
    { id: 4, name: 'Sarah Williams', position: 'HR Manager', department: 'Human Resources', email: 'sarah@company.com', status: 'Active', salary: 72000 },
    { id: 5, name: 'Tom Brown', position: 'DevOps Engineer', department: 'Engineering', email: 'tom@company.com', status: 'On Leave', salary: 78000 }
  ]);

  const [attendance, setAttendance] = useState<any>([
    { id: 1, employeeId: 1, date: '2025-11-21', status: 'Present', checkIn: '09:00', checkOut: '18:00' },
    { id: 2, employeeId: 2, date: '2025-11-21', status: 'Present', checkIn: '08:45', checkOut: '17:30' },
    { id: 3, employeeId: 3, date: '2025-11-21', status: 'Present', checkIn: '09:15', checkOut: '18:15' },
    { id: 4, employeeId: 4, date: '2025-11-21', status: 'Present', checkIn: '09:00', checkOut: '18:00' },
    { id: 5, employeeId: 5, date: '2025-11-21', status: 'Absent', checkIn: '', checkOut: '' }
  ]);

  const [leaves, setLeaves] = useState<any>([
    { id: 1, employeeId: 1, type: 'Sick Leave', startDate: '2025-11-25', endDate: '2025-11-26', status: 'Pending', reason: 'Medical appointment' },
    { id: 2, employeeId: 2, type: 'Vacation', startDate: '2025-12-01', endDate: '2025-12-05', status: 'Approved', reason: 'Family vacation' },
    { id: 3, employeeId: 3, type: 'Personal Leave', startDate: '2025-11-28', endDate: '2025-11-28', status: 'Pending', reason: 'Personal matter' }
  ]);

  const [formData, setFormData] = useState({
    name: '', position: '', department: '', email: '', salary: '', status: 'Active'
  });

  const openModal = (type: any = null, employee: any = null) => {
    setModalType(type==null ? '' : type);
    if (employee) {
      setSelectedEmployee(employee);
      setFormData(employee);
    } else {
      setSelectedEmployee(null);
      setFormData({ name: '', position: '', department: '', email: '', salary: '', status: 'Active' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setFormData({ name: '', position: '', department: '', email: '', salary: '', status: 'Active' });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.position || !formData.department || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (modalType === 'addEmployee') {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
        salary: parseFloat(formData.salary) || 0
      };
      setEmployees([...employees, newEmployee]);
    } else {
      setEmployees(employees.map((emp: { id: any; }) => 
        emp.id === selectedEmployee.id ? { ...emp, ...formData, salary: parseFloat(formData.salary) } : emp
      ));
    }
    closeModal();
  };

  const handleDelete = (id:any) => {
    Alert.alert(
      'Delete Employee',
      'Are you sure you want to delete this employee?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setEmployees(employees.filter((emp: { id: any; }) => emp.id !== id))
        }
      ]
    );
  };

const handleLeaveAction = (leaveId: any, action: any) => {
    setLeaves(leaves.map((leave: { id: null; })=> 
      leave.id === leaveId ? { ...leave, status: action } : leave
    ));
  };

  const filteredEmployees = employees.filter((emp: { name: string; position: string; department: string; }) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEmployeeName = (employeeId: any) => {
    const emp = employees.find((e: { id: any; }) => e.id === employeeId);
    return emp ? emp.name : 'Unknown';
  };

  // Stat Card Component
  const StatCard = ({ title, value, color, icon: Icon }:any) => (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <View style={styles.statContent}>
        <View>
          <Text style={styles.statTitle}>{title}</Text>
          <Text style={styles.statValue}>{value}</Text>
        </View>
        <Icon size={40} color="rgba(255,255,255,0.7)" />
      </View>
    </View>
  );

  // Dashboard View
  const DashboardView = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Employees"
          value={employees.length.toString()}
          color="#3b82f6"
          icon={Users}
        />
        <StatCard
          title="Present Today"
          value={attendance.filter((a:{status:string}) => a.status === 'Present').length.toString()}
          color="#10b981"
          icon={Clock}
        />
        <StatCard
          title="Pending Leaves"
          value={leaves.filter((l: { status: string; }) => l.status === 'Pending').length.toString()}
          color="#f59e0b"
          icon={FileText}
        />
        <StatCard
          title="On Leave"
          value={employees.filter((e: { status: string; }) => e.status === 'On Leave').length.toString()}
          color="#8b5cf6"
          icon={Calendar}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Attendance Overview</Text>
        <View style={styles.simpleChart}>
          <Text style={styles.chartNote}>Charts would be implemented here using react-native-chart-kit or similar library</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <Text style={styles.activityItem}>• 5 new employees this month</Text>
          <Text style={styles.activityItem}>• 98% attendance rate</Text>
          <Text style={styles.activityItem}>• 3 pending leave requests</Text>
        </View>
      </View>
    </ScrollView>
  );

  // Employee Item Component
  const EmployeeItem = ({ employee }:any) => (
    <View style={styles.employeeItem}>
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{employee.name}</Text>
        <Text style={styles.employeePosition}>{employee.position}</Text>
        <Text style={styles.employeeDepartment}>{employee.department}</Text>
        <Text style={styles.employeeEmail}>{employee.email}</Text>
      </View>
      <View style={styles.employeeDetails}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: employee.status === 'Active' ? '#dcfce7' : '#fef3c7' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: employee.status === 'Active' ? '#166534' : '#92400e' }
          ]}>
            {employee.status}
          </Text>
        </View>
        <Text style={styles.salaryText}>${employee.salary.toLocaleString()}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openModal('editEmployee', employee)}
          >
            <Edit2 size={18} color="#3b82f6" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDelete(employee.id)}
          >
            <Trash2 size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Employees View
  const EmployeesView = () => (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search employees..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => openModal('addEmployee')}
        >
          <Plus size={20} color="white" />
          <Text style={styles.addButtonText}>Add Employee</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredEmployees}
        renderItem={({ item }) => <EmployeeItem employee={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  // Attendance View
  const AttendanceView = () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Attendance - November 21, 2025</Text>
      <FlatList
        data={attendance}
        renderItem={({ item }) => {
          const hours = item.checkIn && item.checkOut ? 
            '9.0 hrs' : '-';
          
          return (
            <View style={styles.attendanceItem}>
              <Text style={styles.employeeName}>{getEmployeeName(item.employeeId)}</Text>
              <View style={styles.attendanceDetails}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: item.status === 'Present' ? '#dcfce7' : '#fecaca' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: item.status === 'Present' ? '#166534' : '#dc2626' }
                  ]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.attendanceTime}>In: {item.checkIn || '-'}</Text>
                <Text style={styles.attendanceTime}>Out: {item.checkOut || '-'}</Text>
                <Text style={styles.hoursText}>{hours}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  // Leave View
  const LeaveView = () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Leave Requests</Text>
      <FlatList
        data={leaves}
        renderItem={({ item }) => (
          <View style={styles.leaveItem}>
            <View style={styles.leaveHeader}>
              <Text style={styles.employeeName}>{getEmployeeName(item.employeeId)}</Text>
              <View style={[
                styles.statusBadge,
                { 
                  backgroundColor: 
                    item.status === 'Approved' ? '#dcfce7' :
                    item.status === 'Rejected' ? '#fecaca' : '#fef3c7'
                }
              ]}>
                <Text style={[
                  styles.statusText,
                  { 
                    color: 
                      item.status === 'Approved' ? '#166534' :
                      item.status === 'Rejected' ? '#dc2626' : '#92400e'
                  }
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.leaveType}>{item.type}</Text>
            <Text style={styles.leaveDates}>{item.startDate} to {item.endDate}</Text>
            <Text style={styles.leaveReason}>{item.reason}</Text>
            {item.status === 'Pending' && (
              <View style={styles.leaveActions}>
                <TouchableOpacity 
                  style={[styles.leaveButton, { backgroundColor: '#10b981' }]}
                  onPress={() => handleLeaveAction(item.id, 'Approved')}
                >
                  <Text style={styles.leaveButtonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.leaveButton, { backgroundColor: '#ef4444' }]}
                  onPress={() => handleLeaveAction(item.id, 'Rejected')}
                >
                  <Text style={styles.leaveButtonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  // Tab Button Component
  const TabButton = ({ id, label, icon: Icon, isActive, onPress }:any) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.tabButtonActive]}
      onPress={onPress}
    >
      <Icon size={20} color={isActive ? 'white' : '#6b7280'} />
      <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logo}>
            <Users size={24} color="white" />
          </View>
          <Text style={styles.headerTitle}>Employee Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#6b7280" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TabButton
          id="dashboard"
          label="Dashboard"
          icon={Users}
          isActive={activeTab === 'dashboard'}
          onPress={() => setActiveTab('dashboard')}
        />
        <TabButton
          id="employees"
          label="Employees"
          icon={Users}
          isActive={activeTab === 'employees'}
          onPress={() => setActiveTab('employees')}
        />
        <TabButton
          id="attendance"
          label="Attendance"
          icon={Clock}
          isActive={activeTab === 'attendance'}
          onPress={() => setActiveTab('attendance')}
        />
        <TabButton
          id="leaves"
          label="Leaves"
          icon={Calendar}
          isActive={activeTab === 'leaves'}
          onPress={() => setActiveTab('leaves')}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'employees' && <EmployeesView />}
        {activeTab === 'attendance' && <AttendanceView />}
        {activeTab === 'leaves' && <LeaveView />}
      </View>

      {/* Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'addEmployee' ? 'Add New Employee' : 'Edit Employee'}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Enter employee name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Position *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.position}
                  onChangeText={(text) => setFormData({ ...formData, position: text })}
                  placeholder="Enter position"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Department *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.department}
                  onChangeText={(text) => setFormData({ ...formData, department: text })}
                  placeholder="Enter department"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholder="Enter email"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Salary</Text>
                <TextInput
                  style={styles.input}
                  value={formData.salary}
                  onChangeText={(text) => setFormData({ ...formData, salary: text })}
                  placeholder="Enter salary"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Status</Text>
                <View style={styles.select}>
                  <Text style={styles.selectText}>{formData.status}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>
                  {modalType === 'addEmployee' ? 'Add Employee' : 'Save Changes'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#6b7280',
    fontSize: 14,
  },
  tabContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 4,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#3b82f6',
  },
  tabButtonText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  statsGrid: {
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  simpleChart: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  chartNote: {
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  activityList: {
    gap: 8,
  },
  activityItem: {
    fontSize: 14,
    color: '#6b7280',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  employeeItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  employeePosition: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  employeeDepartment: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  employeeEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  employeeDetails: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  salaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  attendanceItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  attendanceTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  hoursText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  leaveItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leaveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  leaveType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
    marginBottom: 4,
  },
  leaveDates: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  leaveReason: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  leaveActions: {
    flexDirection: 'row',
    gap: 8,
  },
  leaveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  leaveButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalBody: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  select: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
  },
  selectText: {
    fontSize: 16,
    color: '#1f2937',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});