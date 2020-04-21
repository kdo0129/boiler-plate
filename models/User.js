const mongoose = require('mongoose');
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

//생성한 Schema를 model로 감싸주기 User -> 모델명
const User = mongoose.model('User', userSchema);

//다른곳에서 사용하기위해 추출
module.exports = { User };
