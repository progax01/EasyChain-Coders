import express from 'express';
import Ai from '../controller/ai';
import airoute from "./ai";

const router = express.Router();

const routes = [{
    route: '/ai',
    router: airoute
}]

routes.forEach((route)=>{
    router.use(route.route,route.router);
})

export default router;