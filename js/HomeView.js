/* Create a HomeView object that encapsulates the logic to create and render
   the Home view and add the two templates as static members of HomeView.
   Define an initialize() function inside the HomeView class. Define a div 
   wrapper for the view. The div wrapper is used to attach the view-related 
   events. Invoke the initialize() function inside the HomeView constructor 
   function.
*/

var HomeView = function(store) {
 
    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };
 
    // this was added in step 6 
    this.render = function() {
	    this.el.html(HomeView.template())
	    return this;
    };

    // Move the findByName() function from the app object to the HomeView 
    // class.this was added in step 6
    this.findByName = function() {
    	store.findByName($('.search-key').val(), function(employees) 
    	{
      	  $('.employee-list').html(HomeView.liTemplate(employees));
      	  
      	  /* Part 7 :  Instantiate an iScroll object to scroll the list of 
      	     employees returned. If the iScroll object already exists (), 
      	     simply refresh it to adapt it to the new size of the list.
      	  */ 
      	  /* //In Step 9 the following code is deleted 

      	  if (self.iscroll) {
            console.log('Refresh iScroll');
            self.iscroll.refresh();
	      } else {
	            console.log('New iScroll');
	            self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
	        }

	      */
    	});
	};
    
    /* step 6 - this step was removed to the HomeView class
    renderHomeView: function() {
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },
 	*/
 	this.initialize();

}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());
