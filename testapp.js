Users = new Meteor.Collection('Users');
Choices = new Meteor.Collection('Choices');
if (Meteor.isClient) {

  // Users.insert({
  //   name: 'player1',
  //   url: '/rps_images/catwoman.jpg',
  //   rock_url: '/rps_images/catrock.JPG',
  //   paper_url: '/rps_images/catpaper.jpg',
  //   scissors_url: '/rps_images/catscissors.jpg',
  //   win: 0,
  //   loss: 0,
  //   tie: 0
  // });

  // Users.insert({
  //   name: 'player2',
  //   url: '/rps_images/Jedi_Girl_by_NitroComic.jpg',
  //   rock_url: '/rps_images/dogrock.jpg',
  //   paper_url: '/rps_images/dogpaper.jpg',
  //   scissors_url: '/rps_images/dogscissors.jpg',
  //   win: 0,
  //   loss: 0,
  //   tie: 0
  // });

  Template.messages.messages = function(){
    return Messages.find({}, { sort: { time: -1 }});
  }

  Template.entryfield.events = {
  "keydown #message": function(event){
    if(event.which == 13){
      // Submit the form
      var name = document.getElementById('name');
      var message = document.getElementById('message');
 
      if(name.value != '' && message.value != ''){
        Messages.insert({
          name: name.value,
          message: message.value,
          time: Date.now()
        });
 
        name.value = '';
        message.value = '';
      }
    }
  }
  }
 
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('play1count', 0);
  Session.setDefault('play2count', 0);
  Session.setDefault('player1', '/rps_images/catwoman.jpg');
  Session.setDefault('player2', '/rps_images/Jedi_Girl_by_NitroComic.jpg');
  var avatar_array = ["/rps_images/catjedi1.jpg","/rps_images/cat-warrior.jpg","/rps_images/cat-wizard.jpg","/rps_images/cat-healer.jpg","/rps_images/dog-jedi.jpg","/rps_images/dogwarrior.jpg","/rps_images/dog-wizard.jpg","/rps_images/dog-healer.jpeg","/rps_images/pickthisone.jpg","/rps_images/malewarrior.jpg","/rps_images/male-wizard.jpg","/rps_images/male-healer.jpg","/rps_images/femalejedi.jpg","/rps_images/femalewarrior.jpg","/rps_images/female-wizard.jpg","/rps_images/femalehealer.jpg","/rps_images/pattern1.jpg","/rps_images/pattern2.jpg","/rps_images/pattern3.jpg","/rps_images/pattern4.jpg"];
  var rock_array = ["/rps_images/malerock.jpg","/rps_images/femalerock.jpg","/rps_images/catrock.JPG","/rps_images/dogrock.jpg","/rps_images/objectrock1.jpg","/rps_images/objectrock2.jpg"];
  var paper_array = ["/rps_images/malepaper.jpg","/rps_images/femalepaper.jpg","/rps_images/catpaper.jpg","/rps_images/dogpaper.jpg","/rps_images/objectpaper1.jpg","/rps_images/objectpaper2.jpg"];
  var scissors_array = ["/rps_images/malescissors.jpg","/rps_images/femalescissors.jpg","/rps_images/catscissors.jpg","/rps_images/dogscissors.jpg","/rps_images/objectscissors1.jpg","/rps_images/objectscissors2.jpg"];
  Session.setDefault('rock1', '/rps_images/catrock.JPG');
  Session.setDefault('rock2', '/rps_images/dogrock.jpg');
  Session.setDefault('paper1', '/rps_images/catpaper.jpg');
  Session.setDefault('paper2', '/rps_images/dogpaper.jpg');
  Session.setDefault('scissors1', '/rps_images/catscissors.jpg');
  Session.setDefault('scissors2', '/rps_images/dogscissors.jpg');

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    test: function () {
      var test = "test";
      return test;
    }
  });

  Template.game.helpers({
    users: function() {
      return Users.find({active: true});
    }
    // choices: function() {
    //   return Choices.find({});
    // }
  });

  Template.game.events({
    "click #player1rock": function (event) {
      $("#player1rock").css("pointer-events", "none");
      console.log("Player one chose rock");
      var id = $("#player1scissors").attr('alt');
      Users.update({_id: id}, {$set: {rock_class: 'rps_red', scissors_class: 'rps_hidden', paper_class: 'rps_hidden', choice: 'rock'} });
      setTimeout(function(){ 
        var choice2 = $("#player2").attr('alt');
        if (choice2 === "paper") {
          var player1loss = parseInt($("#player1loss").val());
          var loss = player1loss += 1;
          console.log("Player two chose paper - you lose");
          Users.update({_id: id}, {$set: {wlt: 'lose', loss: loss} });
        } else if (choice2 === "rock") {
          var player1tie = parseInt($("#player1tie").val());
          var tie = player1tie += 1;
          console.log("Player two chose rock - you tie");
          Users.update({_id: id}, {$set: {wlt: 'tie', tie: tie} });
        } else {
          var player1win = parseInt($("#player1win").val());
          var win = player1win += 1;
          console.log("Player two chose scissors or nothing - you win");
          Users.update({_id: id}, {$set: {wlt: 'win', win: win} });
        }
      }, 5000);
      // document.getElementById('player1rock').style.border = '4px solid red';
      // document.getElementById('player1rock').style.padding = '0px';
      // document.getElementById('player1paper').style.display = 'none';
      // document.getElementById('player1scissors').style.display = 'none';
      // Choices.insert({
      //   name: 'player1',
      //   choice: 'rock',
      //   time: Date.now()
      // });
    },
    "click #player1paper": function (event) {
      $("#player1paper").css("pointer-events", "none");
      console.log("Player one chose paper");
      var id = $("#player1scissors").attr('alt');
      Users.update({_id: id}, {$set: {rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper'} });
      setTimeout(function(){ 
        var choice2 = $("#player2").attr('alt');
        if (choice2 === "scissors") {
          var player1loss = parseInt($("#player1loss").val());
          var loss = player1loss += 1;
          console.log("Player two chose scissors - you lose");
          Users.update({_id: id}, {$set: {wlt: 'lose', loss: loss} });
        } else if (choice2 === "paper") {
          var player1tie = parseInt($("#player1tie").val());
          var tie = player1tie += 1;
          console.log("Player two chose paper - you tie");
          Users.update({_id: id}, {$set: {wlt: 'tie', tie: tie} });
        } else {
          var player1win = parseInt($("#player1win").val());
          var win = player1win += 1;
          console.log("Player two chose rock or nothing - you win");
          Users.update({_id: id}, {$set: {wlt: 'win', win: win} });
        }
      }, 5000);
      // document.getElementById('player1paper').style.border = '4px solid red';
      // document.getElementById('player1paper').style.padding = '0px';
      // document.getElementById('player1rock').style.display = 'none';
      // document.getElementById('player1scissors').style.display = 'none';
      // Choices.insert({
      //   name: 'player1',
      //   choice: 'paper',
      //   time: Date.now()
      // });
    },
    "click #player1scissors": function (event) {
      $("#player1scissors").css("pointer-events", "none");
      console.log("Player one chose scissors");
      var id = $("#player1scissors").attr('alt');    
      Users.update({_id: id}, {$set: {rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_hidden', choice: 'scissors'} });
      setTimeout(function(){ 
        var choice2 = $("#player2").attr('alt');
        if (choice2 === "rock") {
          var player1loss = parseInt($("#player1loss").val());
          var loss = player1loss += 1;         
          console.log("Player two chose rock - you lose");
          Users.update({_id: id}, {$set: {wlt: 'lose', loss: loss} });
        } else if (choice2 === "scissors") {
          var player1tie = parseInt($("#player1tie").val());
          var tie = player1tie += 1;
          console.log("Player two chose scissors - you tie");
          Users.update({_id: id}, {$set: {wlt: 'tie', tie: tie} });
        } else {
          var player1win = parseInt($("#player1win").val());
          var win = player1win += 1;
          console.log("Player two chose paper or nothing - you win");
          Users.update({_id: id}, {$set: {wlt: 'win', win: win} });
        }
      }, 5000);
      // document.getElementById('player1scissors').style.border = '4px solid red';
      // document.getElementById('player1scissors').style.padding = '0px';
      // document.getElementById('player1paper').style.display = 'none';
      // document.getElementById('player1rock').style.display = 'none';
      // Choices.insert({
      //   name: 'player1',
      //   choice: 'scissors',
      //   time: Date.now()
      // });

    },
    "click #player2rock": function (event) {
      console.log("You chose rock");
      $("#player2rock").css("pointer-events", "none");
      var id = $("#player2scissors").attr('alt');    
      Users.update({_id: id}, {$set: {rock_class: 'rps_red', scissors_class: 'rps_hidden', paper_class: 'rps_hidden', choice: 'rock'} });
      setTimeout(function(){ 
        var choice1 = $("#player1").attr('alt');
        if (choice1 === "paper") {
          var player2loss = parseInt($("#player2loss").val());
          var loss = player2loss += 1;
          console.log("Opponent chose paper - you lose");
          Users.update({_id: id}, {$set: {wlt: 'lose', loss: loss} });
        } else if (choice1 === "rock") {
          var player2tie = parseInt($("#player2tie").val());
          var tie = player2tie += 1;
          console.log("Opponent chose rock - you tie");
          Users.update({_id: id}, {$set: {wlt: 'tie', tie: tie} });
        } else {
          var player2win = parseInt($("#player2win").val());
          var win = player2win += 1;
          console.log("Opponent chose scissors or nothing - you win");
          Users.update({_id: id}, {$set: {wlt: 'win', win: win} });
        }
      }, 5000);
      // document.getElementById('player2rock').style.border = '4px solid red';
      // document.getElementById('player2rock').style.padding = '0px';
      // document.getElementById('player2paper').style.display = 'none';
      // document.getElementById('player2scissors').style.display = 'none';
      // Choices.insert({
      //   name: 'player2',
      //   choice: 'rock',
      //   time: Date.now()
      // });
    },
    "click #player2paper": function (event) {
      console.log("Player two chose paper");
      $("#player2paper").css("pointer-events", "none");
      var id = $("#player2scissors").attr('alt');  
      Users.update({_id: id}, {$set: {rock_class: 'rps_hidden', scissors_class: 'rps_hidden', paper_class: 'rps_red', choice: 'paper'} });
      setTimeout(function(){ 
        var choice1 = $("#player1").attr('alt');
        if (choice1 === "scissors") {
          var player2loss = parseInt($("#player2loss").val());
          var loss = player2loss += 1;
          console.log("Player one chose scissors - you lose");
          Users.update({_id: id}, {$set: {wlt: 'lose', loss: loss} });
        } else if (choice1 === "paper") {
          var player2tie = parseInt($("#player2tie").val());
          var tie = player2tie += 1;
          console.log("Player one chose paper - you tie");
          Users.update({_id: id}, {$set: {wlt: 'tie', tie: tie} });
        } else {
          var player2win = parseInt($("#player2win").val());
          var win = player2win += 1;
          console.log("Player one chose rock or nothing - you win");
          Users.update({_id: id}, {$set: {wlt: 'win', win: win} });
        }
      }, 5000);
      // document.getElementById('player2paper').style.border = '4px solid red';
      // document.getElementById('player2paper').style.padding = '0px';
      // document.getElementById('player2rock').style.display = 'none';
      // document.getElementById('player2scissors').style.display = 'none';
      // Choices.insert({
      //   name: 'player2',
      //   choice: 'paper',
      //   time: Date.now()
      // });
    },
    "click #player2scissors": function (event) {
      console.log("Player two chose scissors");
      $("#player2scissors").css("pointer-events", "none");
      var id = $("#player2scissors").attr('alt');      
      Users.update({_id: id}, {$set: {rock_class: 'rps_hidden', scissors_class: 'rps_red', paper_class: 'rps_hidden', choice: 'scissors'} });
      setTimeout(function(){ 
        var choice1 = $("#player1").attr('alt');
        if (choice1 === "rock") {
          var player2loss = parseInt($("#player2loss").val());
          var loss = player2loss += 1;
          console.log("Player one chose rock - you lose");
          Users.update({_id: id}, {$set: {wlt: 'lose', loss: loss} });
        } else if (choice1 === "scissors") {
          var player2tie = parseInt($("#player2tie").val());
          var tie = player2tie += 1;
          console.log("Player one chose scissors - you tie");
          Users.update({_id: id}, {$set: {wlt: 'tie', tie: tie} });
        } else {
          var player2win = parseInt($("#player2win").val());
          var win = player2win += 1;
          console.log("Player one chose paper or nothing - you win");
          Users.update({_id: id}, {$set: {wlt: 'win', win: win} });
        }
      }, 5000);
      // document.getElementById('player2scissors').style.border = '4px solid red';
      // document.getElementById('player2scissors').style.padding = '0px';
      // document.getElementById('player2paper').style.display = 'none';
      // document.getElementById('player2rock').style.display = 'none';
      // Choices.insert({
      //   name: 'player2',
      //   choice: 'scissors',
      //   time: Date.now()
      // });
    },
    "click #another_game": function(event) {
      var id1 = $("#player1scissors").attr('alt');
      var id2 = $("#player2scissors").attr('alt');
      $("#player1rock").css("pointer-events", "auto");
      $("#player1paper").css("pointer-events", "auto");
      $("#player1scissors").css("pointer-events", "auto");
      $("#player2rock").css("pointer-events", "auto");
      $("#player2paper").css("pointer-events", "auto");
      $("#player2scissors").css("pointer-events", "auto");
      Users.update({_id: id1}, {$set: {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', wlt: '', choice: ''} });
      Users.update({_id: id2}, {$set: {rock_class: 'rps_show', scissors_class: 'rps_show', paper_class: 'rps_show', wlt: '', choice: ''} });
      // Meteor.call('removeAllChoices');
    }
  });

  Template.test.helpers({
    play1count: function () {
      return Session.get('play1count');
    },
    play2count: function () {
      return Session.get('play2count');
    },
    player1: function() {
      return Session.get('player1');
    },
    player2: function() {
      return Session.get('player2');
    },
    rock1: function() {
      return Session.get('rock1');
    },
    paper1: function() {
      return Session.get('paper1');
    },
    scissors1: function() {
      return Session.get('scissors1');
    },
    rock2: function() {
      return Session.get('rock2');
    },
    paper2: function() {
      return Session.get('paper2');
    },
    scissors2: function() {
      return Session.get('scissors2');
    }
  });

  // Template.body.helpers({
  //   player1: function() {
  //     return Session.get('player1');
  //   }
  //   tasks: [
  //     { player1: Session.get('player1'),
  //       player2: Session.get('player2')
  //     }
  //     ]
  // } );

  Template.test.events({
    'click #player1': function(){
      Session.set('play1count', Session.get('play1count') + 1);
    },
    'click #player2': function(){
      Session.set('play2count', Session.get('play2count') + 1);
    },
    'submit #play1_name_form': function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      var form_text = document.getElementById("play1_name");
      var index_number = form_text.value;
      console.log (index_number);
      if (index_number >= 0 && index_number<20) {
        document.getElementById('incorrect').style.display = 'none';
        var play1_url = avatar_array[index_number];
        Session.set('player1', play1_url);
      } else {
        document.getElementById('incorrect').style.display = '';
      }
    },
    'submit #play2_name_form': function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      var form_text = document.getElementById("play2_name");
      var index_number = form_text.value;
      console.log (index_number);
      if (index_number >= 0 && index_number<20) {
        document.getElementById('incorrect').style.display = 'none';
        var play2_url = avatar_array[index_number];
        Session.set('player2', play2_url);
      } else {
        document.getElementById('incorrect').style.display = '';
      }
    },
    'click #rps1_random': function(){
      var index_number = Math.floor(Math.random()*6);
      var rock1_url = rock_array[index_number];
      var paper1_url = paper_array[index_number];
      var scissors1_url = scissors_array[index_number];
      Session.set('rock1', rock1_url);
      Session.set('paper1', paper1_url);
      Session.set('scissors1', scissors1_url);
    },
    'click #rps2_random': function(){
      var index_number = Math.floor(Math.random()*6);
      var rock2_url = rock_array[index_number];
      var paper2_url = paper_array[index_number];
      var scissors2_url = scissors_array[index_number];
      Session.set('rock2', rock2_url);
      Session.set('paper2', paper2_url);
      Session.set('scissors2', scissors2_url);
    }
  });

  Template.hello.events({
    'click #click_button': function () {
      // increment the counter when button is clicked

      Session.set('counter', Session.get('counter') + 1);
    },
    'click #reset_button': function () {
      Session.set('counter', 0);
      Session.set('play1count', 0);
      Session.set('play2count', 0);
    }
  });
}

if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

      removeAllChoices: function() {

        return Choices.remove({});

      }

    });

  });

}