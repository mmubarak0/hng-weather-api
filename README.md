# [HNG](https://hng.tech) stage-one-project
## track:
 - Backend
## technologies
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
## purpose
to get user ip and city location then display city temperature.

## How to run the project
- clone the project
- run `npm install`

> Before you run the project you need to optain an API key from [openweathermap](https://openweathermap.org/api) and add it to the .env file as `OPENWEATHER_API_KEY=<your_api_key>`
- run `npm start`

## How to use the project
 - first you need to uncomment the code in the `index.js` file that sets the port to 3000
 - and comment the code that sets the port to 8080.
 - open your browser and visit `http://localhost:3000/api/hello?visitor_name=ki2kid`
