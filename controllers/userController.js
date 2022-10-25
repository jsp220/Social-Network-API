const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const response = await User.find();
            if (response) {
                const data = await res.json(response);
                res.status(200).send(data);
            } else res.status(500).json({ message: 'Something went wrong!'});
        } catch(err) {
            res.status(500).json(err);
        }
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
};
