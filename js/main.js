var app = {

    /*  Part 8 - Highlighting Tapped or Clicked UI Elements - Define a registerEvents() function 
        inside the app object. Add a the tappable_active class to the selected (tapped or clicked) list item:
    */
    registerEvents: function() {
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
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
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
            //Part 8 - Invoke the registerEvents() function
            this.registerEvents();
            this.store = new MemoryStore(function() {
            //self.showAlert('Store Initialized - This is a GinosAlert', 'Info');
            
            //in step 6 - Remove the renderHomeView() function from the app object.
            //self.renderHomeView();
            //in step 6 -  display the Home View using the HomeView class:
            $('body').html(new HomeView(self.store).render().el);      
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