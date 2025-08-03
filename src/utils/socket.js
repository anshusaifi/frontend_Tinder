// utils/socket.js
import { io } from "socket.io-client";

let socket = null;

export const createSocketConnection = () => {
  if (!socket || socket.disconnected) {
    // Connect to root path instead of BASE_URL
    socket = io("/", { 
      withCredentials: true,
      transports: ['websocket', 'polling']
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