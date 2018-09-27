import mongoose from'mongoose';

const Schema = mongoose.Schema;
let NewCV = new Schema({
    prenom: {type: String, required: true},
    nom: {type: String, required: true}/*,
    poste: {type: String, required: true},
    nombreAnneesExperience: {type: Number, required: false},
    competences: {type: Object, required: true},
    experiences: {type: Array, required: false},
    formations: {type: Array, required: true},
    autres: {type: Array, required: false},
    loisirs: {type: Array, required: false}*/
});

export default mongoose.model('CV', NewCV);