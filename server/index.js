//express 모듈 가져오기
const express = require('express');
//새로운 express 앱 만들기
const app = express();
//back server port number 설정
const port = 5000;
//bodyParser 가져오기
const bodyParser = require('body-parser');
//cookie-parser 가져오기
const cookieParser = require('cookie-parser');

//MongoDB URI 가져오기
const config = require('./config/key');
//User 모델 가져오기
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

//bodyParser에 옵션 주기
app.use(bodyParser.urlencoded({ extended: true })); //bodyParser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.(application/x-www-from/urlencoded)
app.use(bodyParser.json()); //application/json 분석해서 가져오기

app.use(cookieParser());

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
app.get('/', (req, res) => res.send('Dev server on'));

//register route
app.post('/api/users/register', (req, res) => {
	//회원가입할 때 필요한 정보들을 클라이언트에서 가져오면 그것들을 db에 넣어준다.
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

//login route
app.post('/api/users/login', (req, res) => {
	//요청된 이메일을 데이터 베이스에서 있는지 찾는다.
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: '제공된 이메일에 해당하는 유저가 없습니다.',
			});
		}
		//요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					loginSuccess: false,
					message: '비밀번호가 틀렸습니다.',
				});
			}
			//비밀번호까지 맞다면 토큰을 생성하기.
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				// token을 저장한다. 어디에? 쿠키, 로컬스토리지
				res.cookie('x_auth', user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
				});
			});
		});
	});
});

app.get('/api/users/auth', auth, (req, res) => {
	//여기까지 미들웨어를 통과해 왔다는 말은 Authentication이 true
	res.status(200).json({
		_id: req.user_id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
	});
});

app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({ success: true });
	});
});

// app.get('/api/hello', (req, res) => {
// 	res.send('안녕하세요 !');
// });

//port number 5000에서 앱을 실행
app.listen(port, () => console.log(`App listening on port ${port}!`));
