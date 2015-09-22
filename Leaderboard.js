
PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
    console.log('Hello client!');

    Template.leaderboard.helpers({
        'player': function(){
            return PlayersList.find();
        },
        'coach': function(){
            return 'Coach: Salvador Guillermo Allende';
        },
        'selectedClass': function(){
            if(Session.get('selectedPlayer') == this._id)
            return 'selected';
        }
    });

    Template.leaderboard.events({
        'click': function(){
            console.log('You clicked something');
        },
        'click .player': function(){
            Session.set('selectedPlayer',this._id);
            console.log(this.name + ':' + this.score);
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