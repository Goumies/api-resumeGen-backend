import mongoose from'mongoose';

import competence from './competence';
import experience from './experience';
import formation from './formation';
import loisir from './loisir';
import autre from './autre';

let competences, experiences, formations, autres, loisirs;
competences = experiences =  formations =  autres =  loisirs = [];

const Schema = mongoose.Schema;
let NewCV = new Schema({
    prenom: {type: String, required: true},
    nom: {type: String, required: true},
    poste: {type: String, required: true},
    nombreAnneesExperience: {type: Number, required: false},
    children: [
        competences,
        experiences,
        formations,
        autres,
        loisirs
    ]
});

export default mongoose.model('CV', NewCV);