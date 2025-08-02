// utils/socket.js
import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null;

export const createSocketConnection = () => {
  if (!socket || socket.disconnected) {
    socket = io(BASE_URL, { 
      withCredentials: true,
      transports: ['websocket', 'polling'] // Add fallback transports
    });
    
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });
    
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};