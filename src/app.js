import express from 'express';
import mongodb from 'mongodb';
import assert from 'assert';
import config from './config/config.json';

// Serveur
const app = express();

// URL de connexion
const url = config.mongoUrl;

// Nom BDD
const dbName = 'resumeGen';

// Connexion au serveur de BDD
mongodb.connect(url, (error, client) => {
    assert.equal(null, error);
    console.log('>>> Connection to mongoDB server successful <<<');
    console.log('');

    const db = client.db(dbName);

    insertDocuments(db, (docs) => {
        findDocuments(db, (docs) => {
        console.log('Connexion BDD - Avant fermeture de la connexion à MongoDB', docs);
        client.close();
        console.log('Connexion BDD - Après fermeture de la connexion  à MongoDB', docs);
        getFromDB(sendToRoutes(docs));
        console.log('>>> Connexion BDD - getFromDB has runned');
        });
    });
});

//////// CRUD methodes ////////
// Insertion de documents
const insertDocuments = (db, callback) => {
    // Recuperation des documents de la collection
    const collection = db.collection('documents');
    // Insertion de documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 2, b : 1}, {a : 3}
    ], (error, result) => {
        assert.equal(error, null);
        assert.equal(4, result.result.n);
        assert.equal(4, result.ops.length);
        console.log('');
        console.log('>>> 4 documents insérés dans la collection');
        callback(result);
    });
};

// Retourner tous les documents
const findDocuments = (db, callback) => {
    // Recuperation des documents de la collection
    const collection = db.collection('documents');
    // Retourner les documents
    collection.find({b : 1}).toArray((error, docs) => { // Voir pour retourner un seul doc
        assert.equal(error, null);
        console.log('---------------- Documents ------------------');
        console.log(docs);
        console.log('---------------------------------------------');
        callback(docs);
    });
};
//////////////////

// Routes
app.get('/resumes', (request, response) => {
    // response.send('----------- Resumes ------------'); // deprecated
    
    const resumes = toJson;
    response.status(response.statusCode).send('----------- Resumes ------------');
    response.json(resumes[0]);
});

const sendToRoutes = (results) => {
    console.log('From sendToRoutes: results =', results);
    return () => {
        return results;
    };
};

const getFromDB = (passResults) => {
    toJson = passResults();
    console.log('From getFromDB: toJson =', toJson);
};

let toJson; // Pas forcement propre ?

// Surveillance du port du serveur
app.listen(`${config.port}`, () => {
    console.log('');
    console.log(`>>> Express server running on ${config.port} <<<`);
});

