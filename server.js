const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/generate', async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' });
  }
  try {
    const userPrompt = `Create a DJ set with bandcamp links and instructions for mixing each track based on the following prompt: "${prompt}"`;
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful DJ set generator.' },
        { role: 'user', content: userPrompt }
      ]
    });
    const text = response.data.choices[0].message.content;
    res.json({ result: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate DJ set' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
