# note-taking

Note Taking app made with [React](https://reactjs.org/) and [ExpressJS](http://expressjs.com/)

![ss1](https://raw.githubusercontent.com/kunal-mohta/note-taking/master/screenshots/ss1.png)

## How to use

### Clone the repository
```
git clone https://github.com/kunal-mohta/note-taking.git
```

### Install dependencies
```
cd note-taking
npm install
```

### Setup database
By default, the app uses a global **Mongodb** database, provided by the developer.
But you can use your own **Mongodb** database (local or global) by providing its url as an environment variable in `.env` file\
For example, if your url for mongodb is `mongod://localhost/note-app`, then create a `.env` file with contents
```
DB_URL=mongodb://localhost/note-app
```
To learn more about how to create a local mongodb, follow [this link](https://docs.mongodb.com/manual/installation/#supported-platforms)\
For global mongodb service, you can try [mlab](https://mlab.com/)

### Private key for JWT
The app uses JWT for authentication via tokens, for which a private key is to be provided, for the hashing algrithm (`HS256` used here).\
Edit the `.env` file to add this private key, which can be any string of your choice.\
For example, if you want `pvt_key` to be your key, then add the following line to `.env`
```
JWT_PVT_KEY=pvt_key
```
**Note** If you don't provide this key, then a default key will be used, which has been hard coded. This is not suggested as revealing the key makes authentication vulnerable.

### Starting React server
To start the React development server, run
```
npm start
```
at the root of repository\
This will start the local React server at the port `3000`

### Starting the Express server
To start the Express server, run 
```
npm run start-server
```
at the root of repository\
This will start the local Express server at the port `5000`, with the message 
```
Express server listening at port 5000
Successful connection to the database...
```
If instead you see and error, then there is probably some problem with the database connection.\

Now you are good to go!
Visit [http://localhost:3000/](http://localhost:3000/) in your browser to use the app.

## Tech Stack
- [React](https://reactjs.org/) - Frontend library
- [ExpressJS](http://expressjs.com/) - Backend Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](http://mongoosejs.com/) - MongoDB object modelling for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - npm package to use [JWT](https://jwt.io/) for authentication via tokens
- [bcrypt](https://www.npmjs.com/package/bcrypt) - npm package to hash and salt password before storing
- [SASS](https://sass-lang.com/) and [CSS Grids](https://css-tricks.com/snippets/css/complete-guide-grid/) - Styling

### Other relevant links for devs
- [React Routing](https://reacttraining.com/react-router/web/example/basic)
- [Using React with Express](https://dev.to/loujaybee/using-create-react-app-with-express)
- [BEM methodology](http://getbem.com/introduction/)
- [Explicit and Implicit Grids](https://css-tricks.com/difference-explicit-implicit-grids/)
- [Why localStorage is bad for JWT](https://dev.to/rdegges/please-stop-using-local-storage-1i04)
- [JWT vs Sessions](https://scotch.io/bar-talk/why-jwts-suck-as-session-tokens)

### To Do
- Sorting notes
- Form validation (both frontend and backend)
- OAuth

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
