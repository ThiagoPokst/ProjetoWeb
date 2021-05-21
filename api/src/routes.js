const { Router } = require('express');
const SessionControler = require('./controllers/SessionControler');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

const routes = Router();

routes.post('/post', PostController.store);
routes.post('/session', SessionControler.create);
routes.get('/post', PostController.index);
routes.post('/users', UserController.store);


module.exports = routes;