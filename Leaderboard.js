
PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
    console.log('Hello client!');

    Template.leaderboard.helpers({
        'player': function(){
            return PlayersList.find({}, {sort: {score:-1, name:1}});
        },
        'coach': function(){
            return 'Coach: Salvador Guillermo Allende';
        },
        'selectedClass': function(){
            if(Session.get('selectedPlayerId') == this._id)
            return 'selected';
        },
        'selectedPlayer': function(){
            var selectedPlayerId = Session.get('selectedPlayerId');
            return PlayersList.findOne({_id: selectedPlayerId});
        }
    });

    Template.leaderboard.events({
        'click': function(){
            console.log('You clicked something');
        },
        'click .player': function(){
            Session.set('selectedPlayerId',this._id);
            console.log(this.name + ':' + this.score);
        },
        'click .increment': function(){
            var selectedPlayerId = Session.get('selectedPlayerId');
            PlayersList.update(selectedPlayerId, {$inc: {score: 5}});
        },
        'click .decrement': function(){
            var selectedPlayerId = Session.get('selectedPlayerId');
            PlayersList.update(selectedPlayerId, {$inc: {score: -5}});
        },
        'click .remove': function(){
            PlayersList.remove(Session.get('selectedPlayerId'));
        }
    });

    Template.addPlayerForm.events({
        'submit form': function(event){
            event.preventDefault();
            var playerName = event.target.playerName.value;
            PlayersList.insert({
                name: playerName,
                score: parseInt(event.target.score.value)
            });
        }
    });

    // new method for writing helpers. Template.[templateName].helpers({...})
    Template.audience.helpers({
        'audienceNames':function(){
            return 'Jim, Jack, Joe';
        }
    });
}

if(Meteor.isServer){
    console.log('Hello server!');
}