//express 모듈 가져오기
const express = require('express');
//새로운 express 앱 만들기
const app = express();
//back server port number 설정
const port = 5000;

const mongoose = require('mongoose');
mongoose
	.connect(
		'mongodb+srv://doumkim:khrlagk35@boilerplate-liinq.mongodb.net/test?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		},
	)
	.then(() => console.log('MongoDB Connected...'))
	.catch((e) => console.error(e));

//root dr('/')에 오면 Hello World! 출력
app.get('/', (req, res) => res.send('Hello World! ~~ 안녕하세요'));
//port number 5000에서 앱을 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
