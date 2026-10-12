import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';
import router from './routes/authRouter';

dotenv.config();

console.log("API Key Status:", process.env.GEMINI_API_KEY ? "Loaded Successfully!" : "MISSING ❌");

const app = express();
const PORT = process.env.PORT || 8003;

import './models/dbConnections';

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/auth', router);

async function generateWithRetry(aiClient:any, payload:any, maxRetries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await aiClient.models.generateContent(payload);
    } catch (error:any) {
      
      if (error.status === 503 && attempt < maxRetries) {
        console.warn(`Gemini model experiencing high demand (503). Retrying attempt ${attempt} of ${maxRetries} in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
}

// Inside your POST endpoint:
app.post('/api/analyze-disaster', async (req, res) => {
  try {
    const { locationName, weatherData } = req.body;

    const prompt = `
      You are an expert meteorological disaster risk analyst. 
      Analyze the following recent and forecasted weather data for location: "${locationName}".
      Weather data payload: ${JSON.stringify(weatherData)}

      Evaluate potential natural hazards (such as flash floods, droughts, heatwaves, heavy winds, or landslides).
      Provide a risk assessment structured strictly as JSON matching the requested schema.
    `;

    // Call Gemini with the auto-retry wrapper
    const response = await generateWithRetry(ai, {
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: {
              type: Type.STRING,
              enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'],
              description: 'The overall disaster risk level based on the environmental data.'
            },
            title: {
              type: Type.STRING,
              description: 'A clear title summarizing the hazard advisory.'
            },
            summary: {
              type: Type.STRING,
              description: 'A 2-3 sentence summary explaining why this risk level was assigned based on metrics like rain, wind speed, or soil moisture.'
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 practical, actionable safety suggestions for the user.'
            }
          },
          required: ['riskLevel', 'title', 'summary', 'suggestions']
        }
      }
    });

    const resultJson = JSON.parse(response.text);
    res.json(resultJson);

  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ error: 'Failed to analyze disaster risk due to high server demand. Please try again in a moment.' });
  }
});

// 6. Start Server (Must be at the VERY BOTTOM)
app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});