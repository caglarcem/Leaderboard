Meteor.publish('players', function(){
    return PlayersList.find({'createdBy': this.userId});
});

Meteor.methods({
    'insertPlayer': function(playerName, scoreValue){
        PlayersList.insert({
            name: playerName,
            score: scoreValue,
            createdBy: Meteor.userId()
        });
    },
    'removePlayer': function(playerId){
        PlayersList.remove({ _id: playerId, createdBy: Meteor.userId() });
    },
    'updateScore': function(playerId, scoreValue){
        PlayersList.update({_id: playerId, createdBy: Meteor.userId()}, {$inc: {score: scoreValue}});
    }
});