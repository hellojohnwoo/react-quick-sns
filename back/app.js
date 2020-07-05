const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');


dotenv.config();
const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('DB Connect Success');
    })
    .catch(console.error);
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3033',
    credentials: true,
}));

app.use('/', express.static(path.join(__dirname, 'uploads')));   // It is used for normal operation regardless of OS.
app.use(express.json());                            // json
app.use(express.urlencoded({ extended: true }));    // form [submit]

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
   res.send('hello express')
});

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3044, () => {
    console.log('Server is working...');
});