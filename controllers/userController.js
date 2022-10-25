const User = require('../models/User');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const response = await User.find();
            if (response) res.status(200).json(response);
            else res.status(500).json({ message: 'Something went wrong!'});
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // get one user by username
    async getSingleUser(req, res) {
        try {
            const response = await User.findOne({ username: req.params.username});
            if (response) res.status(200).json(response);
            else res.status(404).json({ message: 'User not found'});
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const response = await User.create(req.body);
            if (response) res.status(200).json(response);
            else res.status(500).json({ message: 'Something went wrong!'});
        } catch (err) {res.status(500).json(err);}
    },
};
