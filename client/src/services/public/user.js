import axios from 'axios';

const User = {};
const url = 'localhost:8080';
User.register = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${url}/user`, {
      data,
    });
  } catch (error) {

  }
};

export default User;
