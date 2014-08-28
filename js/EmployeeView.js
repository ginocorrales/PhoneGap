/*  Part 9 - View Routing - Step 2 - Create the EmployeeView class 
	- Define an EmployeeView class
	- Add the template as a static member of EmployeeView
	- Define an initialize() function inside the HomeView class. 
	  Define a div wrapper for the view. The div wrapper is used to 
	  attach the view related events. Invoke the initialize() function inside the HomeView constructor function.
*/
var EmployeeView = function(employee) {
 
    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('click', '.add-location-btn', this.addLocation);
    };
 
    // Define a render() function 
    this.render = function() {
	    this.el.html(EmployeeView.template(employee));
	    return this;
	};

    
    //Part 10 - Define the addLocation event handler as follows
    this.addLocation = function(event) {
    	event.preventDefault();
	    console.log('addLocation');
	    navigator.geolocation.getCurrentPosition(
	        function(position) {
	            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
	        },
	        function() {
	            alert('Error getting location');
	        });
	    return false;
	};

	this.initialize(); 
}
 
EmployeeView.template = Handlebars.compile($("#employee-tpl").html());