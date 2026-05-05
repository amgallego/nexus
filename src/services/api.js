// src/services/api.js

const API_URL = "http://localhost:8080/api";

export const endpoints = {
  // Solo la parte final, sin la URL completa
  login: "/usuarios",
};

export const apiFetch = async (endpoint, options = {}) => {
  // Aquí se junta http://localhost:8080/api con /usuarios
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response.json();
};