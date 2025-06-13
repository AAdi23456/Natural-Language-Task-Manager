import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;


// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', function(_req: Request, res: Response) {
  res.send('Natural Language Task Manager API');
});

// API endpoint to parse tasks
app.post('/api/parse-task', function(req: Request, res: Response) {
  const handleParseTask = async () => {
    try {
      const { taskText } = req.body;

      if (!taskText) {
        return res.status(400).json({ error: 'Task text is required' });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Extract the following from a task description:
            1. Task name
            2. Assignee (if any)
            3. Due date and time (if any)
            4. Priority (default is P3 unless P1, P2, or P4 is specified)
            
            Respond with a JSON object with these fields:
            {
              "description": "task name",
              "assignee": "person name or null",
              "dueDate": "ISO date string or null",
              "priority": "P1/P2/P3/P4"
            }`
          },
          {
            role: "user",
            content: taskText
          }
        ],
        response_format: { type: "json_object" }
      });

      const parsedTask = JSON.parse(completion.choices[0].message.content || '{}');
      
      // Generate a unique ID for the task
      const task = {
        id: Date.now().toString(),
        ...parsedTask
      };

      return res.status(200).json(task);
    } catch (error) {
      console.error('Error parsing task:', error);
      return res.status(500).json({ error: 'Failed to parse task' });
    }
  };

  handleParseTask();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 