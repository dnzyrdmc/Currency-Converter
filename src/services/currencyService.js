import axios from 'axios';

export async function convertCurrency({ amount, from, to }) {
  const response = await axios.get('https://api.frankfurter.app/latest', {
    params: { amount, from, to }
  });

  return response.data;  
}
 