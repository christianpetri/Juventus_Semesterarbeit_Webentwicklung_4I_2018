[HF Juventus](https://technikerschule.juventus.ch/angebote/informatik/) term paper web development course (4th semester computer science, year 2018)

# Project Movie World
A web application that fetches and displays data from [TMDb](https://www.themoviedb.org) via its API.

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
- Display the favorites list <br/>
No login required. Every user has the same favorites. <br/>
Several results (films) must be presented in an overview. <br/>
Detail view of a result (movie) must be able to be displayed.

## Pages
[![Movie World Webpage walkthrough](https://img.youtube.com/vi/lcpZXcT0GOw/0.jpg)](https://www.youtube.com/watch?v=lcpZXcT0GOw) <br/>
Youtube [Movie World webpage walkthrough](https://www.youtube.com/watch?v=lcpZXcT0GOw) video. It shows all the different pages and their functions.
 ### Webpage navigation overview
- Upcoming
   - displays the upcoming movies
- Search
    - search films (by title)
- Popular
     - displays the 20 most popular movies
- Top Rated
    - displays the top 20 rated movies
- Top Rated by Genres
    - displays the top 20 rated movies per category
- Search History
    - displays and filters the list of recent searches
- Favorites
    - displays the favorites list

On all pages (expect 'Search History') there is a little black or red heart, when clicked it adds or removes the movie from the favorite movie list

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
Connected to the TMDb API<br/>
Backend online<br/>
Backend connected successfully to the MongoDB

### Possible errors
- Not connected to the TMDb API (Are you offline?)
- Backend offline. (Restart Backend with npm run start)
    - As long the Backend is offline, there can't be a "Connected successfully to the MongoDB" message
- TMDb Invalid API key: You must be granted a valid key.

## Built With
### Frontend
* [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
    - the project is based on NodeJS, it enables to run JavaScript / Typescript on the server side
* [NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript
    - handles all the packages for project / dependency manager
* [TSLint](https://palantir.github.io/tslint/) - TSLint is an extensible static analysis tool that checks TypeScript code
    - was used during one of the development phases to run tests
* [JQuery](http://jquery.com/) - jQuery is a fast, small, and feature-rich JavaScript library
    - is mainly used to process and display the fetched data from the backend and the TMBb API
* [Bootstrap](https://getbootstrap.com/) - Bootstrap is an open source toolkit for developing with HTML, CSS, and JS
    - is mainly used for the navigation bar, the buttons and to place the HTML / CSS into a responsible bootstrap grid
* [Rimraf](https://www.npmjs.com/package/rimraf) -  The UNIX command rm -rf for Node.js. Deep deletion (like rm -rf) module for Node.js that provides asynchronous deep- deletion of files and directories
    - is used during the build to clean up the directories
* [webpack](https://webpack.js.org/) - At its core, webpack is a static module bundler for modern JavaScript applications
    - automated build tool for bundling web server modules to static assets grouped into .js .css .jpg .png etc. files.
* [Webpack-dev-server](https://github.com/webpack/webpack-dev-server) - webpack-dev-server. <br/>
    Use webpack with a development server that provides live reloading
* [Typescript](https://www.typescriptlang.org/) - TypeScript brings you optional static type-checking along with the latest ECMAScript features.
    - is used to write all the functions and classes
* [Jest](https://facebook.github.io/jest/) - Delightful JavaScript Testing
    - is used to write the unit tests
* [less](http://lesscss.org/) - It's CSS, with just a little more
    - is used to handle the style of the project (the style is also supported by bootstrap)

### Backend
* [NodeJS](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
    - the project is based on NodeJS, it enables to run JavaScript / Typescript on the server side
* [NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript
    -is used in part to start the backend web server
* [Express](http://expressjs.com/de/) - Fast, unopinionated, minimalist web framework for NodeJS
    - is used in part to handle the requests for the frontend. It negotiates between the frontend and the MongoDB.
* [MongoDB](https://www.mongodb.com/) - Ad hoc queries, indexing, and real time aggregation provide powerful ways to access and analyze your data
    - is used to store the search history and the favorite movies

## Codebase brief
### Frontend
![Overview over the frontend files](/appOverviewAfterCleanUp.png)
The project evolves around the file app.js. All the common elements and functions are put into the file common.js.
For pages that needed a custom layout and functions reside in the folder named 'page'

### Backend
![Overview over the backend files](/appOverviewBackend.png)
The core code for the backend is currently in the file app.ts and has around 280 lines of code.
In the future the lines of code can be reduced and the functions might be broken into different files.

## Versioning
[GitHub](http://github.com) for versioning. For the versions available, see the [Juventus_Semesterarbeit_Webentwicklung_4I_2018](https://github.com/christianpetri/Juventus_Semesterarbeit_Webentwicklung_4I_2018).

## Author
* **Christian Petri** - *Initial work* - [christianpetri](https://github.com/christianpetri/)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Teacher: Linda Krüger
