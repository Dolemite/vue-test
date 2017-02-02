
new Vue({
   // Target the div where id="events"
   el: '#events',

   // Register any values or collections that hold data for the application
   data: {
      event: { name: '', description: '', date: ''},
      events: []
   },

   // Anything within the mounted function will run when the application loads
   mounted: function () {
      this.getEvents();
   },

   // Methods we want to use in our application are registered here
   methods: {
      getEvents: function() {
         /*var events = [
            {
               id: 1,
               name: 'AWS re:Invent',
               description: "Amazon Web Services conference in Las Vegas, NV",
               date: '2016-11-28'
            },
            {
               id: 2,
               name: 'Star Wars Rogue One Premiere',
               description: 'Yet another Star Wars movie to remember',
               date: '2016-12-20'
            }
         ];*/
         this.$http.get('http://localhost:8080/events').then((response) => {
            this.events = response.body;
         }, (response) => {
            // log the error
            console.log(response);

         });
         //this.events = events;
      },

      addEvent: function() {
         if(this.event.name) {
            this.$http.post('http://localhost:8080/events', this.event).then((response) => {
               // assumes that what happened on the server really was a success
               this.event.id = response.body.id;
               this.events.push(this.event);
               this.event = { name: '', description: '', date: ''};   
            }, (response) => {
               console.log(response);
            });            
         }
      },

      deleteEvent: function(event, index) {
         if(confirm("Are you sure you want to delete this event?")) {
            this.$http.delete('http://localhost:8080/events/'+event.id).then((response) => {
               this.events.splice(index, 1);
            }, (response) => {
               console.log(response);
            });
            
         }
      }
   }
});