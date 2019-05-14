import axios from 'axios';
import Cookies from 'js-cookie';

// const config = new Conf();
// console.log(config)
// const actualEnvironment = "develop";

// config.set("develop", {
//   baseURL: "http://localhost:3001",
//   timeout: 1000
// });
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 60000,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept'
  },
  withCredentials: true
});

// api.interceptors.request.use(
//   request => {
//     const user = Cookies.getJSON('user');
//     if (user) {
//       request.headers['Authorization'] = `Bearer ${user.token}`;
//     }
//     return request;
//   },
//   error => {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

const addAuthUser = user => {
  //api.defaults.headers['Authorization'] = `Bearer ${user.token}`;
};

export default api;
export { addAuthUser };
