# DevSpec.AI

Generate personalized project specifications based on your tech stack, career goal, and experience level. Powered by Cohere AI.

**Live:** [devspecai.onrender.com](https://devspecai.onrender.com)

> Hosted on Render's free tier — first request may take a few minutes (cold start).

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 + Spring Boot 3.5 | REST API |
| Cohere AI API | AI-powered spec generation |
| Lombok | Boilerplate reduction |
| Docker | Containerization |
| Render | Deployment |

---

## API

### `POST /api/spec`

Generates a project specification based on user input.

**Request**
```json
{
  "technologies": "Java, Spring Boot, Redis",
  "professionalLevel": "JUNIOR",
  "careerObjective": "Backend developer role at a fintech"
}
```

`professionalLevel` accepts: `JUNIOR` | `MID` | `SENIOR`

**Response**
```json
{
  "spec": "..."
}
```

---

## Running locally

```bash
cd backend
./mvnw clean install -DskipTests
./mvnw spring-boot:run
```

Runs on `http://localhost:8080`

Set the required environment variable before running:

```bash
export COHERE_API_KEY=your_key_here
```

---

## Built by

[Alberto Dumontt](https://www.albertodumontt.com/)
