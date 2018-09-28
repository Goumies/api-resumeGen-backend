import mongoose from'mongoose';

const Schema = mongoose.Schema;
let NewCompetence = new Schema({
    langages: {type: Array, required: false}, // new Schema Langage / Framework...
    frameworks: {type: Array, required: false},
    serveurs: {type: Array, required: false},
    sgbds: {type: Array, required: false},
    methodes: {type: Array, required: false},
    outils: {type: Array, required: false},
    autres: {type: Array, required: false},
    os: {type: Array, required: false}
});

export default mongoose.model('Competence', NewCompetence);