# Cube.js + MongoDB + React App

## This project demonstrates Cube.js features

## Setup and run MongoDB and BI connector
1. Import data from ```data``` flder first ```mongorestore ./data/twitter/tweets.bson```
2. Run MongoDB, type ```mongod``` and press Enter
3. Download, extract MongoDB BI connector and run ```bin/mongosqld```. You should to see smth like ```2019-08-10T22:59:07.322+0300 I NETWORK    [initandlisten] waiting for connections at 127.0.0.1:3307
2019-08-10T22:59:07.322+0300 I NETWORK    [initandlisten] waiting for connections at /tmp/mysql.sock
2019-08-10T22:59:07.327+0300 I SCHEMA     [sampler] sampling MongoDB for schema...
2019-08-10T22:59:07.660+0300 I SCHEMA     [sampler] mapped schema for 1 namespace: "test" (1): ["tweets"]```
Your schema mapped successfully!

## Get the project set up

1. Copy this project
2. Go to ```server``` folder and run ```npm install```
3. To start server run ```npm run dev```
4. Go to ```client``` folder and run ```npm install```
5. To start client run ```npm start```
