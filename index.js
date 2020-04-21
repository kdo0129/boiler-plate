//express 모듈 가져오기
const express = require('express');
//새로운 express 앱 만들기
const app = express();
//back server port number 설정
const port = 5000;
//bodyParser 가져오기
const bodyParser = require('body-parser');

//MongoDB URI 가져오기
const config = require('./config/key');
//User 모델 가져오기
const { User } = require('./models/User');

//bodyParser에 옵션 주기
app.use(bodyParser.urlencoded({ extended: true })); //bodyParser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.(application/x-www-from/urlencoded)
app.use(bodyParser.json()); //application/json 분석해서 가져오기

const mongoose = require('mongoose');
mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((e) => console.error(e));

//root dr('/')에 오면 Hello World! 출력
app.get('/', (req, res) => res.send('Hello World! ~~ 안녕하세요'));
app.post('/register', (req, res) => {
	//회원가입할 때 필요한 정보들을 클라이언트에서 가져오면 그것들을 db에 넣어준다.
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});
//port number 5000에서 앱을 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
