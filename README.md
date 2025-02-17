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
git clone https://github.com/lanceyyyy/expense-tracker-test.git
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

# Submission Explanation

When developing the expense tracker app, I made several key choices to ensure usability, simplicity, and efficiency.

#### Tech Stack – Next.js

I chose Next.js primarily for its React-based framework, making it easier to structure the app. Since this is a client-side application, I did not use server-side rendering (SSR) or API routes. Instead, I handled all data storage using localStorage, allowing users to persist their expenses without requiring a backend. This approach keeps the app lightweight and accessible without additional infrastructure.

#### Data Storage – localStorage

I used localStorage to store expense data directly in the user's browser. This eliminates the need for a database and provides a simple way to persist data across sessions. While this method works well for a expense tracker, it does have limitations, such as no automatic syncing across devices.

#### Data Visualization – Recharts

For the graph, I chose Recharts because it integrates well with React and provides an easy way to display expense trends visually. This helps users analyze their spending habits in an intuitive format.

#### Table Management – TanStack Table

I used TanStack Table to create an interactive and efficient expense table. It supports sorting, filtering, and pagination, making it easier for users to navigate their expenses effectively.

#### UI/UX & Design Challenges

One of the biggest challenges I faced was designing the interface and selecting a color palette. I wanted the app to feel modern, clean, and readable, but choosing the right colors took time. I experimented with multiple color schemes to balance aesthetics and usability, ensuring good contrast for readability and a visually appealing layout.

### How the Solution Meets the Objective

1. Providing an intuitive form for users to add expenses.

2. Offering a structured table for managing and viewing expenses.

3. Using a graph to visually represent expenses.

4. Implementing localStorage to persist data without a backend.

5. Designing a simple and user-friendly UI to enhance usability.

6. By leveraging Next.js for UI structure, localStorage for data persistence, Recharts for visualization, and TanStack Table for data management, the app is an efficient, lightweight, and user-friendly solution for tracking expenses.
