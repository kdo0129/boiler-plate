# Make Boiler plate with React.

## What is the boiler plate?

> In Information Technology, a boilerplate is a unit of writing that can be reused over and over without change. By extension, the idea is sometimes applied to reusable programming, as in “boilerplate code.”

## NODE JS, EXPRESS JS

### what is Node.js?

Node.js is an open-source, cross-platform, JavaScript runtime enviroment that executes JavaScript code outside of a browser.

### what is Express.js?

Express.js, or simply Express, is a web application framework for Node.js.

### Make app with Express.js at index.js.

```js
const express = require('express'); //require Express.js.
const app = express(); //Make express app.
const port = 3000; //Set port number.

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`),
);
```

## Connecting to MongoDB.

1. Make MongoDB account. https://www.mongodb.com/
2. Make cluster.
3. Make MongoDB user.
4. Connect MongoDB to App.

### Mongoose

Simply, Mongoose can use MongoDB conveniently Object Modeling Tool.
https://mongoosejs.com/docs/

```
$ npm install mongoose --save
```

```js
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
```

**In order not to upload the password of the user created in MongoDB on github, do not connect mongoURI directly. Branch processing for development and distribution.**
