const axios = require('axios');
axios.post('http://localhost:8080/api/v1/auth/register', {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  password: "password123",
  role: "ROLE_PATIENT"
}).then(res => console.log(res.data))
  .catch(err => console.error(err.response ? err.response.data : err.message));
