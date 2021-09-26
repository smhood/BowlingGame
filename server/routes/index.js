const { Router } = require('express');
const { bowlingRouter } = require('./bowling')

const apiRouter = Router()

apiRouter.use('/bowling', bowlingRouter);

module.exports = {
    apiRouter,
}