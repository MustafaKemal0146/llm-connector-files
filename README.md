# LLM Connector

LLM Connector is a modern web application that allows you to manage and interact with multiple AI providers (OpenAI, Google AI, Anthropic) through a single, unified interface.

## Features

- 🔐 Secure API key management
- 💬 Real-time chat interface
- 📊 Usage statistics and analytics
- 🌓 Dark/Light theme support
- 📝 Markdown and code syntax highlighting
- 📱 Responsive design

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Supabase (Auth & Database)
- Chart.js for analytics
- React Router for navigation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Setup

Make sure you have:
- Node.js 18 or higher
- A Supabase project
- API keys for the AI providers you want to use

## License

MIT