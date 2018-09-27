import mongoose from'mongoose';

import competence from './Competence';
import experience from './Experience';
import formation from './Formation';
import loisir from './Loisir';
import autre from './Autre';

let competences, experiences, formations, autres, loisirs;
competences = experiences =  formations =  autres =  loisirs = [];



const Schema = mongoose.Schema;
let NewCV = new Schema({
    prenom: {type: String, required: true},
    nom: {type: String, required: true},
    poste: {type: String, required: true},
    nombreAnneesExperience: {type: Number, required: false},
    competences: competence.schema,
    experiences: [experience.schema],
    formations: [formation.schema],
    autres: [autre.schema],
    loisirs: [loisir.schema]
    
});

export default mongoose.model('CV', NewCV);