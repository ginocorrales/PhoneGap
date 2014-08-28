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
    };
 
    // Define a render() function 
    this.render = function() {
	    this.el.html(EmployeeView.template(employee));
	    return this;
	};
    this.initialize();
 }
 
EmployeeView.template = Handlebars.compile($("#employee-tpl").html());