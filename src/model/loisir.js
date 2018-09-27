import mongoose from'mongoose';

const Schema = mongoose.Schema;
let NewLoisir = new Schema({
    intitule: {type: String, required: false}
});

export default mongoose.model('Loisir', NewLoisir);