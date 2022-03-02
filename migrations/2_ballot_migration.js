const Ballot = artifacts.require("Ballot");

module.exports = function (deployer) {
  deployer.deploy(Ballot, parseInt(process.env.MAX_PROPOSALS || "3"));
};
