import fakeData from "../fakeData/index.js";
import NotificationModel from "../models/NotificationModel.js";
import { AuthorModel, FolderModel, NoteModel } from '../models/index.js';
import { GraphQLScalarType } from "graphql";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.toISOString();
        }
    }),
    Query: {
        folders: async (parent, args, context) => {
            const folders = await FolderModel.find({
                authorId: context.uid,
            }).sort({
                updatedAt: 'desc',
            });
            // console.log({ folders, context });
            return folders;
        },
        folder: async (parent, args) => {
            const folderId = args.folderId;
            const foundFolder = await FolderModel.findById(folderId);

            return foundFolder;
            // return fakeData.folders.find(folder => folder.id === folderId);
        },
        note: async (parent, args) => {
            const noteId = args.noteId;
            const note = await NoteModel.findById(noteId);

            return note;

            // return fakeData.notes.find(note => note.id === noteId);
        },
    },
    Folder: {
        author: async (parent, args) => {
            const authorId = parent.authorId;
            const author = await AuthorModel.findOne({
                uid: authorId,
            });

            return author;

            // return fakeData.authors.find(author => author.id === authorId);
        },
        notes: async (parent, args) => {
            console.log({ parent });
            const notes = await NoteModel.find({
                folderId: parent.id,
            }).sort({
                updatedAt: 'desc',
            });
            console.log({ notes });
            return notes;
            // return fakeData.notes.filter((note) => note.folderId === parent.id);
        },
    },
    Mutation: {
        addNote: async (parent, args) => {
            const newNote = new NoteModel(args);
            await newNote.save();

            return newNote;
        },
        updateNote: async (parent, args) => {
            const noteId = args.id;
            const note = await NoteModel.findByIdAndUpdate(noteId, args);

            return note;
        },
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({ ...args, authorId: context.uid });
            // console.log({ newFolder });
            pubsub.publish("FOLDER_CREATED", {
                folderCreated: {
                    message: "a new folder created"
                }
            });
            await newFolder.save();

            return newFolder;
        },
        register: async (parent, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid });

            if (!foundUser) {
                const newUser = new AuthorModel(args);
                await newUser.save();

                return newUser;
            }

            return foundUser;
        },
        pushNotification: async (parent, args) => {
            const newNotification = new NotificationModel(args);

            pubsub.publish("PUSH_NOTIFICATION", {
                notification: {
                    message: args.content,
                }
            });

            await newNotification.save();

            return { message: "SUCCEED"}
        }
    },
    Subscription: {
        folderCreated: {
            subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED', 'NOTE_CREATED'])
        },
        notification:{
            subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"])
        }
    }
};


