const Migrations = artifacts.require("KittyContract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
