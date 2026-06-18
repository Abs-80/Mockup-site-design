import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client (Lazy-initialized to prevent server crash if key is missing)
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI functions will use helpful offline fallbacks.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API Routes

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. Q&A endpoint for learning about Christianity & Faith reflections
app.post("/api/q-and-a", async (req, res) => {
  try {
    const { question, history } = req.body;
    if (!question) {
      res.status(400).json({ error: "Question parameter is required" });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      // Warm, beautiful offline fallbacks if API key is missing
      res.json({
        text: `Thank you for asking about "${question}". Currently, our AI Reflection system is in offline preview mode because the GEMINI_API_KEY secret is not set. 

Here is a supportive thought:
In Christian theology, questions are vital steps to uncovering deep truths about God, grace, and community. Koinonia (" fellowship ") represents coming together in our seeking. For immediate guidance, we encourage reading **1 John 4:11** ("Beloved, if God so loved us, we also ought to love one another") and exploring our digital curriculum resources above! If there's a particular prayer you need, feel free to add it to our Prayer Wall.`
      });
      return;
    }

    const ai = getAi();
    
    // Core instruction for a warm, welcoming, Christian-educational, bringing-people-together guide
    const systemInstruction = `You are the Koinonia Gather Spirit Guide, a wise, compassionate, and deeply knowledgeable Christian theologian and fellowship director. 
Your purpose is to help people learn about Christianity, faith, God, Jesus Christ, and Christian history in a welcoming, encouraging, and non-judgmental way. 

Core Guidelines:
1. Always base answers on orthodox Christian core teachings (rooted in Scripture, Grace, and the Love of Christ) while being ecumenically respectful and loving.
2. Emphasize "Koinonia" (the Greek word for deep community, communion, and fellowship) and how Christ brings people together in unity, breaking down walls of division.
3. Be warm, gentle, and welcoming to all seekers, whether they are life-long disciples, newly curious, or skeptical. Our heart is to serve, teach, and link people together.
4. When relevant, reference beautiful scripture passages that inspire peace, fellowship, love, and community (such as John 13:34, Matthew 18:20, Acts 2:42-47, or Ephesians 4:2-3).
5. Address doubts and deep intellectual faith questions with thoughtfulness, showing the beauty and historical weight of Christian theology (Agape love, grace, reconciliation, spiritual growth).
6. Keep formatting neat with paragraphs and bullet points for readability.`;

    // Process chat request with history
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.parts?.[0]?.text || msg.text || "" }]
        });
      }
    }
    
    // Add current question
    contents.push({
      role: 'user',
      parts: [{ text: question }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text || "I was unable to formulate a response at this moment. Let's lift our concerns in prayer together.";
    res.json({ text });
  } catch (err: any) {
    console.error("Gemini API Error in /api/q-and-a:", err);
    res.status(500).json({ error: "Failed to process AI response: " + (err.message || String(err)) });
  }
});

// 3. Daily Scripture Reflector Endpoint
app.post("/api/scripture", async (req, res) => {
  try {
    const { category } = req.body; // Joy, Peace, Anxiety, Community, Service, Faith
    const selectedCategory = category || "Community";

    if (!process.env.GEMINI_API_KEY) {
      // Elegant offline backup scriptures
      const fallbacks: Record<string, { verse: string, reference: string, reflection: string }> = {
        Community: {
          verse: "And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.",
          reference: "Hebrews 10:24-25",
          reflection: "True Christian discipleship is never private. We exist in a beautiful tapestry where iron sharpens iron, and checking in on each other cultivates a community of grace."
        },
        Peace: {
          verse: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid.",
          reference: "John 14:27",
          reflection: "The peace that Christ provides transcends circumstantial calm. It is solid, anchor-like assurance founded in His enduring presence."
        },
        Anxiety: {
          verse: "Cast all your anxiety on him because he cares for you.",
          reference: "1 Peter 5:7",
          reflection: "God does not ask us to carry our burdens in silence. He actively invites us to cast them on Him, knowing that His shoulders are infinite and His heart is full of absolute care."
        },
        Joy: {
          verse: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
          reference: "Romans 15:13",
          reflection: "Discipleship joy is a deep-well fruit of the Spirit, independent of standard worldly happiness. It flows from a sustained connection to the vine of hope."
        }
      };

      const selected = fallbacks[selectedCategory] || fallbacks.Community;
      res.json(selected);
      return;
    }

    const ai = getAi();
    const prompt = `Give me a beautiful, inspirational Christian Bible verse focused on the theme of "${selectedCategory}". 
Format the response as raw JSON matching this TypeScript type:
{
  "verse": string (the exact scripture quote),
  "reference": string (e.g. Philippians 4:6-7),
  "reflection": string (a short, warm, 3-sentence pastoral reflection on how this scripture guides our faith and brings us closer to others)
}
Return only valid JSON. Do not include markdown code blocks or additional text outside the JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8,
      }
    });

    let data;
    try {
      data = JSON.parse(response.text?.trim() || "{}");
    } catch {
      // Recover if parsing fails
      data = {
        verse: "And over all these virtues put on love, which binds them all together in perfect unity.",
        reference: "Colossians 3:14",
        reflection: "Love is the ultimate fabric of Koinonia. It knits disparate hearts, diverse minds, and scattered communities into a singular reflection of God's covenant grace."
      };
    }

    res.json(data);
  } catch (err: any) {
    console.error("Gemini API Error in /api/scripture:", err);
    res.json({
      verse: "Give thanks to the Lord, for he is good; his love endures forever.",
      reference: "Psalm 107:1",
      reflection: "In all things, gratitude returns our sights to original goodness. God's enduring love is the secure soil from which fellowship rises."
    });
  }
});


// Boot Vite middleware or production static server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Serving static files in production from: ${distPath}`);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
