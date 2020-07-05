# react-quick-sns
## `Full-Stack Project : React.js + Node.js + MySQL + AWS`
🚧 80% Complete... by MySelf <br />
(Requirement analysis -> Design -> Coding 🏃‍♂️ -> Test -> Maintenance) <br /><br />
📷 🤔 Unlike the name 'quick', this project is quite structurally sound.

### `フルスタック開発に挑戦しながら感じた感想`
通常、開発過程はフロントエンド、バックエンドなどに分けられ、自分のパートに集中できるようにします。<br />
フルスタック開発を一人でするので、集中しにくいです。<br />
しかし、開発全体を一人でこなすことでプロセス全体が理解できるようになっています。<br />
最高になるためには、難しい道は避けられません。🤣

## Goal
### `React.js`
- フロントエンド担当者が、バックエンド担当者がAPIなどを完成する前に
- 一人でダミーデータを作成し、テストすることを目標とします。

### `Node.js`
- どのプログラミング言語もバックエンドの部分は似ていると思います。
- このため、データ処理のやり取りを重点的に理解し、応用することを目指します。
- 後で、Django、Laravel、Railsへの交換作業も問題ないと思われる。

## Tech Stack
### `Front-end`
- [React](https://reactjs.org/)
- [Next](https://nextjs.org/)

### `Back-end`
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)

### `Library`
- [Redux](https://www.npmjs.com/package/redux)
- [Redux-saga](https://www.npmjs.com/package/redux-saga)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Next (SSR:Server Side Rendering)](https://nextjs.org/)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Styled Components](https://styled-components.com/)
- [Ant Design](https://ant.design/)


### `Tools & Environment`
- [MacBook Pro](https://www.apple.com/macbook-pro-16/)
- [macOS Catalina 10.15.5](https://www.apple.com/macos/catalina/)
- [WebStorm](https://www.jetbrains.com/webstorm/)
- [MySQL](https://www.mysql.com/)
- [Sequel Pro](http://sequelpro.com/)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Postman](https://www.postman.com/)

### `Feature`
1. [X] Signup
2. [X] Login & Logout
3. [X] Write post with images upload, Add comment
4. [X] Like
5. [X] Following & Follower
6. [X] Retweet the post & Block retweet my post.
7. [X] Blocked access to unauthorized access routes.

### `Additional Feature`
1. [X] SEO (Search Engine Optimization)
2. [X] AWS CodeDeploy
3. [X] Storage of images or videos is intended to be connected directly from the front end to the AWS CDN. <br />
When processing images or videos on the back end, excessive load is applied or memory is wasted.
 
## Feature Preview

### `Rejected Unregistered`
![reject_login_no_signup_user_0627](https://user-images.githubusercontent.com/49154920/85920676-a3cb8380-b8b0-11ea-86f2-53ccac5b0f6d.gif)

### `SignUp`
![sign_up_okay_0627](https://user-images.githubusercontent.com/49154920/85920593-02dcc880-b8b0-11ea-98c5-409d18ab9029.gif)

### `LogIn`
![login_okay_0627](https://user-images.githubusercontent.com/49154920/85920586-ff494180-b8af-11ea-98fd-9b048a817e09.gif)

### `Check DB`
![sign_up_DB_okay_0627](https://user-images.githubusercontent.com/49154920/85920589-02443200-b8b0-11ea-9de8-062208eaed7f.gif)

## Source Code Preview
### `front/sagas/post.js`
<img width="908" alt="f-saga-post" src="https://user-images.githubusercontent.com/49154920/86010829-e6c75b80-ba56-11ea-928e-4192aceaee84.png">

### `front/reducers/post.js`
<img width="887" alt="f-reducer-post" src="https://user-images.githubusercontent.com/49154920/86010832-e7f88880-ba56-11ea-94c6-06bdbe12ce80.png">

### `back/app.js`
<img width="635" alt="b-app" src="https://user-images.githubusercontent.com/49154920/86010840-ea5ae280-ba56-11ea-846e-12e08a3743d2.png">

### `back/models/post.js`
<img width="757" alt="b-model-db" src="https://user-images.githubusercontent.com/49154920/86010843-ec24a600-ba56-11ea-8fc2-24d7d292d093.png">

### `Why I using React.js?`
<img width="1385" alt="why-react" src="https://user-images.githubusercontent.com/49154920/86010847-ed55d300-ba56-11ea-9101-f7f2b14fc8ba.png">

## Test Code (Unit Test & Integration Test)
`👨‍💻 We are planning to upload testing tools and test codes later...`
