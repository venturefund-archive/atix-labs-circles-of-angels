const formatError = error =>
  error.response ? error.response.data : error.message;

export default formatError;
