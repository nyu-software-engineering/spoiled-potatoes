require('../datastorage/mongo.js');
// const passport = require('passport');
const mongoose = require('mongoose');

class TraderRepository {
  constructor() {
    this.Trader = mongoose.model('Trader');
  }

  post(usr, password, em) {
    this.Trader.register(new this.Trader({ username: usr, email: em }), password, (err) => {
      if (err) {
        if (err.name === 'UserExistsError') {
          console.log('Registration Error');
        }
        console.log('Unknown Error Occurred');
        return false;
      }
      console.log('New user ', usr, ' has been successfully registered');
      return true;
    });
  }

  getPortfolio(usr) {
    // either returns portfolio or false; more granularity on error will be required
    this.Trader.findOne({ username: usr }, doc => doc.portfolio);
    return false;
  }

  findUser(usr) {
    // either returns user object or false; more granularity on error will be required
    this.Trader.findOne({ username: usr }, (doc) => {
      const retVal = { username: doc.username, email: doc.email };
      return retVal;
    });
    return false;
  }

  addPortfolioItem(usr, portObj) {
    // either returns updated portfolio object or false; more granularity on error will be required
    this.Trader.findOne({ username: usr }, (doc) => {
      const tempPort = doc.portfolio;
      Object.keys(portObj).forEach((key) => {
        tempPort[key] = portObj[key];
      });
      doc.update({ $set: { portfolio: tempPort } });
      doc.save();
      return (true, tempPort);
    });
    return (false, {});
  }
}

module.exports = {
  TraderRepo: TraderRepository,
};