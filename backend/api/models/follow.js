'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const FollowSchema = Schema({

    user: { type: Schema.ObjectId, ref:'User' },
    followed: { type: Schema.ObjectId, ref:'User' }
});

module.exports = mongoose.model('Follow', FollowSchema);