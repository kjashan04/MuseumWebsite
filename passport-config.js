const passportJWT = require("passport-jwt");
const UserService = require("./user-service");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    UserService.getUserById(jwt_payload._id)
      .then(user => done(null, user))
      .catch(err => done(err, false));
  }));
};
