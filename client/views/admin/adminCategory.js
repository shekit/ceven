Template.categoryList.helpers({
	'categories' : function(){
		return Categories.find({}, {sort: {name: 1}});
	}
});

Template.categoryDetail.helpers({
	'category' : function() {
		var categoryId = this._id;
		return Categories.findOne(categoryId);
	}
});


Template.categoryDetail.events({
	'click #activateCategory': function(event) {
		event.preventDefault();

		var categoryId = this._id;

		Categories.update(this._id, {$set: {isDraft:false}});
	},

	'click #deactivateCategory' : function(event) {
		event.preventDefault();

		var categoryId = this._id;

		Categories.update(this._id, {$set: {isDraft:true}});
	},

	'click #deleteCategory' : function(event) {

		var categoryId = this._id;

		Categories.remove(categoryId);
	}
});

Template.categoryAdd.events({
	'submit form': function(event, template) {

		event.preventDefault();

		var categoryName = event.target.categoryName.value;

		Categories.insert({
			name: categoryName,
			datePublished: new Date(),
			isDraft: false 
		});

		Router.go('categoryList');
	}

})