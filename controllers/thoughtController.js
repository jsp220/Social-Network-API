const { User, Thought } = require('../models');

    // get all thoughts
const getThoughts = async (req, res) => {
    try {
        const response = await Thought.find().select('-__v');
        if (response) res.status(200).json(response);
        else res.status(500).json({ message: 'Something went wrong!'});
    } catch(err) {
        res.status(500).json(err);
    }
};

const getSingleThought = async (req, res) => {
    try {
        const response = await Thought.findOne(
            { _id: req.params.thoughtId}
        );
        if (response) res.status(200).json(response);
        else res.status(404).json({ message: 'Thought not found'});
    } catch(err) {
        res.status(500).json(err);
    }
};

const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        if (thought) {
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true}
            );
            if (user) res.status(200).json({ message: 'Successfully posted a thought!'});
            else res.json({ message: 'Thought created, but user not found' });
        }
    } catch(err) { res.status(500).json(err) };
};

const updateThought = async (req, res) => {
    try {
        const response = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (response) res.status(200).json(response);
        else res.status(404).json({ message: 'Thought not found' });
    } catch(err) { res.status(500).json(err) };
};

const deleteThought = async (req, res) => {
    try {
        const response = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (response) {
            res.status(200).json({ message: 'Thought successfully deleted'});
        } else res.status(404).json({ message: 'Thought not found' });
    } catch(err) { res.status(500).json(err) };
}

module.exports = { 
    getThoughts, 
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought
};