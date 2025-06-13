# Natural Language Task Manager - Frontend

A modern, responsive web application for managing tasks using natural language processing. Built with Next.js and Tailwind CSS.

## Features

- **Natural Language Input**: Add tasks using natural language
- **Smart Parsing**: Automatically extracts task details, assignees, due dates, and priorities
- **Task Management**: Edit, delete, and view tasks in a clean interface
- **Dark Mode**: Toggle between light and dark themes
- **Export**: Download tasks as CSV
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Tasks persist between sessions

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- date-fns for date formatting
- Local Storage for data persistence

## Project Structure

```
frontend/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout with theme support
│   └── page.tsx         # Main page component
├── components/          # React components
│   ├── task-input/     # Task input form
│   ├── task-list/      # Task list and items
│   ├── export-csv/     # CSV export functionality
│   ├── theme-toggle/   # Dark mode toggle
│   └── ui/             # Shared UI components
├── lib/                # Utility functions and types
│   ├── api.ts         # API client functions
│   └── types.ts       # TypeScript types
└── public/            # Static assets
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Components

### TaskInput
- Handles natural language task input
- Communicates with backend for task parsing
- Shows loading and error states

### TaskList & TaskItem
- Displays tasks in a clean, organized layout
- Supports inline editing of all task fields
- Delete functionality with confirmation
- Priority-based color coding

### ExportCSV
- Exports tasks to CSV format
- Handles date formatting
- Escapes special characters

### ThemeToggle
- Toggles between light and dark themes
- Persists preference in localStorage
- Respects system color scheme

## Styling

- Tailwind CSS for utility-first styling
- Dark mode support with `dark:` variants
- Responsive design with mobile-first approach
- Consistent color scheme and spacing

## State Management

- React useState for component state
- localStorage for data persistence
- Context-free architecture for simplicity

## Error Handling

- Form validation
- API error handling
- Fallback UI for loading states
- Error boundaries for component errors

## Future Improvements

- Add authentication
- Implement real-time updates
- Add task categories/tags
- Add task search and filtering
- Add task sorting options
- Add task due date notifications
