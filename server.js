import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const distPath = join(__dirname, 'dist');

console.log(`__dirname: ${__dirname}`);
console.log(`dist path: ${distPath}`);
console.log(`dist exists: ${existsSync(distPath)}`);
console.log(`index.html exists: ${existsSync(join(distPath, 'index.html'))}`);

app.use(express.static(distPath));
app.get('*', (req, res) => {
  const filePath = join(distPath, req.path);
  if (existsSync(filePath) && !filePath.endsWith('/')) {
    return res.sendFile(filePath);
  }
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => console.log(`Servidor en puerto ${PORT}`));
