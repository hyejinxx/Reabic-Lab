// server framework
const express = require('express'); 
// middleware to parse request bodies post 요청의 body를 파싱해줌
const bodyParser = require('body-parser'); 
// middleware to enable CORS, 보인때믄에 다른 도메인에서 서버에 요청 못하게 막는 브라우저 정책, 앱이나 웹에서 api 호출할 수 있게 허용해줌
const cors = require('cors'); 
// create an Express application, 서버 인스턴스로 api 라우트, 미들웨어 등 기능 추가 가능
const app = express(); 
// port number for the server
const port = 3000; 
// MongoDB object modeling tool
const mongoose = require('mongoose'); 

app.use(cors()); // enable CORS for all routes
app.use(bodyParser.json()); // parse JSON request bodies

require('dotenv').config(); // load environment variables from .env file

// connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
  
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB 연결 성공');
}).catch((error) => {
    console.error('MongoDB 연결 실패:', error);
});


app.get('/', (req, res) => {
  res.send('Reabic Lab Server Success!'); // send a response for the root route
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // log the server URL
});

