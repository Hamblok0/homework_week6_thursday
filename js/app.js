

// Model and Collections
var toDoItem = Backbone.Model.extend({
  urlRoot: 'https://tiny-starburst.herokuapp.com/collections/todobroj',
  idAttribute: "_id"
});

var toDoItems = Backbone.Collection.extend({
  url: 'https://tiny-starburst.herokuapp.com/collections/todobroj',
  model: toDoItem
});

// Views
var InputView = Backbone.View.extend({
  template: _.template($('#toDoInput').html()),
  events: {
    'keypress .postInput' : 'handlePost',
    'click .clearButtonAll' : 'clearPosts',
  },
  handlePost: function(event) {
    var postToDo = $('.postInput').val();
    if (event.keyCode === 13) {
      if (postToDo.trim() === '') {
        alert('Input field is empty')
      } else {
        $('.postInput').val('');
        this.collection.create({
          post: postToDo,
          urgent: false,
          done: false
      });
    }
  }
},


  clearPosts: function(event) {
    this.collection.forEach(function(){

    });
  },

  render: function(){

    this.$el.html(this.template());
    return this
  }
});

var ListView = Backbone.View.extend({
  template: _.template($('#toDoItem').html()),
  events: {
    'click .clearItemBtn' : 'deleteThisPost',
    'click .doneBtn' : 'itemDone'
  },

  deleteThisPost: function() {
   
  },

  render: function(){
    var dunkelPost = this.collection.toJSON();
    this.$el.html(this.template({
      dunkelPost: dunkelPost
    }))
    return this;
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
  },


});

// Router

var toDoRouter = Backbone.Router.extend({
  routes: {
    '' : 'home'
  },

  home: function(){
    var collection = new toDoItems();
    var view = new InputView({collection: collection})
    $('main').html(view.render().$el);

    var model = new toDoItem();
    model.fetch({success:(function(collection, data, options){
      var view2 = new ListView({
        collection: collection
      });
      $('.postOutput').html(view2.render().$el);
  })

})
}

});

var router = new toDoRouter();
Backbone.history.start();
