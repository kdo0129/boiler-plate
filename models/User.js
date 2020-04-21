const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true, //여기서 trim은 예를들어 doum kim@naver.com에서 doum kim 빈칸을 없애주는 역할
		unique: 1, // 똑같은 값을 쓸 수 없게
	},
	password: {
		type: String,
		minlength: 5,
	},
	lastname: {
		type: String,
		maxlength: 50,
	},
	role: {
		type: Number,
		default: 0,
	},
	image: String,
	//유효성 관리를 위한 token
	token: {
		type: String,
	},
	//token의 유효기간
	tokenExp: {
		type: Number,
	},
});

//유저 모델에 유저 정보를 저장하기 전에 동작
userSchema.pre('save', function (next) {
	const user = this;
	//비밀번호를 암호화 (단, 패스워드를 변경해야 동작한다. 다른 정보 수정에 동작을 방지!)
	if (user.isModified('password')) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			//에러처리
			if (err) return next(err);

			//salt 생성 성공 시에 패스워드 해쉬 처리
			bcrypt.hash(user.password, salt, function (err, hash) {
				//에러처리
				if (err) return next(err);

				//해쉬 처리 성공 시에 user Schema에 들어 있는 password에 변환한 hash값 넣어주기.
				user.password = hash;
				//next() 통해서 유저 정보를 저장 단계로 넘김
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
	//plainPassword : 1234567 , 암호화된 비밀번호: 해쉬 비밀번호
	//암호화된 해쉬 비밀번호를 복호화할 수 없기 때문에 입력한 plainPassword를 암호화해서 비교한다.
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.methods.generateToken = function (cb) {
	const user = this;
	//jsonwebtoken을 이용해서 token을 생성하기.
	const token = jwt.sign(user._id.toHexString(), 'secretToken');

	user.token = token;
	user.save(function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

//생성한 Schema를 model로 감싸주기 User -> 모델명
const User = mongoose.model('User', userSchema);

//다른곳에서 사용하기위해 추출
module.exports = { User };
