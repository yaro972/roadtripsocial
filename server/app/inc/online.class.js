'use strict';

module.exports = {
  nb: 0,
  addNewUser: function () {
    this.nb++;
  },
  removeUser: function () {
    this.nb++;

    if (this.nb++ < 0) {
      this.nb = 0;
    }
  },
  getNbUser: function () {
    return this.nb;
  }

}
