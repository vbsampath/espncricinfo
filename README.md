# espncricinfo

A TypeScript library for Node.js to interact with ESPN Cricinfo

[![NPM](https://nodei.co/npm/espncricinfo.png?downloads=true&downloadRank=true)](https://nodei.co/npm/espncricinfo/) [![NPM](https://nodei.co/npm-dl/espncricinfo.png?months=6&height=1)](https://nodei.co/npm/espncricinfo/)

Inspired from Github Repository [python-espncricinfo](https://github.com/outside-edge/python-espncricinfo.git) but deviated along the way as some API's are invalid at this point of time.

ESPN Cricinfo Info

ESPN Cricinfo is protecting thier data from bots/scraping and publicly available API urls are getting outdated/invalid

API's used

* <http://www.cricinfo.com/ci/engine/>
* <http://core.espnuk.org/v2/sports/cricket/>
* <https://site.api.espn.com/apis/site/v2/sports/cricket>
* <http://new.core.espnuk.org/v2/sports/cricket>

I cannot guarantee that above API's will work in future, with the limited access to their data I made a library to get relevant data

Helpful Resources for API's

* <https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b>
* <https://github.com/pseudo-r/Public-ESPN-API>
* <https://gist.github.com/nntrn/ee26cb2a0716de0947a0a4e9a157bc1c>

## Installation

```shell
npm install
```

## Usage

Initializing ESPN Cricinfo Instance

```javascript
import { EspnCricinfoClient } from "espncricinfo"

const espnCricinfoClient = new EspnCricinfoClient({})
```

### Cricket Summary

```javascript
// Cricket Summary
const summary = await espnCricinfoClient.summary.getSummary()
console.log(`summary ${JSON.stringify(summary)}`)

// Peek at Matches 
const matchIds = await espnCricinfoClient.summary.getMatchIds()
console.log(`matchIds \n${JSON.stringify(matchIds)}`)
```

Summary class properties can be accessed as `espnCricinfoClient.summary.summary`

### Match

```javascript
// Match Information
const match = await espnCricinfoClient.match.getMatch(1495281)
console.log(`espnCricinfoClient.match ${JSON.stringify(espnCricinfoClient.match)}`)

// Over Details
// let match
let overDetailsParams = {
    matchId: (match)?.matchId || 1495281,
    seriesId: (match)?.seriesId || 8043,
    dataType: "comments", // options - details, comments; default - details
    overNumber: 5 // specify the over number in number format
}
const details = await espnCricinfoClient.match.getOverDetails(overDetailsParams)
console.log(`details ${JSON.stringify(details)}`)
```

Match class properties can be accessed as

`espnCricinfoClient.match.season`

For all Classes check their properties in the constructor and we can access as above

## Examples

For complete client implementation please follow [espncricinfo-client](https://github.com/vbsampath/espncricinfo-client)

## Samples

For data samples for various methods please follow [Samples](https://github.com/vbsampath/espncricinfo/blob/main/samples/)

## Tests

To run all tests at once

```shell
npm run test
```

To run individual sections of tests

```shell
npm run test:series
npm run test:summary
npm run test:player
npm run test:match
```

To get test coverage

```shell
npm run test:coverage
```

Open coverage/index.html in browser

## License

Licensed under [MIT](./LICENSE.md)
