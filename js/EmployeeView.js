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
        this.el.on('click', '.add-contact-btn', this.addToContacts);
        this.el.on('click', '.change-pic-btn', this.changePicture);
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

	//Part 11 - Using the Contacts API - add an employee to the device’s contact list.
	this.addToContacts = function(event) {
	    event.preventDefault();
	    console.log('addToContacts');
	    if (!navigator.contacts) {
	        app.showAlert("Contacts API not supported", "Error");
	        return;
	    }
	    var contact = navigator.contacts.create();
	    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
	    var phoneNumbers = [];
	    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
	    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
	    contact.phoneNumbers = phoneNumbers;
	    contact.save();
	    return false;
	};

	// Part 12 - Using the Camera API -  provide the user with the ability to take a picture of an 
	// employee, and use that picture as the employee’s picture in the application
	this.changePicture = function(event) {
	    event.preventDefault();
	    if (!navigator.camera) {
	        app.showAlert("Camera API not supported", "Error");
	        return;
	    }
	    var options =   {   quality: 50,
	                        destinationType: Camera.DestinationType.DATA_URL,
	                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
	                        encodingType: 0     // 0=JPG 1=PNG
	                    };
	 
	    navigator.camera.getPicture(
	        function(imageData) {
	            $('.employee-image', this.el).attr('src', "data:image/jpeg;base64," + imageData);
	        },
	        function() {
	            app.showAlert('Error taking picture', 'Error');
	        },
	        options);
	 
	    return false;
	};

	this.initialize(); 
}
 
EmployeeView.template = Handlebars.compile($("#employee-tpl").html());