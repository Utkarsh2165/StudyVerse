import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser with 25MB limit for scanned papers/images
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Initialize Google GenAI if key exists
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(geminiApiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Study Assistant Endpoint
app.post('/api/study-assistant', async (req: Request, res: Response) => {
  try {
    const { message, language = 'en', subject = 'General', history = [], imageBase64, imageMimeType } = req.body;

    if (!message && !imageBase64) {
      return res.status(400).json({ error: 'Message or image is required.' });
    }

    if (!aiClient) {
      // Graceful real fallback explanation if key is temporarily absent
      const fallbackMsg = language === 'mr'
        ? `[सिस्टम सूचना]: Gemini API की सध्या कॉन्फिगर केलेली नाही. तुम्ही प्रश्न विचारू शकता; की जोडल्यानंतर थेट AI मॉडेल द्वारे उत्तरे मिळतील. (विषय: ${subject})`
        : `[System Notice]: Gemini API Key is not configured in the environment. Please add GEMINI_API_KEY to test live AI responses. (Subject: ${subject})`;
      return res.json({ text: fallbackMsg, isFallback: true });
    }

    const systemPrompt = `You are "StudyVerse AI", an elite AI Tutor dedicated to Indian students, specially designed for Maharashtra State Board (SSC) Class 10 students.
Target Language: ${language === 'mr' ? 'Marathi (मराठी) primarily, with English technical terms in brackets where helpful' : 'English primarily, with crisp, easy-to-understand explanations'}.
Subject Context: ${subject}.

CORE TEACHING & ACCURACY RULES:
1. Stay Strictly Relevant: Answer ONLY what the student specifically asks. Do NOT return unrelated notes, random questions, or syllabus dumps from other topics.
2. If comparing two concepts (e.g., "difference between mass and weight"):
   - Start with a direct 1-sentence summary.
   - Provide a clean Markdown comparison table with columns: | Parameter / गुणधर्म | Concept A | Concept B |. Include definition, SI unit, formula/equation, scalar/vector nature, and variation with location.
   - Provide 1 simple real-life example.
3. If explaining a law, theorem, or formula (e.g., "Newton's Second Law", "Pythagoras Theorem"):
   - Give the formal statement / व्याख्या.
   - Present the mathematical formula enclosed in standard delimiters ($F = m \\times a$ or $$a^2 + b^2 = c^2$$).
   - Explain what each symbol represents along with standard SI units.
   - Provide step-by-step derivation or proof outline for SSC Board exams.
   - Add a brief numerical or practical example.
4. If the question is ambiguous or incomplete, ask 1 clear clarifying question instead of making up details.
5. Math and Formula Formatting:
   - Always wrap inline math in single dollar signs like $F = m \\times a$, $W = m \\times g$, or $c^2 = a^2 + b^2$.
   - Always wrap standalone display equations in double dollar signs like $$F = \\frac{dp}{dt} = m \\cdot a$$.
   - Never output bare un-delimited LaTeX strings like raw \\times or \\text outside math tags.
   - Always surround Markdown tables with empty lines before and after.
6. Provide a short "Board Exam Tip" highlighting how Maharashtra SSC Board evaluators award marks (e.g., step marks, formula writing, unit mentioning).
7. Keep tone supportive, inspiring, and clear.`;

    const parts: any[] = [];

    // If an image was attached
    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64.replace(/^data:[^;]+;base64,/, ''),
          mimeType: imageMimeType || 'image/jpeg',
        },
      });
    }

    // Build context with recent user history if provided
    let conversationContext = '';
    if (Array.isArray(history) && history.length > 0) {
      const recent = history.slice(-4);
      conversationContext = 'Previous conversation:\n' + recent.map((h: any) => `${h.role === 'user' ? 'Student' : 'Tutor'}: ${h.content}`).join('\n') + '\n\n';
    }

    const promptText = `${conversationContext}Student asks: ${message || 'Please analyze this textbook/question image and explain the solution or concept thoroughly.'}`;
    parts.push({ text: promptText });

    // Retry once or twice if model experiences temporary high demand (503)
    let response;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: { parts },
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });
        break; // Success
      } catch (callErr: any) {
        const isTransient = callErr?.message?.includes('503') || callErr?.message?.includes('high demand') || callErr?.message?.includes('UNAVAILABLE');
        if (attempt < 2 && isTransient) {
          await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
          continue;
        }
        throw callErr;
      }
    }

    const responseText = response?.text || 'I could not generate an answer right now. Please try again.';
    res.json({ text: responseText });
  } catch (err: any) {
    console.error('Error in /api/study-assistant:', err);
    const friendlyFallback = (req.body.language === 'mr')
      ? 'माफ करा, AI सेवेवर सध्या तात्पुरता ताण आहे. कृपया १-२ सेकंदांनी पुन्हा प्रयत्न करा.'
      : 'The AI Tutor experienced a momentary connection spike. Please ask your question once more.';
    res.json({ text: friendlyFallback, isFallback: true });
  }
});

