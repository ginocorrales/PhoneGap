var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    /*  Part 8 - Highlighting Tapped or Clicked UI Elements - Define a registerEvents() function 
        inside the app object. Add a the tappable_active class to the selected (tapped or clicked) list item:
    */
    registerEvents: function() {
        // Part 9 - Step 3 - add an event listener to listen to URL hash tag changes
        $(window).on('hashchange', $.proxy(this.route, this));

        /* // For Part 9 - This is not here
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }
        */
            // ... if not: register mouse events instead
        $('body').on('mousedown', 'a', function(event) {
            $(event.target).addClass('tappable-active');
        });
        $('body').on('mouseup', 'a', function(event) {
            $(event.target).removeClass('tappable-active');
        });
    },
    
    /*  Part 9 - Step 3 - Define a route() function to route requests to the appropriate view:
        - If there is no hash tag in the URL: display the HomeView
        - If there is a has tag matching the pattern for an employee details URL: display an EmployeeView for the specified employee
    */
    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    },

    
    /* // Part 3
    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },
    */
    
    /*// step 5
    findByName: function() {
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },
    */
    /* //Step 4 
    renderHomeView: function() {
        var html =
                "<div class='header'><h1>Ginos Employee Search</h1></div>" +
                "<div class='search-view'>" +
                "<input class='search-key'/>" +
                "<ul class='employee-list'></ul>" +
                "</div>"
        $('body').html(html);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },
    */
    
    /*// step 5
    renderHomeView: function() {
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },
    */

    initialize: function() {
            
            var self = this;
            
            // Part 9 - Step 3 - Define a regular expression that matches employee details urls
            this.detailsURL = /^#employees\/(\d{1,})/;

            //Part 8 - Invoke the registerEvents() function
            this.registerEvents();
            this.store = new MemoryStore(function() {
            //self.showAlert('Store Initialized - This is a GinosAlert', 'Info');
            
            //in step 6 - Remove the renderHomeView() function from the app object.
            //self.renderHomeView();
            //in step 6 -  display the Home View using the HomeView class:
            //$('body').html(new HomeView(self.store).render().el);      
                self.route();
            });
        //$('.search-key').on('keyup', $.proxy(this.findByName, this));
        
        /* In step 6 - This step was removed
        // to compile the HTML template to render the Home View and the Employee list item...
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        */
    }

};

app.initialize();