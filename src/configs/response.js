const response = (isSuccess, status, message = '', data = '') => {
  return {
    isSuccess, status, message, data
  }
};

module.exports = response;
