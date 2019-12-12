var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BORkN9NwHa0KIav-MgQFnfNKWRdvL-_bsSFzZ3NwW2CW82dckvVV7hJhLzAsOW6i5viAN4kK1_PlJWioTMqJ-40",
   "privateKey": "DaMfFWoJIbCHbX6n0eWkNIF7x9AWq3v8I6LW6fhYXgk"
};


webPush.setVapidDetails(
  'mailto:nodyriskypratomo@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dETRxIbMBwM:APA91bF017fyaOBPoQWRKVAA4_tKGglZnovz___GzPXlJTSqTE_UzkI1q9O79H1J-ak4fXtZTVCueFDe4kHkIgSdv-eh9PprnySx0EHOANWxVTK6MTVunYVXQG2jIVV7BDOwvxe6aa3v",
   "keys": {
       "p256dh": "BJLy24EHdo255iqenWVsGY+Ydh5/dQkAOzcBILf7mW7eYAXeYRnhJsP5m0f0LNaj//gT9EmVpNRPgtTTks8k2qo=",
       "auth": "iCnaMytSBSGLxH8o6l4fHA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '146708375094',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).catch(function(error) {
  console.log(error);
});
