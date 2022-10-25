const { User, Thought } = require('../models');

    // get all thoughts
const getThoughts = async (req, res) => {
    try {
        const response = await Thought.find();
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

// const updateUser = async (req, res) => {
//     try {
//         const response = await User.findOneAndUpdate(
//             { _id: req.params.userId },
//             { $set: req.body },
//             { runValidators: true, new: true }
//         );
//         if (response) res.status(200).json(response);
//         else res.status(404).json({ message: 'User not found' });
//     } catch(err) { res.status(500).json(err) };
// };

// const deleteUser = async (req, res) => {
//     try {
//         const response = await User.findOneAndDelete({ _id: req.params.userId });
//         if (response) {
//             // Thought.deleteMany({ _id: { $in: user.thoughts } });
//             res.status(200).json({ message: 'User successfully deleted'});
//         } else res.status(404).json({ message: 'User not found' });
//     } catch(err) { res.status(500).json(err) };
// }

module.exports = { 
    getThoughts, 
    getSingleThought, 
    createThought, 
    // updateUser, 
    // deleteUser 
};