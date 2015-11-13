var url = 'https://tiny-starburst.herokuapp.com/collections/todobroj';

// Model and Collections
var toDoItem = Backbone.Model.extend({
  url: url
});

var toDoItems = Backbone.Collection.extend({
  url: url,
  model: toDoItem
});

// Views
var InputView = Backbone.View.extend({
  template: _.template($('#toDoInput').html()),
  events: {
    'keypress .postInput' : 'handlePost',
    'click .clearButtonAll' : 'clearPosts'
  },
  handlePost: function(event) {
    if (event.keycode === 13) {
      var postToDo = $('.postInput').val();
      $('.postInput').val('');
      var createToDo = new toDoItems();
      createToDo.create({
        post: postToDo,
        urgent: false
      });
    }
  },

  clearPosts: function(event) {
    this.collection.destroy();
  },

  render: function(){
    this.$el.html(this.template({
      toDoItems: this.collection.toJSON()
    }));
    return this
  }
});

var itemView = Backbone.View.extend({

});

// Router

var toDoRouter = Backbone.Router.extend({
  routes: {
    '' : 'home'
  },

  home: function(){
    var view = new InputView();
    $('main').html(view.render().$el);

  }
});

var router = new toDoRouter();
Backbone.history.start();