// Board Paper Scanner Endpoint
app.post('/api/scan-paper', async (req: Request, res: Response) => {
  try {
    const { fileBase64, mimeType = 'image/jpeg', instructions = '', language = 'en' } = req.body;

    if (!fileBase64) {
      return res.status(400).json({ error: 'Paper file is required.' });
    }

    if (!aiClient) {
      // Mock structured response if key is missing during offline development
      return res.json({
        rawText: "Q1. (A) Choose the correct alternative:\n(1) The sequence -10, -6, -2, 2, ... is:\n(a) An A.P., Reason d = -16\n(b) An A.P., Reason d = 4\n(c) An A.P., Reason d = -4\n(d) Not an A.P.\n\nQ2. Solve the following quadratic equation by factorization:\nx² + x - 20 = 0",
        questions: [
          {
            qNumber: "Q1.(A)(1)",
            question: "The sequence -10, -6, -2, 2, ... is an A.P.? Find the common difference d.",
            marks: "1 Mark",
            solution: "Given sequence: t1 = -10, t2 = -6, t3 = -2, t4 = 2.\nd = t2 - t1 = -6 - (-10) = 4.\nd = t3 - t2 = -2 - (-6) = 4.\nSince difference d is constant, it is an A.P. with d = 4.\nCorrect Option: (b)",
            keyConcepts: ["Arithmetic Progression", "Common Difference formula d = tn - tn-1"]
          },
          {
            qNumber: "Q2",
            question: "Solve the quadratic equation: x² + x - 20 = 0 by factorization method.",
            marks: "2 Marks",
            solution: "Step 1: Find two numbers whose product is -20 and sum is +1.\nNumbers are +5 and -4.\nStep 2: Split middle term: x² + 5x - 4x - 20 = 0\nx(x + 5) - 4(x + 5) = 0\n(x + 5)(x - 4) = 0\nTherefore, x + 5 = 0 or x - 4 = 0\nx = -5 or x = 4.\nRoots of the given quadratic equation are 4 and -5.",
            keyConcepts: ["Factorization of Quadratic Equations", "Splitting middle term"]
          }
        ],
        similarPracticeQuestions: [
          {
            question: "Solve by factorization: x² - 15x + 54 = 0",
            hint: "Factors of 54 adding to -15 are -9 and -6.",
            answer: "x = 9 or x = 6"
          },
          {
            question: "Find the 19th term of the A.P. 7, 13, 19, 25, ...",
            hint: "Use tn = a + (n - 1)d where a = 7, d = 6.",
            answer: "t19 = 115"
          }
        ]
      });
    }

    const cleanBase64 = fileBase64.replace(/^data:[^;]+;base64,/, '');

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType === 'application/pdf' ? 'application/pdf' : mimeType,
            },
          },
          {
            text: `You are an expert Maharashtra SSC Board examination evaluator and scanner.
Analyze this uploaded question paper / worksheet / notebook page carefully.
It may contain questions in English, Marathi (मराठी), or bilingual format.
Special instructions from student: ${instructions || 'Extract all questions, provide full step-by-step SSC board solutions, and generate 2-3 similar practice questions.'}

Return a valid JSON object matching the requested schema with:
1. rawText: The full extracted text verbatim from the paper (preserving Marathi/English text faithfully).
2. questions: Array of objects, each containing:
   - qNumber: e.g. "Q1 (A)", "Q2 (B)"
   - question: The full question statement
   - marks: Estimated marks (e.g. "1 Mark", "2 Marks", "3 Marks")
   - solution: Step-by-step Maharashtra SSC board marking-scheme compliant solution. Include formulas, steps, final answer statement.
   - keyConcepts: Array of 1-3 core concept tags (e.g. ["Pythagoras Theorem", "Trigonometric Identities"])
3. similarPracticeQuestions: Array of 2 to 3 similar questions with question, hint, and answer so students can master the topic.`
          }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rawText: { type: Type.STRING, description: 'Verbatim extracted text from the document/image' },
            questions: {
              type: Type.ARRAY,
              description: 'Extracted questions and their step-by-step solutions',
              items: {
                type: Type.OBJECT,
                properties: {
                  qNumber: { type: Type.STRING },
                  question: { type: Type.STRING },
                  marks: { type: Type.STRING },
                  solution: { type: Type.STRING },
                  keyConcepts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['qNumber', 'question', 'solution']
              }
            },
            similarPracticeQuestions: {
              type: Type.ARRAY,
              description: 'Similar practice questions based on the paper',
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  hint: { type: Type.STRING },
                  answer: { type: Type.STRING }
                },
                required: ['question', 'hint', 'answer']
              }
            }
          },
          required: ['rawText', 'questions', 'similarPracticeQuestions']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/scan-paper:', err);
    res.status(500).json({ error: err.message || 'Failed to scan and analyze board paper.' });
  }
});

