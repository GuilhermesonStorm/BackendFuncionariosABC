import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UsuariosController from './controllers/UsuariosController';
import DependentesController from './controllers/DependentesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/users', UsuariosController.index);
routes.get('/users/:id', UsuariosController.show);
routes.post('/users', upload.array('avatar'), UsuariosController.create);
routes.put('/users/:id', upload.array('avatar'), UsuariosController.update);
routes.delete('/users/:id', UsuariosController.exclude);
routes.patch('/users/:id', UsuariosController.like);
routes.post(
    '/relatives',
    upload.array('avatar_dependente'),
    DependentesController.create,
);
routes.put(
    '/relatives/:id',
    upload.array('avatar_dependente'),
    DependentesController.update,
);
routes.get('/relatives', DependentesController.index);
routes.get('/relatives/:id', DependentesController.show);
routes.delete('/relatives/:id', DependentesController.exclude);

export default routes;
