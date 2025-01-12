# Aviation Weather App

This project is a React-based web application that provides aviation weather information. It uses the CheckWX API to fetch and display METAR data for a given ICAO code. The app allows users to input an ICAO code and an active runway number to calculate the headwind and crosswind components based on the reported wind direction and speed.

## Table of Contents
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [License](#license)

## Getting Started

In the project directory, you can run:

### `npm install`

Installs the project dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage

The app provides a form where you can input an ICAO code and an active runway number. After submitting the form, the app will fetch the METAR data for the specified ICAO code and display the relevant information.

The app also calculates the headwind and crosswind components based on the reported wind direction and speed. The headwind and crosswind components are displayed along with the reported wind speed and gusting speed.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Structure

The project structure is as follows:

```
.
├── node_modules
├── public
│   ├── favicon.png
│   ├── imgs
│   │   ├── altimeter-symbol.png
│   │   ├── clock.png
│   │   ├── cloud-layers-symbol.jpg
│   │   ├── conditions.png
│   │   ├── flight-category.png
│   │   ├── sea-level-pressure-symbol.png
│   │   ├── station-info-symbol.png
│   │   ├── temp-dew-symbol.png
│   │   ├── visibility-symbol.png
│   │   └── winds.png
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   └── weatherApi.js
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.