const ethers = require('ethers');

exports.tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether');
};
