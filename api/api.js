import axios from "axios";

// const config = new Conf();
// console.log(config)
// const actualEnvironment = "develop";

// config.set("develop", {
//   baseURL: "http://localhost:3001",
//   timeout: 1000
// });
const api = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 1000,
    headers:{
      "Access-Control-Allow-Origin": "http://localhost:3001"
    }
  });

export default api;
