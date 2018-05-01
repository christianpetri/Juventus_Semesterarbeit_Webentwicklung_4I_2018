Technische Zusammenfassung wie die Applikation funktioniert und welche Technologien zu welchen Zwecken eingesetzt wurden. (Umfang max. 5 A4 Seiten.)
Diagram
    Interaction between "Things"
    Interaction with the database

# Project Title
## [HF Juventus](https://technikerschule.juventus.ch/angebote/informatik/) term paper web development (4th semester computer science, year 2018)
This is a Web Application that gets data from the public API of [TMDb](https://www.themoviedb.org) and displays it.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install [WebStorm](https://www.jetbrains.com/webstorm/) and [NodeJS](https://nodejs.org/en/download/) (>=8)  with NPM (>=5.2).

### Installing Frontend

Open the Project in the WebStorm Application and all the dependencies will be installed. Open the Terminal:

```
npm install
```
Start the web server
```
npm start
```

### Installing Backend

Install [WebStorm](https://www.jetbrains.com/webstorm/), [NodeJS](https://nodejs.org/en/download/) (>=8\) with NPM (>=5.2) and [MongoDB](https://www.mongodb.com/).
Get the code from this Github [Juventus_Semesterarbeit_Webentwicklung_4I_2018_Database](https://github.com/christianpetri/Juventus_Semesterarbeit_Webentwicklung_4I_2018_Database)
Open Project in WebStorm and run

```
npm install
```
and all the dependencies will be installed. Start the MongoDB Server and change in app.js var url = 'path/to/your/MongoDB/Server'

Start the service
```
npm start
```
Also the MongoDB has to be running in the background.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With
### Frontend
* [NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript
* [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
* [TSLint](https://palantir.github.io/tslint/) - TSLint is an extensible static analysis tool that checks TypeScript code
* [JQuery](http://jquery.com/) - jQuery is a fast, small, and feature-rich JavaScript library
* [Bootstrap](https://getbootstrap.com/) - Bootstrap is an open source toolkit for developing with HTML, CSS, and JS
* [Lodash](https://lodash.com/) - A JavaScript utility library delivering consistency, modularity, performance, & extras
* [Webpack](https://github.com/webpack/webpack) - A bundler for javascript and friends
* [Rimraf](https://www.npmjs.com/package/rimraf) -  The UNIX command rm -rf for Node.js. Deep deletion (like rm -rf) module for Node.js that provides asynchronous deep- deletion of files and directories
* [webpack](https://webpack.js.org/) - At its core, webpack is a static module bundler for modern JavaScript applications
* [Webpack-dev-server](https://github.com/webpack/webpack-dev-server) - webpack-dev-server. Use webpack with a development server that provides live reloading
* [Typescript](https://www.typescriptlang.org/) - TypeScript brings you optional static type-checking along with the latest ECMAScript features.
* [Jest für unit testing](https://facebook.github.io/jest/) - Delightful JavaScript Testing
* [less](http://lesscss.org/) - It's CSS, with just a little more

### Backend
* [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
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
