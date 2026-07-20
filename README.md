# EduManage — Student Management System

A front-end Student Management System dashboard built with vanilla HTML, CSS, and JavaScript. All data is persisted locally in the browser via `localStorage` — no backend or database required.

## Features

- **Authentication** — login/logout flow with a demo user account
- **Dashboard** — live counts of students, teachers, classes, and fees collected
- **Students** — add, view, and delete student records
- **Teachers** — add, view, and delete teacher records
- **Classes** — create classes with sections and assigned class teachers
- **Subjects** — manage curriculum subjects and assigned teachers
- **Attendance** — mark daily attendance (Present / Absent / Late) per class, per date
- **Fees** — record fee payments, filter by class/status, print receipts
- **Exams** — schedule exams with subject and date
- **Reports** — generate and export/print summary reports
- **User Roles** — create custom roles and manage permissions
- **Settings** — institution info, security policy, notifications, and backup, organized into tabs

## Getting Started

No build step or server is required.

1. Download/unzip all files into a single folder (keep them together — the pages link to each other by relative path).
2. Open `index.html` in a browser.
3. Log in with the demo credentials:
   - **Username:** `admin`
   - **Password:** `password123`

> Tip: If you open the files with `file://` and something looks off, serve the folder with any static server instead (e.g. `python3 -m http.server`) — this avoids browser restrictions some setups apply to local files.

## Project Structure

```
index.html         Login page
dashboard.html      Overview: live stats + recent enrollments
student.html         Student management
teacher.html         Teacher management
class.html           Class management
subject.html         Subject management
attendance.html      Daily attendance marking
fee.html              Fee collection & receipts
exam.html             Exam scheduling
report.html           Report generation
role.html             User roles & permissions
setting.html          System settings (tabbed)
index.css             Shared stylesheet
script.js              All application logic (auth, CRUD, storage, UI bindings)
```

## How Data Is Stored

Everything is saved to the browser's `localStorage` under a handful of namespaced keys (students, teachers, classes, subjects, attendance, fees, exams, roles, settings, current user). This means:

- Data persists between visits **in the same browser**.
- Data is **not shared** across different browsers or devices.
- Clearing site data / browser storage will reset the app back to its seeded sample data.

## Notes

- This is a front-end demo/prototype — there is no real server-side validation or security. Don't use the demo login pattern in production.
- To reset all data, clear `localStorage` for the site (or open DevTools → Application → Local Storage → delete the `app_*` keys).
