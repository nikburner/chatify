const axios = require('axios')

const message = '';

async function retrieveMessages() {
    const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYzNjQwNjYwMn0.1Z6Z9Q'
    const response = await axios.get('http://localhost:3000/messages/2', { 
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

    if (response.data) {
      console.log("Message sent:", response.data);
    }
}

retrieveMessages();