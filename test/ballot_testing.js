const Ballot = artifacts.require("Ballot");

const MAX_PROPS = parseInt(process.env.MAX_PROPOSALS || "3")

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Ballot", function (accounts) {
  let instance;

  it("should be deployed", async function () {
    const i = await Ballot.deployed();
    instance = i;

    assert.isNotNull(instance)
    assert.isString(instance.address)
    assert.match(instance.address, /0x[a-zA-Z0-9]{40}/)
  });

  it("should not expose getProposalId function", function () {
    assert.notInclude(Object.keys(instance), "getProposalId")
  })

  it("should reveal the chairperson getter function and deploy it with same account", function () {
    assert.include(Object.keys(instance), "chairperson")
    assert.instanceOf(instance.chairperson, Function);
    assert.equal(instance.constructor.class_defaults.from, accounts[0])
    return instance.chairperson()
      .then(r => assert.equal(r, accounts[0]))
      .catch(e => assert.isUndefined(e))
  })

  it("should throw error if proposal not found", function () {
    return instance.submitVote(accounts[0])
      .then(r => assert.isUndefined(r))
      .catch(e => assert.equal(e.reason, "Proposal does not exists"))
  })

  it("should throw error if chairperson register itself", function () {
    return instance.register(accounts[0])
      .then(r => assert.isUndefined(r))
      .catch(e => assert.equal(e.reason, "Chairperson not allowed to stand"))
  })

  it("should throw error if non chairperson tries to call setWeight function", function () {
    return instance.setWeight(accounts[1], 1, { from: accounts[1] })
      .then(r => assert.isUndefined(r))
      .catch(e => assert.equal(e.reason, "Only chairperson is allowed to perform this action"))
  })

  it("should throw error if non chairperson tries to call register function", function () {
    return instance.register(accounts[1], { from: accounts[1] })
      .then(r => assert.isUndefined(r))
      .catch(e => assert.equal(e.reason, "Only chairperson is allowed to perform this action"))
  })

  it(`should accept max ${MAX_PROPS} proposals`, function () {
    return Promise
      .all(accounts.slice(1, MAX_PROPS + 1).map(account => instance.register(account)))
      .then(data => {
        assert.isArray(data)
        for (const entry of data) {
          assert.isTrue(entry.receipt.status)
        }

        return instance.register(accounts[MAX_PROPS + 1])
          .then(r => { console.log("test check #1", r); assert.isUndefined(r) })
          .catch(e => {
            console.log("test check #2", e)
            assert.isFalse(e.receipt.status)
            assert.isUndefined(e.reason)
          })
      }).catch(e => { console.log("test check #3", e); assert.isUndefined(e) })
  })

  it("should throw error if duplicate proposal registers", function () {
    return instance.register(accounts[1])
      .then(r => assert.isUndefined(r))
      .catch(e => assert.equal(e.reason, "Duplicate proposal"))
  })

  it("should throw error in getWinner if there vote count is 0", function () {
    return instance.getWinner()
      .then(r => assert.isUndefined(r))
      .catch(e => assert.isDefined(e))
  })

  it("should throw error while voting when weight is not set", function () {
    return instance.submitVote(accounts[1], { from: accounts[1] })
      .then(r => assert.isUndefined(r))
      .catch(e => assert.equal(e.reason, "You are not allowed to vote"))
  })

  it("should allow chairperson to vote with weight 2", function () {
    return instance.submitVote(accounts[1])
      .then(r => assert.isTrue(r.receipt.status))
      .catch(e => assert.isUndefined(e))
  })

  it("should allow the chairperson to call setWeight for accounts", function () {
    return instance.setWeight(accounts[1], 1)
      .then(r => assert.isTrue(r.receipt.status))
      .catch(e => assert.isUndefined(e))
  })

  it("should allow non-chairperson account to cast a vote", function () {
    return instance.submitVote(accounts[2], { from: accounts[1] })
      .then(r => assert.isTrue(r.receipt.status))
      .catch(e => assert.isUndefined(e))
  })

  it("should get the chairperson voted account as winner", function () {
    return instance.getWinner()
      .then(r => assert.equal(accounts[1], r))
      .catch(e => assert.isUndefined(e))
  })

  it("should throw error if the voted account tries to vote again", function () {
    return instance.submitVote(accounts[1])
      .then(r => assert.isUndefined(r))
      .catch(e => assert.equal(e.reason, "You are not allowed to vote"))
  })

  it("should allow to set arbitrary weight", function () {
    return instance.setWeight(accounts[2], 100)
      .then(r => {
        assert.isTrue(r.receipt.status)
        return instance.submitVote(accounts[3], { from: accounts[2] }).then(r => {
          assert.isTrue(r.receipt.status)

          return instance.getWinner()
            .then(r => assert.equal(r, accounts[3]))
        })
      })
      .catch(e => assert.isUndefined(e))
  })
});