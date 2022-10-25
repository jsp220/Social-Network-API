const { User, Thought } = require('../models');

const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        );
        if (thought) res.status(200).json({ message: 'Successfully posted a reaction!'});
        else res.status(404).json({ message: 'Thought not found' });
    } catch(err) { res.status(500).json(err) };
};

const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (thought) {
            res.status(200).json({ message: 'Reaction successfully deleted'});
        } else res.status(404).json({ message: 'Reaction/Thought not found' });
    } catch(err) { res.status(500).json(err) };
}


module.exports = { 
    createReaction,
    deleteReaction
};