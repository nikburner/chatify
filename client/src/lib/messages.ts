import axios from 'axios';

export async function retrieveMessages() {
    const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
    const response = await axios.post(
      'http://localhost:3000/messages', 
      {
        content: message,
        groupId: 1  // For a specific group, or leave out for one-to-one chat
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    if (response.data) {
      console.log("Message sent:", response.data);
    }
}