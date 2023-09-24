import { io } from 'socket.io-client';

const basicUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL; 

export const socket = io(basicUrl);