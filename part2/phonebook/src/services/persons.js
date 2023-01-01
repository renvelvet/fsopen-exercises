import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

export const getAll = () =>
  axios.get(baseUrl).then((response) => response.data);

export const add = (newPhonebook) => axios.post(baseUrl, newPhonebook).then((response) => response.data)
