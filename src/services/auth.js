// src/services/auth.js
import axios from 'axios'; 

const API_URL = 'https://tal-noam.cs.bgu.ac.il';

export async function register(userDetails) {
  try {
    const response = await axios.post(`${API_URL}/Register`, userDetails);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${API_URL}/Logout`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}


export async function login(credentials) {
  try {
    const response = await axios.post(`${API_URL}/Login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }

  
}



  

  
  

