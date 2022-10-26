const { User, Thought } = require('../models');

    // get all users
const getUsers = async (req, res) => {
    try {
        const response = await User.find().select('-__v');
        if (response) res.status(200).json(response);
        else res.status(500).json({ message: 'Something went wrong!'});
    } catch(err) {
        res.status(500).json(err);
    }
};

const getSingleUser = async (req, res) => {
    try {
        const response = await User.findOne({ _id: req.params.userId})
            .select('-__v')
            .populate([
                {
                    path: 'thoughts', 
                    populate: 'reactions'
                }, 
                {
                    path: 'friends',
                    select: '-__v -email -thoughts'
                } 
            ]);
        if (response) res.status(200).json(response);
        else res.status(404).json({ message: 'User not found'});
    } catch(err) {
        res.status(500).json(err);
    }
};

const createUser = async (req, res) => {
    try {
        const response = await User.create(req.body);
        if (response) res.status(200).json(response);
        else res.status(500).json({ message: 'Something went wrong!'});
    } catch (err) {res.status(500).json(err);}
};

const updateUser = async (req, res) => {
    try {
        const response = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (response) res.status(200).json(response);
        else res.status(404).json({ message: 'User not found' });
    } catch(err) { res.status(500).json(err) };
};

const deleteUser = async (req, res) => {
    try {
        const response = await User.findOneAndDelete({ _id: req.params.userId });
        if (response) {
            const thought = await Thought.deleteMany({ _id: { $in: response.thoughts } });
            res.status(200).json({ message: 'User successfully deleted'});
        } else res.status(404).json({ message: 'User not found' });
    } catch(err) { res.status(500).json(err) };
}

const addFriend = async (req, res) => {
    try {
        const response = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true}
        );
        if (response) res.status(200).json(response);
        else res.status(404).json({ message: 'Something went wrong!'});
    } catch (err) {res.status(500).json(err);}
};

const deleteFriend = async (req, res) => {
    try {
        const response = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { runValidators: true, new: true}
        );
        if (response) res.status(200).json(response);
        else res.status(404).json({ message: 'Something went wrong!'});
    } catch (err) {res.status(500).json(err);}
};

module.exports = { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend };