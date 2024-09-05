import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { AppDataSource } from '../typeorm';

// Irá inicializa o BD, e dar uma resposta
AppDataSource.initialize()
  .then(() => {
    app.listen(3333, () => {
      console.log('Server Started on port 3333! 🏆');
    });
  })
  .catch(error => console.error('Erro ao inicializar o servidor', error));
