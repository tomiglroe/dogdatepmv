'use strict';

const Follow = require('../../models/follow');

function getCounters(req, res) {

  let userId = req.user.sub;
  if (req.params.id) {

    userId = req.params.id;
  }
  getCountFollow(userId).then((value) => {

    return res.status(200).send(value);
  });
}

async function getCountFollow(user_id) {

  let following = await Follow.countDocuments({ user: user_id })
    .exec()
    .then((count) => {
      console.log(count);
      return count;
    })
    .catch((err) => { return handleError(err); });

  let followed = await Follow.countDocuments({ followed: user_id })
    .exec()
    .then((count) => {
      return count;
    })
    .catch((err) => { return handleError(err); });

  return { following: following, followed: followed }
}

module.exports = getCounters;