var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData('title', 'ทดสอบ');
message.addData('message', 'ยินดีต้อนรับ');
message.addData('content-available', true);

var regTokens = ['fzGJi7wXhA4:APA91bEUeLCsGNb8wVhz_IiAVZuM2bcEmwwNQYqEf1eUbLm0DwXz2UBOg6D_-3n6VTKDgGjuYRBJUTWWypCX9ivMV2sN24PnP2a5y0HrGqlKlZB-Hv9OeYXezRt82kKeel4l9EAL8eDs'];

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyCKChSCsBci6BRju2bB9SvFiSa2Mo4w1vM');

// Now the sender can be used to send messages
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else    console.log(response);
});