
import express from 'express';
import cors from 'cors';
require('dotenv').config()

const parsingResponse = (app) => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
}

const corsProcessing = (app) => {
    var corsOptions = {
        origin: process.env.URL_REACT,
        // origin: "*",
        optionsSuccessStatus: 200,
        credentials: true// some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors(corsOptions));
}
module.exports = { parsingResponse, corsProcessing }