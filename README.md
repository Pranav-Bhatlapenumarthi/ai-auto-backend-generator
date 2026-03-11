# AI Auto Backend Generator

The **AI Backend Generator** is a system designed to automatically generate backend scaffolding based on structured specifications. The system allows users to provide backend requirements in **JSON format** through a frontend interface. The backend service processes this specification and dynamically generates a backend project structure including **models, controllers, and routes**.

The generated project is packaged into a **downloadable ZIP file**.

The goal of the project is to reduce the time required to manually create boilerplate backend code and provide a scalable foundation for **future AI-assisted backend generation**.

---

# Objectives

The primary objectives of the system are:

- Automate backend scaffolding generation  
- Provide a simple frontend interface for users to submit backend specifications  
- Dynamically generate backend project structures  
- Package the generated project as a downloadable artifact  
- Build a scalable architecture that allows future integration with AI models  

---

# Functional Requirements

## FR1: Backend Specification Input

The system must accept backend specifications from the frontend in **JSON format**.

### Example

```json
{
  "projectName": "shop-api",
  "entities": [
    {
      "name": "User",
      "fields": [
        { "name": "email", "type": "String" },
        { "name": "password", "type": "String" }
      ]
    }
  ]
}
```
## FR2: Backend Project Generation

The system must dynamically generate a backend project structure based on the specification.

### Generated Structure
```
project-name/
    models/
    controllers/
    routes/
```

## FR3: Template-Based File Generation

The system must generate code files using predefined templates.

### Generated files include:

- Model files
- Controller files
- Route files

## FR4: ZIP Packaging

The system must compress the generated backend project into a ZIP file before sending it to the client.

## FR5: API Endpoint

The backend must expose an API endpoint:
```
POST /api/generate
```
This endpoint accepts JSON specifications and returns the generated backend ZIP file.

## FR6: Frontend Integration

The frontend must provide an interface where users can:

- Enter backend specification JSON
- Send request to backend API
- Download generated backend ZIP file

---

# Requirements
```
express
archiver
cors
dotenv
fs
fs-extra
```
