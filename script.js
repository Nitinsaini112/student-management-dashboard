/* ==========================================================================
   EduManage — Student Management System
   Client-side data layer (localStorage) + UI bindings.
   All bindings below are matched against the ACTUAL element IDs used in
   the HTML pages of this project.
   ========================================================================== */

/* ==========================================================================
   1. LOCALSTORAGE DATABASE
   ========================================================================== */
const DB_KEYS = {
    USERS: 'app_users',
    STUDENTS: 'app_students',
    TEACHERS: 'app_teachers',
    CLASSES: 'app_classes',
    SUBJECTS: 'app_subjects',
    ATTENDANCE: 'app_attendance',
    FEES: 'app_fees',
    EXAMS: 'app_exams',
    ROLES: 'app_roles',
    SETTINGS: 'app_settings',
    CURRENT_USER: 'app_current_user'
};

function getStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS[key])) || [];
    } catch (e) {
        return [];
    }
}

function setStorage(key, data) {
    localStorage.setItem(DB_KEYS[key], JSON.stringify(data));
}

function getSettings() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.SETTINGS)) || {};
    } catch (e) {
        return {};
    }
}

function nextCode(prefix, list) {
    return `${prefix}-${1000 + list.length + 1}`;
}

function initDatabase() {
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        setStorage('USERS', [
            { id: 1, username: 'admin', password: 'password123', role: 'Admin', email: 'admin@edumanage.edu' },
            { id: 2, username: 'teacher1', password: 'password123', role: 'Teacher', email: 'teacher1@edumanage.edu' }
        ]);
    }

    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
        setStorage('SETTINGS', {
            schoolName: 'EduManage International Academy',
            schoolEmail: 'contact@edumanage.edu',
            schoolPhone: '+1 (555) 234-5678',
            schoolAddress: '123 Education Lane, Academic District, Suite 400, CA 90210',
            academicYear: '2026 - 2027',
            currency: '$',
            timezone: 'UTC -08:00 (Pacific Time)',
            dateFormat: 'MM/DD/YYYY',
            sessionTimeout: 30,
            minPassword: 8
        });
    }

    if (!localStorage.getItem(DB_KEYS.STUDENTS)) {
        setStorage('STUDENTS', [
            { id: 'stu_1001', name: 'Alexander Wright', className: 'Class 10-A', status: 'Active' },
            { id: 'stu_1002', name: 'Sophia Martinez', className: 'Class 10-B', status: 'Active' },
            { id: 'stu_1003', name: 'Liam Johnson', className: 'Class 12-A', status: 'Active' },
            { id: 'stu_1004', name: 'Emma Watson', className: 'Class 11-A', status: 'Pending' }
        ]);
    }

    if (!localStorage.getItem(DB_KEYS.TEACHERS)) {
        setStorage('TEACHERS', [
            { id: 'tea_2001', name: 'Dr. Rajesh Kumar', subject: 'Mathematics', status: 'Active' },
            { id: 'tea_2002', name: 'Ms. Sarah Lee', subject: 'English Literature', status: 'Active' }
        ]);
    }

    if (!localStorage.getItem(DB_KEYS.CLASSES)) {
        setStorage('CLASSES', [
            { id: 'cls_3001', code: 'CLS-1001', name: 'Class 10', section: 'A', teacher: 'Dr. Rajesh Kumar' },
            { id: 'cls_3002', code: 'CLS-1002', name: 'Class 11', section: 'C', teacher: 'Ms. Sarah Lee' }
        ]);
    }

    if (!localStorage.getItem(DB_KEYS.SUBJECTS)) {
        setStorage('SUBJECTS', [
            { id: 'sub_4001', code: 'MATH101', name: 'Mathematics', teacher: 'Dr. Rajesh Kumar' },
            { id: 'sub_4002', code: 'ENG101', name: 'English Literature', teacher: 'Ms. Sarah Lee' }
        ]);
    }

    if (!localStorage.getItem(DB_KEYS.EXAMS)) {
        setStorage('EXAMS', [
            { id: 'exm_5001', code: 'EXM-1001', name: 'Mid-Term 2026', subject: 'Mathematics', date: '2026-08-15' }
        ]);
    }

    if (!localStorage.getItem(DB_KEYS.FEES)) {
        setStorage('FEES', [
            { id: 'rec_6001', code: '#REC-1001', name: 'Alexander Wright', className: 'Class 10-A', type: 'Tuition Fee', amount: 1200, method: 'Card', status: 'Paid' },
            { id: 'rec_6002', code: '#REC-1002', name: 'Sophia Martinez', className: 'Class 10-B', type: 'Tuition Fee', amount: 600, method: 'Cash', status: 'Partial' },
            { id: 'rec_6003', code: '#REC-1003', name: 'Liam Johnson', className: 'Class 12-A', type: 'Exam Fee', amount: 150, method: 'Bank Transfer', status: 'Paid' },
            { id: 'rec_6004', code: '#REC-1004', name: 'Emma Watson', className: 'Class 11-A', type: 'Transport Fee', amount: 300, method: '-', status: 'Unpaid' }
        ]);
    }

    if (!localStorage.getItem(DB_KEYS.ROLES)) {
        setStorage('ROLES', []);
    }

    if (!localStorage.getItem(DB_KEYS.ATTENDANCE)) {
        setStorage('ATTENDANCE', {});
    }
}

