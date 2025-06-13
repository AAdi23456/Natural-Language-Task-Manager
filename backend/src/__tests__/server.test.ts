import request from 'supertest';
import express, { Express } from 'express';
import { OpenAI } from 'openai';
import cors from 'cors';

// Mock OpenAI
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    description: 'Finish landing page',
                    assignee: 'Aman',
                    dueDate: '2023-06-20T23:00:00.000Z',
                    priority: 'P3'
                  })
                }
              }
            ]
          })
        }
      }
    }))
  };
});

// App setup
const setupApp = (): Express => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.post('/api/parse-task', async (req, res) => {
    try {
      const { taskText } = req.body;

      if (!taskText) {
        return res.status(400).json({ error: 'Task text is required' });
      }

      const openai = new OpenAI({ apiKey: 'mock-key' });
      
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
        id: 'mock-id-123',
        ...parsedTask
      };

      return res.status(200).json(task);
    } catch (error) {
      console.error('Error parsing task:', error);
      return res.status(500).json({ error: 'Failed to parse task' });
    }
  });
  
  return app;
};

describe('Task Parser API', () => {
  let app: Express;
  
  beforeEach(() => {
    jest.clearAllMocks();
    app = setupApp();
  });
  
  test('POST /api/parse-task returns parsed task data', async () => {
    const response = await request(app)
      .post('/api/parse-task')
      .send({ taskText: 'Finish landing page Aman by 11pm 20th June' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 'mock-id-123',
      description: 'Finish landing page',
      assignee: 'Aman',
      dueDate: '2023-06-20T23:00:00.000Z',
      priority: 'P3'
    });
  });
  
  test('POST /api/parse-task without taskText returns 400', async () => {
    const response = await request(app)
      .post('/api/parse-task')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Task text is required' });
  });
}); 