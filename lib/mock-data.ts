export type ScreeningStatus = "Not Started" | "In Progress" | "Completed" | "Updated";

export const participants = [
  { id: "1", reg: "BUA-0047", name: "John Adewale", initials: "JA", phone: "0803 456 7890", email: "j***@bua.com", department: "Operations", service: "Comprehensive Package", status: "Completed" as ScreeningStatus, lastActivity: "Today, 10:42 AM", referral: true, followUp: true },
  { id: "2", reg: "BUA-0046", name: "Amina Yusuf", initials: "AY", phone: "0805 221 9044", email: "a***@bua.com", department: "Finance", service: "Free Wellness Screening", status: "In Progress" as ScreeningStatus, lastActivity: "Today, 10:18 AM", referral: false, followUp: false },
  { id: "3", reg: "BUA-0045", name: "Chinedu Okafor", initials: "CO", phone: "0706 404 1188", email: "c***@bua.com", department: "ICT", service: "Standard Package", status: "Not Started" as ScreeningStatus, lastActivity: "Today, 9:51 AM", referral: false, followUp: false },
  { id: "4", reg: "BUA-0044", name: "Fatima Bello", initials: "FB", phone: "0812 800 5570", email: "f***@bua.com", department: "Human Resources", service: "Doctor Consultation Only", status: "Updated" as ScreeningStatus, lastActivity: "Yesterday, 4:12 PM", referral: true, followUp: false },
  { id: "5", reg: "BUA-0043", name: "Tunde Balogun", initials: "TB", phone: "0802 787 3001", email: "—", department: "Procurement", service: "Free Wellness Screening", status: "Completed" as ScreeningStatus, lastActivity: "Yesterday, 3:44 PM", referral: false, followUp: true },
  { id: "6", reg: "BUA-0042", name: "Ngozi Eze", initials: "NE", phone: "0901 505 3320", email: "n***@bua.com", department: "Administration", service: "Standard Package", status: "In Progress" as ScreeningStatus, lastActivity: "Yesterday, 2:23 PM", referral: false, followUp: true },
];

export const dashboardStats = [
  { label: "Registered", value: "248", trend: "+18 today", tone: "teal" },
  { label: "Not started", value: "64", trend: "26% of total", tone: "slate" },
  { label: "In progress", value: "21", trend: "8 need attention", tone: "blue" },
  { label: "Completed", value: "155", trend: "62.5% completion", tone: "green" },
  { label: "Referrals", value: "18", trend: "5 urgent", tone: "coral" },
  { label: "Follow-ups", value: "31", trend: "7 this week", tone: "gold" },
];

export const hospitals = [
  { id: "1", name: "Zendale Medical Centre", specialty: "General Medicine", phone: "+234 810 000 2200", status: "Active" },
  { id: "2", name: "Kindred Path Fertility Centre", specialty: "Fertility & Gynaecology", phone: "+234 810 000 2210", status: "Active" },
  { id: "3", name: "Sky High Medical Centre", specialty: "Diagnostics & Specialist Care", phone: "+234 810 000 2230", status: "Active" },
  { id: "4", name: "Partner Hospital – Yaba", specialty: "Emergency & Critical Care", phone: "+234 810 000 2240", status: "Inactive" },
];

export const staffMembers = [
  { id: "BUA-STF-001", name: "Dr. Ada Mensah", role: "Administrator", email: "ada.mensah@example.com", status: "Active", lastSeen: "Now" },
  { id: "BUA-STF-002", name: "Nurse Kemi Lawal", role: "Medical Staff", email: "kemi.lawal@example.com", status: "Active", lastSeen: "12 min ago" },
  { id: "BUA-STF-003", name: "Samuel Obi", role: "Reception Staff", email: "samuel.obi@example.com", status: "Active", lastSeen: "1 hr ago" },
  { id: "BUA-STF-004", name: "Dr. Ibrahim Musa", role: "Medical Staff", email: "ibrahim.musa@example.com", status: "Inactive", lastSeen: "4 days ago" },
];
