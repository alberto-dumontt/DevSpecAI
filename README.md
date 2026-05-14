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
  "careerObjective": "Backend developer role at a fintech",
  "language": "English"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `technologies` | `string` | yes | Technologies to apply in the project |
| `professionalLevel` | `string` | yes | `JUNIOR` \| `MID` \| `SENIOR` |
| `careerObjective` | `string` | yes | Target role or career goal |
| `language` | `string` | yes | Language for the generated spec (e.g. `English`, `Português`, `Español`) |

**Response**
```json
{
  "spec": "..."
}
```

**Error response**
```json
{
  "errorCode": "ValidationError",
  "errorMensagem": null,
  "details": ["Language cannot be blank"],
  "status": 400,
  "path": "/api/spec"
}
```

Every response includes an `X-Correlation-ID` header for request traceability.

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

## Logging

Structured logs are written to the console and to `logs/DevSpecAI.log` (rolling daily, max 10 MB per file, 30 days retention).

Each request is tagged with a correlation ID visible in every log line:

```
2025-05-13 14:22:01.123 [http-nio-8080-exec-1] INFO  [corrId=a1b2c3d4-...] c.a.d.filter.LoggingFilter - Incoming request: POST /api/spec | ip=... | user-agent=...
```

---

## Built by

[Alberto Dumontt](https://www.albertodumontt.com/)
