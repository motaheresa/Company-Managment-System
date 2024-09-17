// Assuming you're using Axios for HTTP requests in your React app
import axios from 'axios';

// Set the base URL for Axios requests
axios.defaults.baseURL = 'http://www.naeemhr.com'; // Replace with your domain name

// Example API requestaxios.get('/api/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
