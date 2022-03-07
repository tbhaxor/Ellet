# Ellet [![Unit Testing](https://github.com/tbhaxor/Ellet/actions/workflows/ci.yml/badge.svg)](https://github.com/tbhaxor/Ellet/actions/workflows/ci.yml) ![GitHub repo size](https://img.shields.io/github/repo-size/tbhaxor/Ellet) ![GitHub](https://img.shields.io/github/license/tbhaxor/Ellet)

> Vote in the web3 with 100% confidence

Ellet is a hobby project developed while learning smart contract development and usage in the web3 world. This is inspired from the ballot example from the https://remix.ethereum.org.

There is nothing special but it would serve as a good gist for the new commers to write a smart contract using truffle suite, compile and integrate in a frontend application.

## Features

1. Deploy the contract as the owner (aka chairperson)
2. Add proposols (voters) with maximum limit. By default it's 3

## Privileges

Like in web2, this is also a role-based application with two major roles: Voter and Chairperson

### Privileges to Voters

1. Can read the winner details
2. Can cast the vote if they have been allowed by the chairperson

### Privileges to Chairperson

_All of them from the voters, including the following_

1. Register the address to the proposals array [here](https://github.com/tbhaxor/Ellet/blob/main/contracts/Ballot.sol#L20)
2. Adjust the weight of the other voters to allow them to submit the vote.

**Note:** On deploying the contract, the chairperson will get 2 weightage of the vote. Check [here](https://github.com/tbhaxor/Ellet/blob/main/contracts/Ballot.sol#L26)

## Testing

1. Install truffle suite (`yarn global add truffle@latest`)
2. Clone the repository (`git clone https://github.com/tbhaxor/Ellet.git`)
3. Install the packages (`yarn install`)
4. Compile the contracts (`yarn build:sol`)
5. Start the dev server (`yarn serve`)
6. In the separate terminal, run `truffle develop`
7. Serve the development server of vuejs (`yarn serve`)

## How to &darr;

### Setup default proposal limit

You can either do this by setting `MAX_PROPOSALS` environment variable before deploying the contract or update the default value in the fallback [here](https://github.com/tbhaxor/Ellet/blob/main/migrations/2_ballot_migration.js#L4)