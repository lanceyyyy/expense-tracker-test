# 📌 Expense Tracker App

An **Expense Tracker Web App** built using **React, TanStack Table, Recharts, and ShadCN** for managing and visualizing expenses.

## 🎯 Features

✅ **Add, Edit, Delete Expenses**  
✅ **Store Expenses in `localStorage`** for persistence  
✅ **Sort Expenses by Date (Ascending/Descending)**  
✅ **Filter by Month & Year**  
✅ **Search Expenses** with Global Search  
✅ **Responsive UI** using TailwindCSS  
✅ **Visualize Expenses** with a Pie Chart

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### Install node modules

```bash
npm install
# or
npm install --force
```

### Run Locally

```
npm run dev
```

## 📁 Project Structure

```bash
📂 src
├── 📂 components
│    ├── 📂 ui/ # UI components from ShadCN
│    ├── ExpenseForm.jsx # Form to add/edit expenses
│    ├── ExpenseTable.jsx # Table displaying expenses
│    ├── ExpenseGraph.jsx # Pie chart visualization
│    ├── ExpenseCards.jsx # Summary cards
│    ├── ExpenseTracker.jsx # Main
│    ├── ThemeToggle.jsx # Light/Dark mode toggle
├── hooks
│    ├── useWidthSize.js # Custom hook for responsive design
├── 📂 public
├── 📜 package.json
├── 📜 README.md
└── ...
```

---

### 📌 Component Breakdown

🔹 Expense Form (ExpenseForm.jsx)

- Allows users to add or edit expenses.
- Stores form state using useState.
- Updates localStorage when submitting.

🔹 Expense Table (ExpenseTable.jsx)

- Displays all expenses in a structured table.
- Supports:
  - Sorting (ascending/descending by date)
  - Filtering (by month/year)
  - Global search
  - Pagination
- Uses TanStack Table for efficient rendering.

🔹 Expense Graph (ExpenseGraph.jsx)

- Uses Recharts to display monthly expenses as a Pie Chart.
- Automatically updates when expenses change.

🔹 Custom Hook (useWidthSize.js)

- Tracks screen width changes dynamically.
- Helps with responsive UI adjustments.

### 🎨 Customization

- Modify colors, fonts, and UI styles inside:

  - tailwind.config.js
  - components/ui/

## 🚀 Improvements that can be made

### Authentication & User Accounts

- Add user authentication using Firebase Auth, Supabase, or NextAuth.
- Allow users to sign in & manage their own expenses instead of using localStorage.

### Database Storage (Instead of localStorage)

- Use Database to store expenses securely.
- This allows multi-device sync and persistent data storage.

### Export & Import Expenses

- Allow users to download their expenses as a CSV or JSON file.
- Implement an import feature to load expenses from a file.