// Smart Quiz Generator Endpoint
app.post('/api/generate-quiz', async (req: Request, res: Response) => {
  try {
    const {
      subject = 'Mathematics 1 (Algebra)',
      chapter = 'Linear Equations in Two Variables',
      difficulty = 'Medium',
      count = 5,
      language = 'en',
    } = req.body;

    if (!aiClient) {
      // Fallback curated questions if offline
      return res.json({
        quizTitle: `${subject} - ${chapter} (${difficulty})`,
        questions: [
          {
            id: '1',
            question: language === 'mr'
              ? 'खालीलपैकी कोणते एक सामाईक समीकरण दोन चलांमधील रेषीय समीकरण आहे?'
              : 'Which of the following is a linear equation in two variables?',
            options: [
              '4m + 3n = 12',
              '4/x + 5/y = 4',
              '4m² + 3n = 12',
              'xy + 6 = 0',
            ],
            correctAnswer: 0,
            explanation: language === 'mr'
              ? 'दोन चलांमधील रेषीय समीकरणात चलांचा घातांक 1 असावा लागतो (am + bn = c).'
              : 'In a linear equation in two variables ax + by = c, the degree of each variable is 1 and a,b ≠ 0.',
            boardTip: 'Common Board 1-mark question in Q.1(A).'
          },
          {
            id: '2',
            question: language === 'mr'
              ? 'x + y = 4 या समीकरणासाठी जर x = 1 असेल, तर y ची किंमत किती?'
              : 'For the equation x + y = 4, if x = 1, then find the value of y.',
            options: ['3', '5', '-3', '4'],
            correctAnswer: 0,
            explanation: '1 + y = 4 => y = 4 - 1 = 3.',
            boardTip: 'Substitution sums are frequently asked in Q.1(B).'
          },
          {
            id: '3',
            question: 'What is the value of Dx for 3x + 5y = 9 and 2x + 3y = 4 by Cramer’s Rule?',
            options: ['-7', '7', '-1', '1'],
            correctAnswer: 0,
            explanation: 'Dx = |9  5|\n     |4  3| = (9*3) - (5*4) = 27 - 20 = 7. If standard format is solved, Dx = 7.',
            boardTip: 'Pay close attention to cross multiplication signs in determinants.'
          }
        ]
      });
    }

    const langInstruction = language === 'mr'
      ? 'All questions, options, and explanations must be in proper, formal Marathi (मराठी) for Maharashtra State Board SSC Class 10.'
      : 'All questions, options, and explanations must be in English for Maharashtra State Board SSC Class 10.';

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Generate a high quality practice quiz for Maharashtra SSC Board Class 10.
Subject: ${subject}
Chapter: ${chapter}
Difficulty: ${difficulty}
Total Question Count: ${count}
${langInstruction}

Guidelines:
- Match the exact style and difficulty of Maharashtra State Board SSC Class 10 board exam MCQs and objective questions.
- Provide 4 distinct, plausible options.
- Indicate the correct 0-based index (0, 1, 2, or 3).
- Provide a clear, educational explanation for why that answer is correct.
- Provide a practical "Board Exam Tip" for each question.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Exactly 4 options'
                  },
                  correctAnswer: { type: Type.INTEGER, description: 'Index of correct option 0-3' },
                  explanation: { type: Type.STRING },
                  boardTip: { type: Type.STRING }
                },
                required: ['id', 'question', 'options', 'correctAnswer', 'explanation', 'boardTip']
              }
            }
          },
          required: ['quizTitle', 'questions']
        }
      }
    });

    const quizData = JSON.parse(response.text || '{}');
    res.json(quizData);
  } catch (err: any) {
    console.error('Error in /api/generate-quiz:', err);
    res.status(500).json({ error: err.message || 'Failed to generate quiz.' });
  }
});

// Configure Vite middleware or static serving
async function setupApp() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StudyVerse AI server running on http://0.0.0.0:${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

setupApp();
