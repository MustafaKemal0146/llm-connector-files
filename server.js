import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Güvenlik önlemleri
app.use(helmet());

// Sıkıştırma
app.use(compression());

// Statik dosyalar
app.use(express.static(join(__dirname, 'dist')));

// Tüm rotaları React uygulamasına yönlendir
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});