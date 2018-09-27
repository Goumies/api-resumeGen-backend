import mongoose from'mongoose';

const Schema = mongoose.Schema;
let NewAutre = new Schema({
    dateDebut: {type: Date, required: false},
    dateFin: {type: Date, required: false},
    intitule: {type: String, required: false}
});

export default mongoose.model('Autre', NewAutre);