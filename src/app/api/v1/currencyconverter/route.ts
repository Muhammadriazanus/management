    // pages/api/postCurrencyData.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// API key for external service
const API_KEY = 'cur_live_azQrtEo9FOPB1yz2GR22CVAOz0XLVXrW7w5V7ozB';
const API_URL = 'https://api.currencyapi.com/v3/currencyconverter'; // Replace with actual endpoint

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { currencyData } = req.body;

    try {
      const response = await axios.post(API_URL, {
        ...currencyData,  // Send the currency data directly in the body
      }, {
        // params: {
        //   apikey: API_KEY,  // API key as query parameter
        // },
      });

      // Sending back the response from the external API to the client
      console.log(response.data)
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // If the request is not POST, respond with a 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
