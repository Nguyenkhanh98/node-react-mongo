import axios from 'axios';

const User = {};
const url = 'localhost:8080/api';
User.register = async (data) => {
  try {
    const response = await axios.post(`${url}/user`, {
      data,
    });
    console.log(response);
  } catch (error) {

  }
};

export default User;
