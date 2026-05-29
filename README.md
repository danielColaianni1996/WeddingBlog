# WeddingBlog

Monorepo per il wedding blog di Daniel e Linda.

## Struttura

```text
src/
  WeddingBlogApp/  # React + TypeScript + Vite
  WeddingBlogBe/   # ASP.NET Core Web API
```

## Frontend

```bash
cd src/WeddingBlogApp
npm install
npm run dev
npm run build
npm run lint
```

## Backend

```bash
dotnet restore WeddingBlog.slnx
dotnet run --project src/WeddingBlogBe/WeddingBlogBe.csproj
```

In sviluppo il backend espone OpenAPI e accetta chiamate CORS dalla Vite app su `http://localhost:5173`.
