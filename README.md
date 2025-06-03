# DJ Set Creator

This project provides a small web interface that uses the OpenAI API to generate custom DJ set suggestions with Bandcamp links and instructions on how to mix the tracks.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-key-here
   ```

3. Start the server:
   ```bash
   node server.js
   ```

The application will be available at `http://localhost:3000`.

Enter a prompt describing the style or mood of the DJ set and press **Generate DJ Set** to receive a list of tracks with mixing instructions.
