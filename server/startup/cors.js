const cors = require("cors");

module.exports = function (app) {
  const corsOptions = {
    origin: "http://localhost:3000",  
    credentials: true, 
    exposedHeaders: "*"  
  };
  
  app.use(cors(corsOptions)); 
};
