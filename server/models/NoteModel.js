import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    content:{
        type: String,
    },
    folderId:{
        type: String,
        required: true,
    }
},{
    timestamps: true // automatically create for createAt and updateAt
});

const NoteModel = mongoose.model('Note', noteSchema);
export default NoteModel;

