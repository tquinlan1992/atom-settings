"use strict";
const _ = require("lodash");

class BettingRound {
    constructor(players, smallBlind, bigBlind, numberOfRaises, dealerId, preflop) {
        this.players = players;
        this.preflop = preflop;
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
        this.numberOfRaises = numberOfRaises;
        this.dealerId = dealerId;
        let foundDealer = _.find(this.players, player => {
            return player.toJSON().id === this.dealerId;
        });
        if (foundDealer) {
            this.roundCreated = true;
        } else {
            this.roundCreated = false;
        }
        this.decideWhoToStartBetting();
    }

    decideWhoToStartBetting() {
        if(this.preflop) {
            this.decideWhoToBetPreflop();
        } else {
            this.idToBet = this.dealerId;
        }
    }

    decideWhoToBetPreflop() {
        if(!this.smallBlind && !this.bigBlind) {
            this.idToBet = this.dealerId;
        } else {
            if (this.players.length > 2) {
                let foundDealerIndex = _.findIndex(this.players, player => {
                    return player.toJSON().id === this.dealerId;
                });
                let potentialIdToBet = foundDealerIndex + 3;
                const wrapAround = this.players.length - 1 - potentialIdToBet;
                const idToBet = wrapAround < 0 ? -wrapAround - 1 : potentialIdToBet;
                this.idToBet = this.players[idToBet].toJSON().id;
            }
        }
    }

    toJSON() {
        let json = _.omit(this, ["players"]);
        json.players = _.map(this.players, player => {
            return player.toJSON();
        });
        return json;
    }
}

module.exports = BettingRound;
