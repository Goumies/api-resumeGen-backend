import express from 'express'; // import du module dans le fichier = permet d'appliquer les methodes dediees
import mongoose from 'mongoose'; // plein d'helpers, lib + fournie
import config from './config/config.json';

import { CV, Competence, Experience, Formation, Loisir, Autre } from './model/cv';

// Serveur
const app = express();

// URL de connexion
const url = config.mongoUrl;

// Nom BDD
const dbName = config.dbName; // ajouter dans config

// BDD, declaration globale pour utilisation dans les routes
let database;

// Surveillance du port du serveur
const server = app.listen(config.port, () => {

});

// Connexion au serveur de BDD
const connect = mongoose.connect(url, { useNewUrlParser: true }, (error, client) => {

});

Promise.all([server, connect]).then(results => {
    console.log(`>>> Express server running on ${config.port} <<<`);
    console.log('>>> Connection to mongoDB server successful <<<');
    database = mongoose.connection;

// Ajouter un CV
app.post('/resumes/add', (requete, reponse, next) => {
    const newCV = new CV(requete.body);

    newCV.save((error, cv) => {
        if (error) console.error(error);
        reponse.json(cv);
    });
});

// Recuperer tous les CVs
app.get('/resumes', (requete, reponse, next) => {

    CV.find({}, (error, result) => {
        reponse.json(result);
    });
});

// Recuperer un CV par id
app.get('/resumes/resume/:id', (requete, reponse, next) => {
    console.log('route get by id', requete.params.id);
    // Recuperation de l'id de la requete
    let id = requete.params.id;

    CV.find({ _id: id }, (error, result) => {
        if (error) {
            console.error(error);
        };
        reponse.json(result);
    });
});

// Modification
app.post('/edit/:id', (requete, reponse) => {
    let id = requete.params.id;
    CV.findByIdAndUpdate({ _id: id }, requete.body, (error, cv) => {
        if (error) {
            reponse.send(error);
        };
        reponse.json(cv);
    });
});

// Suppression
app.get('/delete/:id', (requete, reponse) => {
    let id = requete.params.id;
    CV.findOneAndRemove({ _id: id }, (error, cv) => {
        if (error) {
            reponse.send(error);
        };
        reponse.json(cv);
    });
});

}).catch(error => {
    console.error(error);
});


// Parametrage des requetes et reponses du serveur
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

