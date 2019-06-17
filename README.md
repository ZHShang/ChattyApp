#Summary

A client-side SPA (single-page app) built with ReactJS, Webpack, Babel, Node.js and Web Sockets. The client-side app communicates with a server via WebSockets for multi-user real-time updates. No persistent database is involved; the focus is on the client-side experience

##Set Up
Download the server side file first!
https://github.com/ZHShang/Chatty-App-Server

##Usage

Clone the repo to your local machine. Install the dependencies and start the server.

1st server

npm install
npm start
open http://localhost:3000
2nd server

cd to `Chatty-App-Server`
npm install
npm start
open http://localhost:3000
Static Files
You can store static files like images, fonts, etc in the build folder.


##Linting
This project includes React ESLint configuration.

npm run lint
Dependencies
React
Webpack
babel-loader
webpack-dev-server