/* ==========================================================================
   2. NOTIFICATION SYSTEM (TOASTS)
   ========================================================================== */
function showNotification(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
    };

    toast.style.cssText = `
        background-color: ${bgColors[type] || bgColors.info};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.15);
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        opacity: 1;
        transition: opacity 0.3s ease;
    `;
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ==========================================================================
   3. FORM VALIDATION HELPER
   ========================================================================== */
function validateForm(formElement) {
    let isValid = true;
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');

    inputs.forEach(input => {
        if (!input.value || !input.value.toString().trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
    }
    return isValid;
}

/* ==========================================================================
   4. AUTHENTICATION
   ========================================================================== */
function handleLogin(event) {
    if (event) event.preventDefault();
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    if (!usernameInput || !passwordInput) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        showNotification('Please enter both username and password.', 'error');
        return;
    }

    const users = getStorage('USERS');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
    } else {
        showNotification('Invalid username or password.', 'error');
    }
}

function handleLogout(event) {
    if (event) event.preventDefault();
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
    showNotification('Logged out successfully.', 'info');
    setTimeout(() => { window.location.href = 'index.html'; }, 400);
}

function checkAuthGuard() {
    const currentUser = JSON.parse(localStorage.getItem(DB_KEYS.CURRENT_USER) || 'null');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const isLoginPage = path === 'index.html' || path === '' || path === 'login.html';

    if (!currentUser && !isLoginPage) {
        window.location.href = 'index.html';
    } else if (currentUser && isLoginPage) {
        window.location.href = 'dashboard.html';
    }
}

function loadCurrentUserIntoTopbar() {
    const currentUser = JSON.parse(localStorage.getItem(DB_KEYS.CURRENT_USER) || 'null');
    if (!currentUser) return;
    const nameEl = document.querySelector('.user-name');
    const roleEl = document.querySelector('.user-role');
    const avatarEl = document.querySelector('.profile-avatar');
    if (nameEl) nameEl.innerText = currentUser.username;
    if (roleEl) roleEl.innerText = currentUser.role;
    if (avatarEl) avatarEl.innerText = currentUser.username.charAt(0).toUpperCase();
}

/* ==========================================================================
   5. SIDEBAR TOGGLE & ACTIVE MENU
   ========================================================================== */
function setupNavigation() {
    const sidebarToggle = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Ensure exactly one sidebar link is marked active, based on the current page.
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar-menu .menu-item');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Wire up logout links (class="menu-item logout") so storage is cleared on click.
    document.querySelectorAll('.menu-item.logout').forEach(link => {
        link.addEventListener('click', handleLogout);
    });
}

/* ==========================================================================
   6. GENERIC TABLE SEARCH (works for a <table id> or a <tbody id>)
   ========================================================================== */
