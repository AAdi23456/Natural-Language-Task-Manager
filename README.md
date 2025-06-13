# Natural Language Task Manager

An enterprise-grade To-Do List application that parses natural language tasks using AI. Built with Next.js, Express, and OpenAI.

## Features

- **Natural Language Input**: Add tasks in natural language like "Finish landing page Aman by 11pm 20th June"
- **Automatic Parsing**: AI extracts task name, assignee, due date/time, and priority
- **Editable Tasks**: Modify task details directly in the UI
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Tasks are saved in your browser
- **Dark Mode**: Toggle between light and dark themes
- **CSV Export**: Export your tasks to a CSV file
- **Delete Tasks**: Remove tasks you no longer need

## Project Structure

```
/
├── frontend/           # Next.js frontend application
├── backend/           # Express.js backend API
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Git

### Clone and Install

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Natural-Language-Task-Manager
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. Backend Configuration:
   - Create `backend/.env`:
     ```env
     PORT=3001
     OPENAI_API_KEY=your_openai_api_key_here
     ```

2. Frontend Configuration:
   - Create `frontend/.env.local`:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

### Start Development Servers

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

- Frontend code is in the `frontend` directory
  - Built with Next.js 14 (App Router)
  - Uses Tailwind CSS for styling
  - TypeScript for type safety
  - See frontend/README.md for more details

- Backend code is in the `backend` directory
  - Express.js API server
  - OpenAI integration for task parsing
  - TypeScript for type safety
  - See backend/README.md for more details

## API Documentation

### POST /api/parse-task
Parses a natural language task description into structured data.

Request:
```json
{
  "taskText": "Finish landing page Aman by 11pm 20th June"
}
```

Response:
```json
{
  "id": "1234567890",
  "description": "Finish landing page",
  "assignee": "Aman",
  "dueDate": "2024-06-20T23:00:00.000Z",
  "priority": "P3"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security Notes

- Never commit your `.env` files
- Keep your OpenAI API key secure
- Use environment variables for sensitive data
- Frontend uses HTTPS in production
- API includes basic request validation

## License

This project is licensed under the MIT License - see the LICENSE file for details