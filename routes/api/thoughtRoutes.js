const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    // updateUser,
    // deleteUser
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
//     .put(updateUser)
//     .delete(deleteUser);

module.exports = router;