function filterTableData(inputId, tableId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(tableId);
    if (!input || !container) return;

    input.addEventListener('keyup', () => {
        const filter = input.value.toLowerCase();
        const rows = container.tagName === 'TABLE'
            ? container.querySelectorAll('tbody tr')
            : container.querySelectorAll('tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });
}

function setupGlobalSearch() {
    const searchTableIds = [
        'recentStudentsTable', 'allStudentsTable', 'allTeachersTable',
        'allClassesTable', 'allSubjectsTable', 'attendanceTable',
        'feesTableBody', 'allExamsTable', 'reportsTableBody', 'rolesTableBody'
    ];

    searchTableIds.forEach(tableId => {
        if (document.getElementById(tableId)) {
            filterTableData('globalSearch', tableId);
        }
    });
}

/* ==========================================================================
   7. EXPORT & PRINT HELPERS
   ========================================================================== */
function exportTableToCSV(tableId, filename = 'export.csv') {
    const el = document.getElementById(tableId);
    if (!el) {
        showNotification('Table not found for export.', 'error');
        return;
    }

    const container = el.tagName === 'TABLE' ? el : el.closest('table');
    if (!container) return;

    const rows = Array.from(container.querySelectorAll('tr'));
    const csvContent = rows.map(row => {
        const cols = Array.from(row.querySelectorAll('th, td'));
        return cols.map(col => `"${col.innerText.replace(/"/g, '""').trim()}"`).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('CSV exported successfully!', 'success');
}

function printReceipt(receiptCode, studentName, amount) {
    const printWindow = window.open('', '', 'height=600,width=500');
    const settings = getSettings();
    printWindow.document.write(`
        <html><head><title>Receipt ${receiptCode}</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #0f172a; }
            h2 { margin-bottom: 4px; }
            .muted { color: #64748b; font-size: 13px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            td { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
            .total { font-weight: bold; font-size: 18px; }
        </style>
        </head><body>
            <h2>${settings.schoolName || 'EduManage'}</h2>
            <p class="muted">Official Fee Payment Receipt</p>
            <table>
                <tr><td>Receipt No.</td><td>${receiptCode}</td></tr>
                <tr><td>Student Name</td><td>${studentName}</td></tr>
                <tr><td>Date Issued</td><td>${new Date().toLocaleDateString()}</td></tr>
                <tr><td class="total">Amount Paid</td><td class="total">${amount}</td></tr>
            </table>
        </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 400);
}

function printReportSection(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        showNotification('Section not found for printing.', 'error');
        return;
    }
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Report</title></head><body>');
    printWindow.document.write(element.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 400);
}

/* ==========================================================================
   8. DASHBOARD
   ========================================================================== */
function loadDashboardMetrics() {
    const students = getStorage('STUDENTS');
    const teachers = getStorage('TEACHERS');
    const classes = getStorage('CLASSES');
    const fees = getStorage('FEES');
    const settings = getSettings();
    const currency = settings.currency || '$';

    const totalStudentsElem = document.getElementById('totalStudentsNum');
    const totalTeachersElem = document.getElementById('totalTeachersNum');
    const totalClassesElem = document.getElementById('totalClassesNum');
    const totalFeesElem = document.getElementById('totalFeesNum');

    if (totalStudentsElem) totalStudentsElem.innerText = students.length;
    if (totalTeachersElem) totalTeachersElem.innerText = teachers.length;
    if (totalClassesElem) totalClassesElem.innerText = classes.length;

    if (totalFeesElem) {
        const totalRevenue = fees
            .filter(f => f.status === 'Paid' || f.status === 'Partial')
            .reduce((sum, f) => sum + (parseFloat(f.amount) || 0), 0);
        totalFeesElem.innerText = `${currency}${totalRevenue.toLocaleString()}`;
    }

    renderRecentStudents();
}

function renderRecentStudents() {
    const tbody = document.getElementById('recentStudentsTable');
    if (!tbody) return;

    const students = getStorage('STUDENTS').slice(-5).reverse();
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No students enrolled yet.</td></tr>';
        return;
    }

    tbody.innerHTML = students.map((s, index) => `
        <tr>
            <td>#${String(index + 1).padStart(3, '0')}</td>
            <td>${escapeHtml(s.name)}</td>
            <td>${escapeHtml(s.className)}</td>
            <td><span class="status-badge ${s.status === 'Active' ? 'active' : 'pending'}">${s.status}</span></td>
        </tr>
    `).join('');
}

/* ==========================================================================
   9. STUDENTS
   ========================================================================== */
function renderStudentsTable() {
    const tbody = document.getElementById('allStudentsTable');
    if (!tbody) return;

    const students = getStorage('STUDENTS');
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No students found. Add your first student above.</td></tr>';
        return;
    }

    tbody.innerHTML = students.map((s, index) => `
        <tr>
            <td>#${String(index + 1).padStart(3, '0')}</td>
            <td>${escapeHtml(s.name)}</td>
            <td>${escapeHtml(s.className)}</td>
            <td><span class="status-badge ${s.status === 'Active' ? 'active' : 'pending'}">${s.status}</span></td>
            <td>
                <button class="btn-delete" title="Delete Student" onclick="deleteStudent('${s.id}')"><i class="bx bx-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function saveStudent(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('studentForm');
    if (!form || !validateForm(form)) return;

    const nameInput = document.getElementById('stuName');
    const classInput = document.getElementById('stuClass');
    const statusInput = document.getElementById('stuStatus');

    const students = getStorage('STUDENTS');
    students.push({
        id: 'stu_' + Date.now(),
        name: nameInput.value.trim(),
        className: classInput.value.trim(),
        status: statusInput.value
    });

    setStorage('STUDENTS', students);
    showNotification('Student added successfully!', 'success');
    form.reset();
    renderStudentsTable();
}

function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    let students = getStorage('STUDENTS');
    students = students.filter(s => s.id !== id);
    setStorage('STUDENTS', students);
    showNotification('Student deleted.', 'info');
    renderStudentsTable();
}

/* ==========================================================================
   10. TEACHERS
   ========================================================================== */
function renderTeachersTable() {
    const tbody = document.getElementById('allTeachersTable');
    if (!tbody) return;

    const teachers = getStorage('TEACHERS');
    if (teachers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No teachers found. Add your first teacher above.</td></tr>';
        return;
    }

    tbody.innerHTML = teachers.map((t, index) => `
        <tr>
            <td>#${String(index + 1).padStart(3, '0')}</td>
            <td>${escapeHtml(t.name)}</td>
            <td>${escapeHtml(t.subject)}</td>
            <td><span class="status-badge ${t.status === 'Active' ? 'active' : 'pending'}">${t.status}</span></td>
            <td>
                <button class="btn-delete" title="Delete Teacher" onclick="deleteTeacher('${t.id}')"><i class="bx bx-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function saveTeacher(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('teacherForm');
    if (!form || !validateForm(form)) return;

    const nameInput = document.getElementById('teaName');
    const subjectInput = document.getElementById('teaSubject');
    const statusInput = document.getElementById('teaStatus');

    const teachers = getStorage('TEACHERS');
    teachers.push({
        id: 'tea_' + Date.now(),
        name: nameInput.value.trim(),
        subject: subjectInput.value.trim(),
        status: statusInput.value
    });

    setStorage('TEACHERS', teachers);
    showNotification('Teacher added successfully!', 'success');
    form.reset();
    renderTeachersTable();
}

function deleteTeacher(id) {
    if (!confirm('Are you sure you want to delete this teacher?')) return;
    let teachers = getStorage('TEACHERS');
    teachers = teachers.filter(t => t.id !== id);
    setStorage('TEACHERS', teachers);
    showNotification('Teacher deleted.', 'info');
    renderTeachersTable();
}

/* ==========================================================================
   11. CLASSES
   ========================================================================== */
function renderClassesTable() {
    const tbody = document.getElementById('allClassesTable');
    if (!tbody) return;

    const classes = getStorage('CLASSES');
    if (classes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No classes found. Add your first class above.</td></tr>';
        return;
    }

    tbody.innerHTML = classes.map(c => `
        <tr>
            <td>${escapeHtml(c.code)}</td>
            <td>${escapeHtml(c.name)}</td>
            <td>${escapeHtml(c.section)}</td>
            <td>${escapeHtml(c.teacher)}</td>
            <td>
                <button class="btn-delete" title="Delete Class" onclick="deleteClass('${c.id}')"><i class="bx bx-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function saveClass(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('classForm');
    if (!form || !validateForm(form)) return;

    const nameInput = document.getElementById('className');
    const sectionInput = document.getElementById('classSection');
    const teacherInput = document.getElementById('classTeacher');

    const classes = getStorage('CLASSES');
    classes.push({
        id: 'cls_' + Date.now(),
        code: nextCode('CLS', classes),
        name: nameInput.value.trim(),
        section: sectionInput.value.trim(),
        teacher: teacherInput.value.trim()
    });

    setStorage('CLASSES', classes);
    showNotification('Class added successfully!', 'success');
    form.reset();
    renderClassesTable();
}

function deleteClass(id) {
    if (!confirm('Are you sure you want to delete this class?')) return;
    let classes = getStorage('CLASSES');
    classes = classes.filter(c => c.id !== id);
    setStorage('CLASSES', classes);
    showNotification('Class deleted.', 'info');
    renderClassesTable();
}

/* ==========================================================================
   12. SUBJECTS
   ========================================================================== */
function renderSubjectsTable() {
    const tbody = document.getElementById('allSubjectsTable');
    if (!tbody) return;

    const subjects = getStorage('SUBJECTS');
    if (subjects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No subjects found. Add your first subject above.</td></tr>';
        return;
    }

    tbody.innerHTML = subjects.map(s => `
        <tr>
            <td>${escapeHtml(s.code)}</td>
            <td>${escapeHtml(s.name)}</td>
            <td>${escapeHtml(s.teacher)}</td>
            <td>
                <button class="btn-delete" title="Delete Subject" onclick="deleteSubject('${s.id}')"><i class="bx bx-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function saveSubject(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('subjectForm');
    if (!form || !validateForm(form)) return;

    const nameInput = document.getElementById('subName');
    const codeInput = document.getElementById('subCode');
    const teacherInput = document.getElementById('subTeacher');

    const subjects = getStorage('SUBJECTS');
    subjects.push({
        id: 'sub_' + Date.now(),
        code: codeInput.value.trim(),
        name: nameInput.value.trim(),
        teacher: teacherInput.value.trim()
    });

    setStorage('SUBJECTS', subjects);
    showNotification('Subject added successfully!', 'success');
    form.reset();
    renderSubjectsTable();
}

function deleteSubject(id) {
    if (!confirm('Are you sure you want to delete this subject?')) return;
    let subjects = getStorage('SUBJECTS');
    subjects = subjects.filter(s => s.id !== id);
    setStorage('SUBJECTS', subjects);
    showNotification('Subject deleted.', 'info');
    renderSubjectsTable();
}

/* ==========================================================================
   13. ATTENDANCE
   ========================================================================== */
function renderAttendanceList() {
    const tbody = document.getElementById('attendanceTable');
    if (!tbody) return;

    const dateInput = document.getElementById('attendanceDate');
    const classSelect = document.getElementById('attendanceClass');
    const date = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
    const classFilter = classSelect ? classSelect.value : 'All';

    let students = getStorage('STUDENTS');
    if (classFilter && classFilter !== 'All') {
        students = students.filter(s => s.className === classFilter);
    }

    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No students match the selected class.</td></tr>';
        return;
    }

    const attendance = getStorage('ATTENDANCE');
    const dayRecord = attendance[date] || {};

    tbody.innerHTML = students.map((s, index) => {
        const currentStatus = dayRecord[s.id] || 'Present';
        return `
        <tr>
            <td>#${String(index + 1).padStart(3, '0')}</td>
            <td>${escapeHtml(s.name)}</td>
            <td>${escapeHtml(s.className)}</td>
            <td>
                <select class="status-select attendance-status-select" data-student-id="${s.id}">
                    <option value="Present" ${currentStatus === 'Present' ? 'selected' : ''}>Present</option>
                    <option value="Absent" ${currentStatus === 'Absent' ? 'selected' : ''}>Absent</option>
                    <option value="Late" ${currentStatus === 'Late' ? 'selected' : ''}>Late</option>
                </select>
            </td>
        </tr>`;
    }).join('');
}

function saveAttendance(event) {
    if (event) event.preventDefault();
    const dateInput = document.getElementById('attendanceDate');
    const date = dateInput && dateInput.value ? dateInput.value : new Date().toISOString().split('T')[0];

    const attendance = getStorage('ATTENDANCE');
    const dayRecord = attendance[date] || {};

    document.querySelectorAll('.attendance-status-select').forEach(select => {
        dayRecord[select.dataset.studentId] = select.value;
    });

    attendance[date] = dayRecord;
    setStorage('ATTENDANCE', attendance);
    showNotification(`Attendance saved for ${date}.`, 'success');
}

/* ==========================================================================
   14. FEES
   ========================================================================== */
function renderFeesTable() {
    const tbody = document.getElementById('feesTableBody');
    if (!tbody) return;

    const classFilterSelect = document.getElementById('filterClass');
    const statusFilterSelect = document.getElementById('filterStatus');
    const classFilter = classFilterSelect ? classFilterSelect.value : 'All';
    const statusFilter = statusFilterSelect ? statusFilterSelect.value : 'All';

    let fees = getStorage('FEES');
    if (classFilter && classFilter !== 'All') fees = fees.filter(f => f.className === classFilter);
    if (statusFilter && statusFilter !== 'All') fees = fees.filter(f => f.status === statusFilter);

    if (fees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No fee records match the selected filters.</td></tr>';
        return;
    }

    const badgeClassMap = { Paid: 'badge-paid', Partial: 'badge-partial', Unpaid: 'badge-unpaid' };

    tbody.innerHTML = fees.map(f => `
        <tr>
            <td>${escapeHtml(f.code)}</td>
            <td><strong>${escapeHtml(f.name)}</strong></td>
            <td>${escapeHtml(f.className)}</td>
            <td>${escapeHtml(f.type)}</td>
            <td>$${Number(f.amount).toLocaleString()}</td>
            <td>${escapeHtml(f.method)}</td>
            <td><span class="badge-fee ${badgeClassMap[f.status] || 'badge-partial'}">${f.status}</span></td>
            <td>
                ${f.status === 'Unpaid'
            ? `<button class="btn-action-sm btn-print" style="opacity:0.5;cursor:not-allowed;" disabled><i class="bx bx-block"></i> Pending</button>`
            : `<button class="btn-action-sm btn-print" onclick="printReceipt('${f.code}', '${escapeHtml(f.name)}', '$${Number(f.amount).toLocaleString()}')"><i class="bx bx-printer"></i> Receipt</button>`
        }
                <button class="btn-action-sm" style="background:#ef4444;color:#fff;" onclick="deleteFeeRecord('${f.id}')"><i class="bx bx-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function saveFeeRecord(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('feeForm');
    if (!form || !validateForm(form)) return;

    const nameInput = document.getElementById('studentName');
    const classInput = document.getElementById('studentClass');
    const amountInput = document.getElementById('amountPaid');
    const typeInput = document.getElementById('paymentType');
    const methodInput = document.getElementById('paymentMethod');
    const statusInput = document.getElementById('feeStatus');

    const fees = getStorage('FEES');
    fees.unshift({
        id: 'rec_' + Date.now(),
        code: nextCode('#REC', fees),
        name: nameInput.value.trim(),
        className: classInput.value,
        type: typeInput.value,
        amount: parseFloat(amountInput.value) || 0,
        method: methodInput.value,
        status: statusInput.value
    });

    setStorage('FEES', fees);
    showNotification('Fee transaction recorded successfully!', 'success');
    form.reset();
    renderFeesTable();
}

function deleteFeeRecord(id) {
    if (!confirm('Are you sure you want to delete this fee record?')) return;
    let fees = getStorage('FEES');
    fees = fees.filter(f => f.id !== id);
    setStorage('FEES', fees);
    showNotification('Fee record deleted.', 'info');
    renderFeesTable();
}

/* ==========================================================================
   15. EXAMS
   ========================================================================== */
function renderExamsTable() {
    const tbody = document.getElementById('allExamsTable');
    if (!tbody) return;

    const exams = getStorage('EXAMS');
    if (exams.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No exams scheduled yet. Schedule one above.</td></tr>';
        return;
    }

    tbody.innerHTML = exams.map(e => `
        <tr>
            <td>${escapeHtml(e.code)}</td>
            <td>${escapeHtml(e.name)}</td>
            <td>${escapeHtml(e.subject)}</td>
            <td>${e.date ? new Date(e.date).toLocaleDateString() : '-'}</td>
            <td>
                <button class="btn-delete" title="Delete Exam" onclick="deleteExam('${e.id}')"><i class="bx bx-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function saveExam(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('examForm');
    if (!form || !validateForm(form)) return;

    const nameInput = document.getElementById('examName');
    const subjectInput = document.getElementById('examSubject');
    const dateInput = document.getElementById('examDate');

    const exams = getStorage('EXAMS');
    exams.push({
        id: 'exm_' + Date.now(),
        code: nextCode('EXM', exams),
        name: nameInput.value.trim(),
        subject: subjectInput.value.trim(),
        date: dateInput.value
    });

    setStorage('EXAMS', exams);
    showNotification('Exam scheduled successfully!', 'success');
    form.reset();
    renderExamsTable();
}

function deleteExam(id) {
    if (!confirm('Are you sure you want to delete this exam?')) return;
    let exams = getStorage('EXAMS');
    exams = exams.filter(e => e.id !== id);
    setStorage('EXAMS', exams);
    showNotification('Exam deleted.', 'info');
    renderExamsTable();
}

/* ==========================================================================
   16. REPORTS
   ========================================================================== */
function getGeneratedReports() {
    try {
        return JSON.parse(localStorage.getItem('app_generated_reports')) || [];
    } catch (e) {
        return [];
    }
}

function setGeneratedReports(list) {
    localStorage.setItem('app_generated_reports', JSON.stringify(list));
}

function renderGeneratedReportsTable() {
    const tbody = document.getElementById('reportsTableBody');
    if (!tbody) return;

    const reports = getGeneratedReports();
    if (reports.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No reports generated yet. Use the form above to create one.</td></tr>';
        return;
    }

    tbody.innerHTML = reports.map(r => `
        <tr>
            <td>${escapeHtml(r.name)}</td>
            <td>${escapeHtml(r.category)}</td>
            <td>${escapeHtml(r.generatedDate)}</td>
            <td>${escapeHtml(r.format)}</td>
            <td>
                <div class="report-actions">
                    <button class="btn-download" onclick="exportTableToCSV('reportsTableBody', '${escapeHtml(r.name)}.csv')"><i class="bx bx-download"></i> CSV</button>
                    <button class="btn-print" onclick="printReportSection('reportsTableBody')"><i class="bx bx-printer"></i> Print</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function generateReport(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('reportForm');
    if (!form || !validateForm(form)) return;

    const typeInput = document.getElementById('reportType');
    const classInput = document.getElementById('classFilter');

    const reports = getGeneratedReports();
    reports.unshift({
        name: `${typeInput.options[typeInput.selectedIndex].text} — ${classInput.value}`,
        category: typeInput.value,
        generatedDate: new Date().toLocaleDateString(),
        format: 'PDF/CSV'
    });

    setGeneratedReports(reports);
    showNotification('Report generated successfully!', 'success');
    renderGeneratedReportsTable();
}

/* ==========================================================================
   17. USER ROLES
   ========================================================================== */
function renderRolesTable() {
    const roles = getStorage('ROLES');
    const tbody = document.getElementById('rolesTableBody');
    if (!tbody || roles.length === 0) return;

    const extraRows = roles.map(r => `
        <tr data-role-row="${r.id}">
            <td><strong>${escapeHtml(r.name)}</strong></td>
            <td>${escapeHtml(r.description || 'No description provided.')}</td>
            <td>0 Users</td>
            <td><span class="badge-role badge-custom">Custom</span></td>
            <td>
                <div class="report-actions">
                    <button class="btn-action-sm btn-edit-role" onclick="editRole('${escapeHtml(r.name)}')"><i class="bx bx-edit"></i> Edit</button>
                    <button class="btn-action-sm btn-delete-role" onclick="deleteRole(this)"><i class="bx bx-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    tbody.insertAdjacentHTML('beforeend', extraRows);
}

function saveUserRole(event) {
    if (event) event.preventDefault();
    const form = document.getElementById('roleForm');
    if (!form || !validateForm(form)) return;

    const nameInput = document.getElementById('roleName');
    const descInput = document.getElementById('roleDesc');

    const roles = getStorage('ROLES');
    const roleId = 'role_' + Date.now();
    roles.push({ id: roleId, name: nameInput.value.trim(), description: descInput.value.trim() });
    setStorage('ROLES', roles);

    const tbody = document.getElementById('rolesTableBody');
    if (tbody) {
        tbody.insertAdjacentHTML('beforeend', `
            <tr data-role-row="${roleId}">
                <td><strong>${escapeHtml(nameInput.value.trim())}</strong></td>
                <td>${escapeHtml(descInput.value.trim() || 'No description provided.')}</td>
                <td>0 Users</td>
                <td><span class="badge-role badge-custom">Custom</span></td>
                <td>
                    <div class="report-actions">
                        <button class="btn-action-sm btn-edit-role" onclick="editRole('${escapeHtml(nameInput.value.trim())}')"><i class="bx bx-edit"></i> Edit</button>
                        <button class="btn-action-sm btn-delete-role" onclick="deleteRole(this)"><i class="bx bx-trash"></i></button>
                    </div>
                </td>
            </tr>
        `);
    }

    showNotification('Role created successfully!', 'success');
    form.reset();
}

function editRole(name) {
    const nameInput = document.getElementById('roleName');
    if (!nameInput) return;
    nameInput.value = name;
    nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    nameInput.focus();
    showNotification(`Editing "${name}" — update the form and save.`, 'info');
}

function deleteRole(buttonEl) {
    if (!confirm('Are you sure you want to delete this role?')) return;
    const row = buttonEl.closest('tr');
    const roleId = row ? row.getAttribute('data-role-row') : null;

    if (roleId) {
        let roles = getStorage('ROLES');
        roles = roles.filter(r => r.id !== roleId);
        setStorage('ROLES', roles);
    }

    if (row) row.remove();
    showNotification('Role deleted.', 'info');
}

/* ==========================================================================
   18. SETTINGS
   ========================================================================== */
function setupSettingsTabs() {
    const tabButtons = document.querySelectorAll('.settings-nav-btn');
    if (tabButtons.length === 0) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.toggle('active', panel.id === target);
            });
        });
    });
}

function setSelectByText(id, text) {
    if (!text) return;
    const select = document.getElementById(id);
    if (!select) return;
    const match = Array.from(select.options).find(o => o.text === text);
    if (match) select.value = match.value;
}

function currencyLabel(symbol) {
    const map = { '$': 'USD ($)', '€': 'EUR (€)', '£': 'GBP (£)', '₹': 'INR (₹)' };
    return map[symbol] || null;
}

function loadSettings() {
    const settings = getSettings();
    const fieldMap = {
        schoolName: settings.schoolName,
        schoolEmail: settings.schoolEmail,
        schoolPhone: settings.schoolPhone,
        schoolAddress: settings.schoolAddress,
        sessionTimeout: settings.sessionTimeout,
        minPassword: settings.minPassword
    };

    Object.keys(fieldMap).forEach(id => {
        const el = document.getElementById(id);
        if (el && fieldMap[id] !== undefined) el.value = fieldMap[id];
    });

    setSelectByText('academicYear', settings.academicYear);
    setSelectByText('currency', currencyLabel(settings.currency));
    setSelectByText('timezone', settings.timezone);
    setSelectByText('dateFormat', settings.dateFormat);
}

function saveGeneralSettings(event) {
    if (event) event.preventDefault();
    const settings = getSettings();

    const schoolName = document.getElementById('schoolName');
    const schoolEmail = document.getElementById('schoolEmail');
    const schoolPhone = document.getElementById('schoolPhone');
    const schoolAddress = document.getElementById('schoolAddress');
    const academicYear = document.getElementById('academicYear');
    const currency = document.getElementById('currency');
    const timezone = document.getElementById('timezone');
    const dateFormat = document.getElementById('dateFormat');

    if (schoolName) settings.schoolName = schoolName.value.trim();
    if (schoolEmail) settings.schoolEmail = schoolEmail.value.trim();
    if (schoolPhone) settings.schoolPhone = schoolPhone.value.trim();
    if (schoolAddress) settings.schoolAddress = schoolAddress.value.trim();
    if (academicYear) settings.academicYear = academicYear.options[academicYear.selectedIndex].text;
    if (currency) {
        const match = currency.options[currency.selectedIndex].text.match(/\(([^)]+)\)/);
        settings.currency = match ? match[1] : '$';
    }
    if (timezone) settings.timezone = timezone.options[timezone.selectedIndex].text;
    if (dateFormat) settings.dateFormat = dateFormat.options[dateFormat.selectedIndex].text;

    setStorage('SETTINGS', settings);
    showNotification('General settings updated successfully!', 'success');
}

function saveSecuritySettings(event) {
    if (event) event.preventDefault();
    const settings = getSettings();

    const sessionTimeout = document.getElementById('sessionTimeout');
    const minPassword = document.getElementById('minPassword');

    if (sessionTimeout) settings.sessionTimeout = parseInt(sessionTimeout.value, 10) || 30;
    if (minPassword) settings.minPassword = parseInt(minPassword.value, 10) || 8;

    setStorage('SETTINGS', settings);
    showNotification('Security policy updated successfully!', 'success');
}

function saveNotificationSettings(event) {
    if (event) event.preventDefault();
    showNotification('Notification preferences updated successfully!', 'success');
}

function triggerBackup() {
    showNotification('Manual backup created successfully!', 'success');
}

/* ==========================================================================
   19. UTILITIES
   ========================================================================== */
function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/* ==========================================================================
   20. GLOBAL INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    checkAuthGuard();
    setupNavigation();
    loadCurrentUserIntoTopbar();
    setupGlobalSearch();

    // --- Login page ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // --- Dashboard ---
    if (document.getElementById('totalStudentsNum')) {
        loadDashboardMetrics();
    }

    // --- Students ---
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', saveStudent);
        renderStudentsTable();
    }

    // --- Teachers ---
    const teacherForm = document.getElementById('teacherForm');
    if (teacherForm) {
        teacherForm.addEventListener('submit', saveTeacher);
        renderTeachersTable();
    }

    // --- Classes ---
    const classForm = document.getElementById('classForm');
    if (classForm) {
        classForm.addEventListener('submit', saveClass);
        renderClassesTable();
    }

    // --- Subjects ---
    const subjectForm = document.getElementById('subjectForm');
    if (subjectForm) {
        subjectForm.addEventListener('submit', saveSubject);
        renderSubjectsTable();
    }

    // --- Attendance ---
    const attendanceTable = document.getElementById('attendanceTable');
    if (attendanceTable) {
        const attendanceDate = document.getElementById('attendanceDate');
        const attendanceClass = document.getElementById('attendanceClass');
        const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');

        if (attendanceDate) {
            attendanceDate.value = new Date().toISOString().split('T')[0];
            attendanceDate.addEventListener('change', renderAttendanceList);
        }
        if (attendanceClass) attendanceClass.addEventListener('change', renderAttendanceList);
        if (saveAttendanceBtn) saveAttendanceBtn.addEventListener('click', saveAttendance);

        renderAttendanceList();
    }

    // --- Fees ---
    const feeForm = document.getElementById('feeForm');
    if (feeForm) {
        feeForm.addEventListener('submit', saveFeeRecord);
        const filterClass = document.getElementById('filterClass');
        const filterStatus = document.getElementById('filterStatus');
        if (filterClass) filterClass.addEventListener('change', renderFeesTable);
        if (filterStatus) filterStatus.addEventListener('change', renderFeesTable);
        renderFeesTable();
    }

    // --- Exams ---
    const examForm = document.getElementById('examForm');
    if (examForm) {
        examForm.addEventListener('submit', saveExam);
        renderExamsTable();
    }

    // --- Reports ---
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', generateReport);
        renderGeneratedReportsTable();
    }

    // --- User Roles ---
    const roleForm = document.getElementById('roleForm');
    if (roleForm) {
        roleForm.addEventListener('submit', saveUserRole);
        renderRolesTable();
    }

    // --- Settings ---
    if (document.querySelector('.settings-nav-btn')) {
        setupSettingsTabs();
        loadSettings();

        const generalForm = document.getElementById('generalSettingsForm');
        if (generalForm) generalForm.addEventListener('submit', saveGeneralSettings);

        const securityForm = document.getElementById('securitySettingsForm');
        if (securityForm) securityForm.addEventListener('submit', saveSecuritySettings);

        const notificationsForm = document.getElementById('notificationsSettingsForm');
        if (notificationsForm) notificationsForm.addEventListener('submit', saveNotificationSettings);

        document.querySelectorAll('.btn-secondary-cancel').forEach(btn => {
            btn.addEventListener('click', () => {
                loadSettings();
                showNotification('Changes discarded.', 'info');
            });
        });
    }
});