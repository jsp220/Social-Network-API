const { Schema, model } = require('mongoose');

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

// virtual property to count number of friends
userSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

// Initialize and export User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;