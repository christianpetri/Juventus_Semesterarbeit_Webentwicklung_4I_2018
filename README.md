Technische Zusammenfassung wie die Applikation funktioniert und welche Technologien zu welchen Zwecken eingesetzt wurden. (Umfang max. 5 A4 Seiten.)
    Diagram
    Interaction between "Things"
    Interaction with the database

[HF Juventus](https://technikerschule.juventus.ch/angebote/informatik/) term paper web development course (4th semester computer science, year 2018)

# Project Movie World
A web application that fetches and displays data from [TMDb](https://www.themoviedb.org) via its public API.

## Requirements:
The user should be able to:
- to search films (by title)
- View the top 20 rated movies
- View the top 20 rated movies per category
- Show upcoming movies
- Display the 20 most popular movies
- View and filter a list of recent searches
    - Filter by date
    - Filter by number of entries
- Add / remove movies to a favorite list
- Display the favorites list
No login required. Every user has the same favorites.
Several results (films) must be presented in an overview.
Detail view of a result (movie) must be able to be displayed.

## Page walkthrough
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/lcpZXcT0GOw/0.jpg)](https://www.youtube.com/watch?v=lcpZXcT0GOw)]

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Install
    - [WebStorm](https://www.jetbrains.com/webstorm/)
    - [NodeJS](https://nodejs.org/en/download/) (>=8)  with NPM (>=5.2)
    - [MongoDB](https://www.mongodb.com/).

### Installing Frontend
Open the Project (this GitHub) in the WebStorm Application, open its terminal and run the following command below to install all the dependencies.
```
npm install
```
Start the web server
```
npm run start
```

### Installing the backend
Get the code from this Github [Juventus_Semesterarbeit_Webentwicklung_4I_2018_Database](https://github.com/christianpetri/Juventus_Semesterarbeit_Webentwicklung_4I_2018_Database)

Open the Project in the WebStorm Application, open its terminal and run the following command to install all the dependencies.
```
npm install
```

Change the following line of code according to your mongodb setup in the file named app.js. (Below are the default settings)
```javascript
let url = 'mongodb://localhost:27017/';
```
Point your Backend to the location where the database root folder is installed.
Run the command below with your system specific path.
```
mongod --dbpath=C:\Users\User\Dev\Data\Movies
```

Start the service
```
npm run start
```
Also the MongoDB has to be running in the background.

## Testing the setup

Start the frontend (npm run start), the backend (npm run start) and the MongoDB, then go to the browser and enter
```
http://localhost:8000/?#test
```
### Success
Connected to the TMDb API
Backend online
Connected successfully to the MongoDB

### Possible errors
- Not connected to the TMDb API (Are you offline?)
- Backend offline. (Restart Backend with npm run start)

## Built With
### Frontend
* [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
* [NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript
* [TSLint](https://palantir.github.io/tslint/) - TSLint is an extensible static analysis tool that checks TypeScript code
* [JQuery](http://jquery.com/) - jQuery is a fast, small, and feature-rich JavaScript library
* [Bootstrap](https://getbootstrap.com/) - Bootstrap is an open source toolkit for developing with HTML, CSS, and JS
* [Lodash](https://lodash.com/) - A JavaScript utility library delivering consistency, modularity, performance, & extras
* [Rimraf](https://www.npmjs.com/package/rimraf) -  The UNIX command rm -rf for Node.js. Deep deletion (like rm -rf) module for Node.js that provides asynchronous deep- deletion of files and directories
* [webpack](https://webpack.js.org/) - At its core, webpack is a static module bundler for modern JavaScript applications
* [Webpack-dev-server](https://github.com/webpack/webpack-dev-server) - webpack-dev-server. Use webpack with a development server that provides live reloading
* [Typescript](https://www.typescriptlang.org/) - TypeScript brings you optional static type-checking along with the latest ECMAScript features.
* [Jest für unit testing](https://facebook.github.io/jest/) - Delightful JavaScript Testing
* [less](http://lesscss.org/) - It's CSS, with just a little more

### Backend
* [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
* [NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript
* [Express](http://expressjs.com/de/) - Fast, unopinionated, minimalist web framework for NodeJS
* [MongoDB](https://www.mongodb.com/) - Ad hoc queries, indexing, and real time aggregation provide powerful ways to access and analyze your data

## Versioning
[GitHub](http://github.com) for versioning. For the versions available, see the [Juventus_Semesterarbeit_Webentwicklung_4I_2018](https://github.com/christianpetri/Juventus_Semesterarbeit_Webentwicklung_4I_2018).

## Author
* **Christian Petri** - *Initial work* - [christianpetri](https://github.com/christianpetri/)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Teacher: Linda Krüger
