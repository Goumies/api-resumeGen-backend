import mongoose from'mongoose';

const Schema = mongoose.Schema;
let NewExperience = new Schema({
    dateDebut: {type: Date, required: false},
    dateFin: {type: Date, required: false},
    fonction: {type: String, required: true},
    societe: {type: Object, required: true},
    realisations: {type: Array, required: false},
    environnement: {type: Array, required: false}
});

export default mongoose.model('Experience', NewExperience);