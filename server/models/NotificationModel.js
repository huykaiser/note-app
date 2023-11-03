import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    content:{
        type: String,
    }
},{
    timestamps: true // automatically create for createAt and updateAt
});

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;
