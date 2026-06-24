import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const WEB_ORIGIN = process.env.WEB_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: WEB_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'vampgen-api',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🦇 VAMPGEN API listening on http://localhost:${PORT}`);
});
