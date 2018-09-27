import mongoose from'mongoose';

const Schema = mongoose.Schema;
let NewFormation = new Schema({
    dateDebut: {type: Date, required: false},
    dateFin: {type: Date, required: false},
    formation: {type: String, required: true},
    etablissement: {type: Object, required: false}
});

export default mongoose.model('Formation', NewFormation);