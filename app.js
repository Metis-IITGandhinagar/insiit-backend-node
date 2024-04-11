
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');



const app = express();
const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MongoDBlocal 
const MONGODB_URI = process.env.MongoDBAtlas
//It uses mongoAtlas

app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(cors());
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send(' Go to /api-docs for API Documentation');
});

// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const swaggerFile = {
  "openapi": "3.0.0",
  "info": {
    "title": "InsIIT API",
    "description": "<font size='4'>\n    An API developed for the <b>InsIIT app</b>.\n    <br />\n    <br />\n    The InsIIT app is developed for the IIT Gandhinagar community, and is a one-stop shop for all things IITGN.\n    The app is completely open-source, and you can visit the following GitHub repositories and contribute to the project:\n</font>\n<br />\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-api' target='_blank'>\n    <font size='4'>\n        <b>insiit-api</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the API used in the InsIIT app. The API is written in Python using the FastAPI framework.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-ui-react-native'>\n    <font size='4'>\n        <b>insiit-ui-react-native</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the UI of the InsIIT app. The UI is written in Typescript using React Native.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-api-tests' target='_blank'>\n    <font size='4'>\n        <b>insiit-api-tests</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the testing of the API. The tests are written in Python using the pytest and requests modules.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-db' target='_blank'>\n    <font size='4'>\n        <b>insiit-db</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the PostgreSQL database used in the InsIIT app.\n</font>\n<br />\n<a href='https://github.com/WADC-IITGN/insiit-admin'>\n    <font size='4'>\n        <b>insiit-admin</b>\n    </font>\n</a>\n<font size='4'>: This repository maintains the code for the admin panel of the InsIIT app. The admin panel is written in Typescript using React.\n</font>\n<br />\n<br />\n<font size='4'>\n    Made with ❤️ by <a href='https://wadc-iitgn.github.io/' target='_blank'><font size='4'>Metis</font></a>, IIT Gandhinagar.\n</font>\n",
    "version": "1.0",
    "x-logo": {
      "url": "https://avatars.githubusercontent.com/u/146699003?s=1000&v=4"
    }
  },
  "servers": [
    {
      "url": "/api",
      "description": ""
    }
  ],
  "paths": {
    "/mess-menu": {
      "get": {
        "tags": [
          "Mess Menu"
        ],
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found now"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "post": {
        "tags": [
          "Mess Menu"
        ],
        "description": "",
        "parameters": [
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "security": [
          {
            "apiKeyAuth": []
          }
        ]
      }
    },
    "/mess-menu/{id}": {
      "get": {
        "tags": [
          "Mess Menu"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "put": {
        "tags": [
          "Mess Menu"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "delete": {
        "tags": [
          "Mess Menu"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/buses": {
      "get": {
        "tags": [
          "Buses"
        ],
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "post": {
        "tags": [
          "Buses"
        ],
        "description": "",
        "parameters": [
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "401": {
            "description": "Unauthorized"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/buses/{id}": {
      "get": {
        "tags": [
          "Buses"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "put": {
        "tags": [
          "Buses"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "BusName": {
                    "example": "any"
                  },
                  "DepartureTime": {
                    "example": "any"
                  },
                  "Destination": {
                    "example": "any"
                  },
                  "Source": {
                    "example": "any"
                  },
                  "Stops": {
                    "example": "any"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "Buses"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/towns": {
      "get": {
        "tags": [
          "Buses"
        ],
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/search": {
      "get": {
        "tags": [
          "Buses"
        ],
        "description": "",
        "parameters": [
          {
            "name": "source",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "destination",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/events": {
      "get": {
        "tags": [
          "Events"
        ],
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "post": {
        "tags": [
          "Events"
        ],
        "description": "",
        "parameters": [
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "event_name": {
                    "example": "any"
                  },
                  "location": {
                    "example": "any"
                  },
                  "date": {
                    "example": "any"
                  },
                  "start_time": {
                    "example": "any"
                  },
                  "poster_image_url": {
                    "example": "any"
                  },
                  "description": {
                    "example": "any"
                  },
                  "added_by": {
                    "example": "any"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/events/{id}": {
      "get": {
        "tags": [
          "Events"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "delete": {
        "tags": [
          "Events"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/events/{eventid}": {
      "put": {
        "tags": [
          "Events"
        ],
        "description": "",
        "parameters": [
          {
            "name": "eventid",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "event_name": {
                    "example": "any"
                  },
                  "location": {
                    "example": "any"
                  },
                  "date": {
                    "example": "any"
                  },
                  "start_time": {
                    "example": "any"
                  },
                  "poster_image_url": {
                    "example": "any"
                  },
                  "description": {
                    "example": "any"
                  },
                  "added_by": {
                    "example": "any"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/outlets": {
      "get": {
        "tags": [
          "Outlets"
        ],
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "post": {
        "tags": [
          "Outlets"
        ],
        "description": "",
        "parameters": [
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "example": "any"
                  },
                  "location": {
                    "example": "any"
                  },
                  "landmark": {
                    "example": "any"
                  },
                  "open_time": {
                    "example": "any"
                  },
                  "close_time": {
                    "example": "any"
                  },
                  "rating": {
                    "example": "any"
                  },
                  "menu": {
                    "example": "any"
                  },
                  "image": {
                    "example": "any"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/outlets/{id}": {
      "get": {
        "tags": [
          "Outlets"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "patch": {
        "tags": [
          "Outlets"
        ],
        "description": "",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "example": "any"
                  },
                  "location": {
                    "example": "any"
                  },
                  "landmark": {
                    "example": "any"
                  },
                  "open_time": {
                    "example": "any"
                  },
                  "close_time": {
                    "example": "any"
                  },
                  "rating": {
                    "example": "any"
                  },
                  "menu": {
                    "example": "any"
                  },
                  "image": {
                    "example": "any"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/outlets/{outletId}": {
      "patch": {
        "description": "",
        "parameters": [
          {
            "name": "outletId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "menu": {
                    "example": "any"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/outlet/{outletId}": {
      "delete": {
        "tags": [
          "Outlets"
        ],
        "description": "",
        "parameters": [
          {
            "name": "outletId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "x-api-key",
            "in": "header",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/outlets/menu/{outletId}": {
      "get": {
        "tags": [
          "Outlets"
        ],
        "description": "",
        "parameters": [
          {
            "name": "outletId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/representatives": {
      "get": {
        "tags": [
          "Representatives"
        ],
        "description": "",
        "responses": {
          "200": {
            "description": "OK"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-KEY",
        "description": "Get the API Key from InsIIT Maintainers or mail us at metis@iitgn.ac.in"
      }
    }
  }
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


module.exports = app;
