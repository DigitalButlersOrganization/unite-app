import axios from 'axios';
import { auth } from './auth';

export const instance = axios.create({
  baseURL: 'https://api.unite2030.digitalbutlers.team/api/',
  timeout: 10000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const api = {
  auth,
};
