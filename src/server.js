import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// GET/notes

app.get('/notes', (req, res) => {
  res.status(200).json({ meaassge: 'Retrieved all notes' });
});

//GET/notes/:noteID

app.get('/notes/:noteId', (req, res) => {
  console.log(req.params);

  res
    .status(200)
    .json({ meaassge: `Retrieved note with ID:${req.params.noteId}` });
});

//GET/test-error

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// 404

app.use((req, res) => {
  res.status(404).json({ message: 'Rout not found' });
});

//error middlewear

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
    console.error('Error:', err.message);

  res.status(500).json({
    message: isProd ? 'Щось пішло не так' : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
