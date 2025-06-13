# Natural Language Task Manager - Backend

This is the backend service for the Natural Language Task Manager application. It provides a REST API for parsing natural language task descriptions using OpenAI's GPT-3.5 model.

## Tech Stack

- Node.js with Express
- TypeScript
- OpenAI API
- CORS for cross-origin requests
- dotenv for environment variables

## API Endpoints

### GET /
- Health check endpoint
- Returns: Simple text message confirming the API is running

### POST /api/parse-task
- Parses a natural language task description
- Request Body:
  ```json
  {
    "taskText": "Finish landing page Aman by 11pm 20th June"
  }
  ```
- Response:
  ```json
  {
    "id": "1234567890",
    "description": "Finish landing page",
    "assignee": "Aman",
    "dueDate": "2024-06-20T23:00:00.000Z",
    "priority": "P3"
  }
  ```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   PORT=3001
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

- `PORT`: The port number for the server (default: 3001)
- `OPENAI_API_KEY`: Your OpenAI API key

## Project Structure

```
backend/
├── src/
│   ├── server.ts    # Main server file
│   └── types.ts     # TypeScript type definitions
├── package.json     # Project dependencies and scripts
└── tsconfig.json   # TypeScript configuration
```

## Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm test`: Run tests (not implemented yet)

## Error Handling

The API includes basic error handling for:
- Missing task text
- OpenAI API errors
- Invalid JSON responses
- Server errors

## Security

- CORS is enabled for frontend access
- Environment variables for sensitive data
- Input validation for API endpoints 