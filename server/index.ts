import dotenv from 'dotenv';


dotenv.config();
import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';
import router from './routes/authRouter';

console.log("🔥 EXPRESS IS BOOTING UP. ROUTER ATTACHED:", !!router);

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

// Helper function to retry with exponential backoff AND model fallback
async function generateWithModelFallback(aiClient:any, prompt:any, schemaConfig:any) {
  // List of models to try in order of preference
  const modelsToTry = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-1.5-flash'];

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting generation with model: ${modelName}...`);
      
      const response = await aiClient.models.generateContent({
        model: modelName,
        contents: prompt,
        config: schemaConfig
      });

      return response; // Success! Return response immediately
    } catch (error:any) {
      console.warn(`Model ${modelName} failed with status ${error.status || 'unknown'}.`);
      
      // If it's a 503 (High Demand), loop to the next model in the list
      if (error.status === 503 || error.status === 404) {
        continue; 
      } else {
        throw error; // Throw other critical errors (like bad keys) immediately
      }
    }
  }

  throw new Error('All backup Gemini models are currently experiencing high demand. Please try again shortly.');
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

    const schemaConfig = {
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
    };

    // Call using the multi-model fallback wrapper
    const response = await generateWithModelFallback(ai, prompt, schemaConfig);

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