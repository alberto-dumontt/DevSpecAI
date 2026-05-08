# dev for devs — 1:n · one to many

A free, open space for developers to grow together — no paywall, no empty promises.  
One dev shares knowledge, many devs benefit.

**Live:** [devspecai.onrender.com](https://devspecai.onrender.com)

> Hosted on Render's free tier — first request may take a few minutes (cold start).

---

## What is this?

**dev for devs** is a community platform built for developers at every stage of their career — whether you're writing your first line of code, switching paths, or leveling up. The platform brings together practical tools, curated study paths, community discussions, and developer recommendations in one place.

This is not a product. It's a community being built.

---

## Features

### DevSpec.AI
Generate personalized project specifications based on your tech stack, career goal, and experience level. Powered by Cohere AI.

### Roadmaps
Curated study paths recommended by developers from the community. Each roadmap includes step-by-step guidance, project ideas, and real-world context.

- **Backend for Beginners** — recommended by Alberto Dumontt, Backend Engineer

### Community
A social feed where developers share experiences, ask technical questions, discuss the market, and connect with each other.

### Recommendations
A collaborative showcase of tools recommended by developers, for developers. Each card includes a description, tags, and the dev who recommended it.

---

## Tech Stack

**Frontend**

| Technology | Purpose |
|---|---|
| React 19 + Vite 6 | UI framework and build tool |
| React Router v6 | Client-side routing |
| react-i18next | Internationalization (EN / PT-BR) |
| JetBrains Mono | Typography |

**Backend**

| Technology | Purpose |
|---|---|
| Java 21 + Spring Boot | REST API |
| Cohere AI API | AI-powered spec generation |
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

**Backend**

```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

Runs on `http://localhost:8080`

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

## About

Built by [Alberto Dumontt](https://www.albertodumontt.com/).  
If you're a dev and want to contribute, you're welcome here.
