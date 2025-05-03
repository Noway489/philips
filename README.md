# Philips Smart Feedback

A system for collecting user feedback and predicting sentiment using a React frontend, Flask backend, PostgreSQL for storage, and Hugging Face & Google Gemini for AI-driven question generation and sentiment analysis.

## Features

* Dynamic feedback question generation via Google Gemini (Gemini 2.5 Flash)
* Multi-step feedback dialog with text and voice input
* Sentiment analysis using `cardiffnlp/twitter-xlm-roberta-base-sentiment` model
* Feedback storage in PostgreSQL
* Accessible UI components using shadcn-UI & Radix primitives

## Tech Stack

* **Frontend:** Next.js 14 / React, TypeScript, Tailwind CSS, shadcn-UI
* **Backend:** Flask, Python, Flask-CORS, Flask-SQLAlchemy
* **Database:** PostgreSQL
* **AI Services:** Google Gen AI SDK for Gemini, Hugging Face Transformers

## Prerequisites

* Node.js 16+ and npm
* Python 3.10+
* PostgreSQL
* Git

## Project Structure

```
philips-backend/
├── .env              # environment variables
├── app.py            # Flask application factory
├── config.py         # configuration loader
├── extensions.py     # SQLAlchemy instance
├── models.py         # database models
├── gemini_client.py  # question generation client
├── huggingface_client.py # sentiment analysis client
├── routes/           # Flask blueprints
├── services/         # business logic
└── utils/            # logger, helpers

Philips-frontend-main/
├── .env.local        # frontend env vars
├── next.config.js
├── app/
│   ├── page.tsx      # home page with FeedbackDialog
│   └── api/
│       └── gemini/route.ts
├── components/
│   └── feedback/     # FeedbackButton, FeedbackDialog, VoiceInput
├── hooks/            # useToast
└── lib/              # utils
```

## Environment Variables

Create `.env` in `philips-backend/`:

```dotenv
DB_USER=philips_user
DB_PASS=Noway@12
DB_HOST=localhost
DB_PORT=5432
DB_NAME=philips_db
FLASK_ENV=development
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_key
CORS_ALLOWED_ORIGINS=http://localhost:3000
HF_HOME=/path/to/hf/cache
```

Create `.env.local` in `Philips-frontend-main/` (if using custom API URL):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend Setup

1. Navigate to `philips-backend/`
2. Create & activate virtualenv:

   ```bash
   python -m venv venv
   source venv/bin/activate  # or .\venv\Scripts\activate.ps1
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Initialize DB tables:

   ```bash
   python app.py
   ```

   (tables auto-created on startup)
5. API runs at `http://localhost:5000/api`

## Frontend Setup

1. Navigate to `Philips-frontend-main/`
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run dev server:

   ```bash
   npm run dev
   ```
4. App runs at `http://localhost:3000`

## Usage

1. Open `http://localhost:3000`
2. Click **Feedback** button
3. Answer generated questions via text or voice
4. On submit, view predicted sentiment toast

## API Endpoints

* **GET** `/api/health` → `{ status: "ok" }`
* **POST** `/api/questions` → `{ questions: [string] }` (body: `{ pageContext: string }`)
* **POST** `/api/feedback` → `{ sentiment: string, score: number }` (body: `{ pageContext: string, userResponse: string }`)

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

## License

MIT © Philips Smart Feedback Team
