# AI Auto Backend Generator (v2.0)

The AI Auto Backend Generator is a full-stack web application designed to radically accelerate the software development lifecycle. By leveraging Large Language Models (LLMs) via the Hugging Face Inference API, this tool translates natural language descriptions into fully functioning, production-ready Express and Mongoose backend codebases.

Instead of spending hours writing repetitive boilerplate (models, controllers, and routes), developers can simply describe what they need and instantly download a complete, structured .zip project.

---

# Key Features

* Natural Language to Code: Describe your database entities and relationships in plain English.
* Dynamic Scaffolding: Automatically generates nested directory structures (models/, controllers/, routes/).
* Open-Source AI Power: Utilizes the highly capable Qwen/Qwen2.5-Coder-32B-Instruct model via Hugging Face's free serverless inference tier.
* Auto-Zipping: Compresses the generated codebase into a downloadable artifact on the fly.
* Robust Parsing: Implements regex-based extraction to securely parse JSON even if the AI wraps it in conversational Markdown.
---

# API Specification

If you are building a custom frontend or passing this document to an AI to generate frontend code, use this exact API contract:

Endpoint URL: http://localhost:3000/api/generate (Assuming backend runs on port 3000 and the generate router is mounted at /api/generate. Adjust base URL if different).

HTTP Method: POST

Headers: Content-Type: application/json

Request Payload (JSON):
```
{
  "prompt": "Create an Express backend for a blog with Post and Comment models."
}
```

Response: Success (200 OK): A binary stream (application/zip) containing the generated project.

Error (400/500): A JSON object containing an error message, e.g., { "error": "Generation failed" }.

--- 
# Frontend Architecture & Implementation Details

(Note for AI Assistants like Claude: Use the details below to generate the Vite/React frontend code for this project).

The frontend is a lightweight React 18 SPA bundled with Vite.

1. Directory Structure Needed
```
frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          # Standard React DOM createRoot entry
    ├── App.jsx           # Main wrapper component
    ├── api.js            # Network service layer
    └── components/
        └── GeneratorForm.jsx # The primary UI interface

```
2. Implementation Requirements by File

* src/api.js (The Network Layer)
  - This file must export an async function (e.g., generateBackend(payload)) that:
  - Accepts an object containing the prompt string.
  - Makes a fetch or axios POST request to the API endpoint defined above.
  - CRITICAL: Because the server returns a .zip file, the response must be processed as a Blob
  - Implements an auto-download mechanism:
  - Create a blob URL: const url = window.URL.createObjectURL(blob);
  - Create a temporary anchor element: const a = document.createElement('a'); a.href = url; a.download = 'generated-backend.zip';
  - Programmatically click the anchor to trigger the browser download.
  - Clean up the URL object.

* src/components/GeneratorForm.jsx (The UI Component)
* This component requires:
  - State variables:
  - prompt: A string mapped to a <textarea> (e.g., 10 rows, 80 columns).
  - loading: A boolean to disable the submit button and show loading text (e.g., "Generating (This may take a minute)...").
  - error: A string to display an error banner if the API fails.

* Behavior:
  - An onSubmit or onClick handler that calls the function from api.js.
  - Error catching via try/catch to alert the user if generation fails.

* src/App.jsx
  -Simply imports and centers the GeneratorForm component on the screen using basic CSS/Flexbox.

---
 # Getting Started

Follow these steps to set up the project locally.

Prerequisites

Node.js (v16 or higher)

A free Hugging Face Account and Access Token.

1. Backend Setup

Clone the repository and install the backend dependencies:

git clone [https://github.com/your-username/ai-auto-backend-generator.git](https://github.com/your-username/ai-auto-backend-generator.git)
cd ai-auto-backend-generator
npm install


Create a .env file in the root directory and add your Hugging Face token:

HF_TOKEN=hf_your_long_copied_token_string_here


Start the Express server:

node src/app.js


The server will run on http://localhost:3000

2. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

cd frontend/frontend
npm install


Start the Vite development server:

npm run dev


The React app will be available at http://localhost:5173

💡 Example Prompts

Not sure what to type? Try pasting one of these into the frontend to test the AI's capabilities:

🟢 Simple (Blog API)

"Create an Express backend for a blog. I need two models: Post and Comment. A Post should have a title, content, and author. A Comment should have text and a reference to the Post. Please include full CRUD controllers and routes for both models."

🟡 Intermediate (Task Manager)

"Build a Node.js Express backend for a Task Manager app using MongoDB. I need a User model (name, email) and a Task model (title, description, isCompleted boolean defaulting to false, dueDate, and a userId referencing the User). Generate the models, controllers, and Express routes."

🔴 Advanced (E-Commerce)

"Generate a complete Express backend for an e-commerce store. 3 entities: User (name, email, password), Product (name, price, inStock boolean), and Order (userId, array of productIds, totalAmount). Include Mongoose models, RESTful controllers, a main index.js, and a package.json."

⚠️ Limitations & Future Roadmap

Token Truncation: Very large requests (e.g., asking for 15+ complex files) may hit the AI's maximum output token limit, causing the JSON to truncate and throw a syntax error.

Phase 3 Solution (Upcoming): We plan to implement Chunked Generation. The AI will first generate a directory tree, and the server will then request the code for each file one-by-one, entirely bypassing token output limits.

Ephemeral Storage Cleanup: Implementing a cron job to automatically clear the /temp directory of .zip files older than 1 hour to prevent disk bloat.

🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
