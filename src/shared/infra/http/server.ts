import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import socketio from 'socket.io';
import http from 'http';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// // INATIVO POR HORA: responde ao FRONT-END, dando margem para uma atualiação de dashboard, por exemplo
// function reciveDeliverySocket(): void {
//     const socket = io;
//     socket.emit('new', 'Nova entrega solicitada');
// }

// Ouve o FRONT-END, quando ele emite a mensagem 'generate', indicando um nova entrega e chama a função de resposta.
io.on('connection', socket => {
    // socket.on('generate', reciveDeliverySocket); // Função original
    socket.on('online', () => {}); // Mantém a aplicação ativa quando em background
});

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use((request: Request, response: Response, next: NextFunction) => {
    request.io = io;

    return next();
});

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor',
    });
});

server.listen(3335, () => {
    console.log('Servidor iniciado com sucesso na porta 3335!');
});
