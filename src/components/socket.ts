import { io } from '@/index';
import { Logger } from './logger/winston';

export const WS = () => {
  io.on('connection', (socket) => {
    Logger.debug('A user connected');
    console.log('A user connected', socket.id);
    socket.on('disconnect', () => {
      Logger.debug('A user disconnected');
    });

    /**
     * Listeners
     */
    socket.on('create-game-room', (data: { room: string; user: string }) => {
      socket.join(data.room);
      socket.emit('room-created', { room: data.room });
    });

    socket.on('matchmaking-demo', (data) => {
      console.log('matchmaking-demo', data);
      setTimeout(() => {
        io.to(data.room).emit('update-herd-list', { room: data.room });
      }, 10000);
    });

    socket.on('chat message', (msg) => {
      console.log('## message: ' + msg);
      io.emit('chat message', msg + ' - ' + socket.id);
    });

    /**
     * Emitters
     */
    socket.emit('chat message', 'hello');
  });
};
