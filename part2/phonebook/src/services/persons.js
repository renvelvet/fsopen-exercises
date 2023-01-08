import axios from 'axios';
const baseUrl = 'https://icy-violet-6046.fly.dev/api/persons';

export const getAll = () =>
  axios.get(baseUrl).then((response) => response.data);

export const add = (newPhonebook) =>
  axios.post(baseUrl, newPhonebook).then((response) => response.data);

export const replaceNumber = (id, newNumber) =>
  axios.put(`${baseUrl}/${id}`, newNumber).then((response) => response.data);

export const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);
