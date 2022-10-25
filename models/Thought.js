const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create User model
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
            maxlength: 280
		},
        createdAt: {
            type: Date,
            default: Date.now,
        },
		username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
	},
	{
		toJSON: {
			virtuals: true,
            getters: true
		},
		id: false,
	}
);

// virtual property to count number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

// Initialize and export Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;