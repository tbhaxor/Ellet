// SPDX-License-Identifier: MIT

pragma solidity >0.8.5;

contract Ballot {
    uint256 numProposals;
    address public chairperson;

    struct Voter {
        uint8 weight;
        bool isVoted;
    }

    struct Proposal {
        address addr;
        uint256 count;
    }

    mapping(address => Voter) voters;
    Proposal[] proposals;

    constructor(uint256 _numProposals) {
        numProposals = _numProposals;
        chairperson = msg.sender;

        setWeight(chairperson, 2); // allow chair person to vote with weight 2
    }

    /** Modifier to check if the chairperson is making call to the function */
    modifier isChairperson() {
        require(
            chairperson == msg.sender,
            "Only chairperson is allowed to perform this action"
        );
        _;
    }

    /** Permission modifier to check whether user has voted and they weight is > 0 */
    modifier hasVotePermission() {
        require(
            !voters[msg.sender].isVoted && voters[msg.sender].weight > 0,
            "You are not allowed to vote"
        );
        _;
    }

    /**
     * Register candidate to recieve votes
     *
     * Constraints:
     *  1. Disallow duplicate proposals
     *  2. Check if maxProposal cap hit
     */
    function register(address addr) public isChairperson {
        require(getProposalId(addr) == -1, "Duplicate proposal");
        require(addr != chairperson, "Chairperson not allowed to stand");

        proposals.push(Proposal(addr, 0));

        assert(proposals.length <= numProposals); // To check whether cap limit hit
    }

    /**
     * Allow chairperson to change the weight of the voter unless they have voted;
     */
    function setWeight(address addr, uint8 weight) public isChairperson {
        require(!voters[addr].isVoted, "Person has already submitted vote");

        voters[addr].weight = weight;
    }

    /**
     * Submit the vote on behalf of current user if they have right to vote and proposal address is correct
     */
    function submitVote(address addr) public hasVotePermission {
        int256 id = getProposalId(addr);
        require(id != -1, "Proposal does not exists");

        proposals[uint256(id)].count += voters[msg.sender].weight;
        voters[msg.sender].isVoted = true;
    }

    /**
     * Get the proposal index by address. If it doesn't exists, the function will return -1
     */
    function getProposalId(address addr) private view returns (int256) {
        for (uint256 i = 0; i < proposals.length; i++) {
            if (proposals[i].addr == addr) return int256(i);
        }
        return -1;
    }

    /**
     * Get the address of the winner
     */
    function getWinner() public view returns (address winner) {
        require(proposals.length > 0, "No proposals are submitted");

        uint256 max = 0;

        for (uint256 i = 0; i < proposals.length; i++) {
            if (proposals[i].count > max) {
                max = proposals[i].count;
                winner = proposals[i].addr;
            }
        }

        assert(max > 0);
    }
}
