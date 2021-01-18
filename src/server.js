require('dotenv').config();
import app from './app';

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log('\x1b[33m%s\x1b[0m', `=> 🚀 Server running on the port: ${port}`);
});
