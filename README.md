# Rest API Basics
--------------
## Task Management REST API
A simple RESTful API built with Node.js and Express for managing tasks. This project demonstrates basic CRUD operations and REST principles.

## Features

- Create, Read, Update, and Delete tasks
- In-memory data storage
- Input validation
- Error handling
- Health check endpoint

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a specific task |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Task Structure

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "createdAt": "2025-08-24T11:00:00.000Z",
  "updatedAt": "2025-08-24T11:00:00.000Z"
}
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Danish1875/Rest_API_basic.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node app.js
```

The API will be available at `http://localhost:3000`

## Example Usage

### Create a task
```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Learn Node.js","description":"Build a REST API"}'
```

### Get all tasks
```bash
curl http://localhost:3000/tasks
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request
- 404: Resource not found
- 500: Server error

## Technologies Used

- Node.js
- Express.js
- JavaScript

## Project Structure

- `app.js` - Main application file with route definitions
- `package.json` - Project dependencies and scripts
- `.gitignore` - Git ignore rules
