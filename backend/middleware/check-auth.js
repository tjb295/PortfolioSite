/*Want to check whether we are authenticated or not */
/*Use the jwt token to check */
const jwt = require('jsonwebtoken');

/*Typical express middleware*/
module.exports = (req, res, next) => {
  try {
    /*try to take token from header */
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'trapping_in_japan_12_is_the_greatest');
    next();
    /*Once verified call next to move on to next middleware */
  } catch (error) {
    res.status(401).json({ message: 'Failed to authenticate request.', error: error});
  }
}
