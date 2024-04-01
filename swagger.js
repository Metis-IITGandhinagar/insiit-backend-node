const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info:{
        title:"InsIIT API",
        description:"<font size='4'>\n    An API developed for the <b>InsIIT app</b>.\n    <br />\n    <br />\n    The InsIIT app is developed for the IIT Gandhinagar community, and is a one-stop shop for all things IITGN.\n    The app is completely open-source, and you can visit the following GitHub repositories and contribute to the project:\n</font>\n<br />\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-api' target='_blank'>\n    <font size='4'>\n        <b>insiit-api</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the API used in the InsIIT app. The API is written in Python using the FastAPI framework.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-ui-react-native'>\n    <font size='4'>\n        <b>insiit-ui-react-native</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the UI of the InsIIT app. The UI is written in Typescript using React Native.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-api-tests' target='_blank'>\n    <font size='4'>\n        <b>insiit-api-tests</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the testing of the API. The tests are written in Python using the pytest and requests modules.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-db' target='_blank'>\n    <font size='4'>\n        <b>insiit-db</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the PostgreSQL database used in the InsIIT app.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-admin'>\n    <font size='4'>\n        <b>insiit-admin</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the admin panel of the InsIIT app. The admin panel is written in Typescript using React.\n</font>\n<br />\n<br />\n<font size='4'>\n    Made with ❤️ by <a href='https://wadc-iitgn.github.io/' target='_blank'><font size='4'>Metis</font></a>, IIT Gandhinagar.\n</font>\n","version":"1.0","x-logo":{"url":"https://avatars.githubusercontent.com/u/146699003?s=1000&v=4"}}
   , servers: [
        {
            url: '/api',
            description: ''
        },
    ],
    securityDefinitions: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-KEY',
          description: 'Get the API Key from InsIIT Maintainers or mail us at metis@iitgn.ac.in'
        }
      }
};

const outputFile = './swagger_output.json';
const routes = ['./routes.js'];

swaggerAutogen(outputFile, routes, doc);