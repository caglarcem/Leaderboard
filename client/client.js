Meteor.subscribe('players');

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
        Meteor.call('updateScore', selectedPlayerId, 5);
    },
    'click .decrement': function(){
        var selectedPlayerId = Session.get('selectedPlayerId');
        Meteor.call('updateScore', selectedPlayerId, -5);
    },
    'click .remove': function(){
        Meteor.call('removePlayer', Session.get('selectedPlayerId'));
    }
});

Template.addPlayerForm.events({
    'submit form': function(event){
        event.preventDefault();
        var playerName = event.target.playerName.value;
        var scoreValue = parseInt(event.target.score.value)
        Meteor.call('insertPlayer', playerName, scoreValue);
    }
});

// new method for writing helpers. Template.[templateName].helpers({...})
Template.audience.helpers({
    'audienceNames':function(){
        return 'Jim, Jack, Joe';
    }
});