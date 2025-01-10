import {Router} from 'express'

import { getAllNgo } from '../controllers/ngoController.js';

const ngoRouter = Router();

ngoRouter.get('/all',getAllNgo)


export default ngoRouter;