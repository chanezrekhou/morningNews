var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
   
        useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://admin:12345@cluster0.s9tts.mongodb.net/morningnews?retryWrites=true&w=majority',
    options,    
    function(err) {
     console.log(err);
    }
   );
   