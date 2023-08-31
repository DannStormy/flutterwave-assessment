import { Router } from 'express';
import ROUTES from './constants';
import { StatusCodes } from 'http-status-codes';
import accountRouter from './accounts';

export function invalidRoute(req, res) {
  return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not exist' });
}

export function testRoute(req, res) {
  return res
    .status(StatusCodes.OK)
    .json({ message: 'PONG' });
}


const { WILD_CARD, HOME } = ROUTES;
const testRouter = Router();
testRouter.all(HOME, testRoute);

// handle unknown routes in the api domain
const invalidRoutes = Router();
invalidRoutes.all(WILD_CARD, invalidRoute);

const versionOneRouter = [
  testRouter,
  accountRouter,
  invalidRoutes,
];

export default versionOneRouter;
