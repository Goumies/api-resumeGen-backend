const express = require('express'); // import du module dans le fichier = permet d'appliquer les methodes dediees
const mongodb = require('mongodb');
const assert = require('assert');
const config = require('./config/config.json');

// Serveur
const app = express();

// URL de connexion
const url = 'mongodb://localhost:27017';

// Nom BDD
const dbName = 'resumeGen';

// Connexion au serveur de BDD
mongodb.connect(url, function(error, client) {
    assert.equal(null, error);
    console.log('>>> Connection to mongoDB server successful <<<');
    console.log('');

    const db = client.db(dbName);

    insertDocuments(db, function(docs) {
        findDocuments(db, function(docs) {
        console.log('Connexion BDD - Avant fermeture de la connexion à MongoDB', docs);
        client.close();
        console.log('Connexion BDD - Après fermeture de la connexion  à MongoDB', docs);
        getFromBDD(sendToRoutes(docs));
        console.log('>>> Connexion BDD - getFromBDD has runned');
        });
    });
});

//////// CRUD methodes ////////
// Insertion de documents
const insertDocuments = function(db, callback) {
    // Recuperation des documents de la collection
    const collection = db.collection('documents');
    // Insertion de documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 2, b : 1}, {a : 3}
    ], function(error, result) {
        assert.equal(error, null);
        assert.equal(4, result.result.n);
        assert.equal(4, result.ops.length);
        console.log('');
        console.log('>>> 4 documents insérés dans la collection');
        callback(result);
    });
};

// Retourner tous les documents
const findDocuments = function(db, callback) {
    // Recuperation des documents de la collection
    const collection = db.collection('documents');
    // Retourner les documents
    collection.find({b : 1}).toArray(function(error, docs) {
        assert.equal(error, null);
        console.log('---------------- Documents ------------------');
        console.log(docs);
        console.log('---------------------------------------------');
        callback(docs);
    });
};
//////////////////

// Routes
app.get('/resumes', function(request, response) {
    // response.send('----------- Resumes ------------'); // deprecated
    
    const resumes = toJson;
    //response.status(response.statusCode).send('----------- Resumes ------------');
    response.json(resumes[0]);
});

const sendToRoutes = function(results) {
    console.log('From sendToRoutes: results =', results);
    return function() {
        return results;
    };
};

const getFromBDD = function (passResults) {
    toJson = passResults();
    console.log('From getFromBDD: toJson =', toJson);
};

let toJson;

// Surveillance du port du serveur
app.listen(config.port, function() {
    console.log('');
    console.log('>>> Express server running on config.port <<<');
});

