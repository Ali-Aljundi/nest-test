import { Injectable, OnModuleInit } from '@nestjs/common';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input"; // npm i input
import { Api } from "telegram/tl";

let client
const stringSession = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUAkj5sQ6r+Z0k9HREkT7d6cwKHSqYy2lzqoXbFd5neUZMH4IRzM+cbuybKR11t9R7qf/EMaQ0SRd8W9tC+9iWakEzQhQb3rHRfgQBlkpLlZarIy+UiJSjz4urEJTKL2k2o2+DeJBy1+fXUAmGfbnPAqLPLDwOEWOJQTyDTuFbchHYJkdcMp3iqjCaEmNoDxyOlDAS7kTTtdN5oB5knyeIOVA6Ydz5aPyA0wpu+6elNfUmzeuiGlM4irp1Zxoj+LCvXWKMXUILYiuqvhFILpyjEbEHpBGE6VafvqsWxFf7fk2gOnySMGvYx8KTT7cG8K4wV5+csTguqhvNuw4U+l6r4o="); // fill this later with the value from session.save()
@Injectable()
export class TelegramService implements OnModuleInit {
    onModuleInit() {
       /// console.log(`Initialization...`);
        //this.initTelegram()
     }

     initTelegram(){
        const api_id = process.env.api_id as unknown as number;
        const api_hash = process.env.api_hash;
        (async () => {
            console.log("Loading interactive example...");
         client = new TelegramClient(stringSession, 10483081, api_hash, {
              connectionRetries: 5,
            });
            await client.connect();
            this.sendMessage()
            // await client.start({
            //   phoneNumber:  process.env.phone,
            //   phoneCode: async () =>
            //     await input.text("Please enter the code you received: "),
            //   onError: (err) => console.log(err),
            // });
            // console.log("You should now be connected.");
            // console.log(client.session.save()); // Save this string to avoid logging in again
            // await client.sendMessage("me", { message: "Hello!" });
          })();
     }

     async getUserName(){
        const result: Api.Updates = await client.invoke(
            new Api.channels.CreateChannel({
              title: "My very normal title",
              about: "some string here",
              megagroup: true,
              forImport: true,
              geoPoint: new Api.InputGeoPoint({
                lat: 8.24,
                long: 8.24,
                accuracyRadius: 43,
              }),
              address: "some string here",
            })
          );
          console.log(result); // prints the result
     }

     async sendMessage(){
        const result = await client.invoke(
            new Api.messages.SendMessage({
              peer: "yazan",
              message: "Hello there!"
             })
          );
          console.log(result); // prints the result
     }
}


// initTelegram() {
//   const api_id = process.env.api_id;
//   const api_hash = process.env.api_hash;
//   mtproto = new MTProto({
//     api_id,
//     api_hash,
//     storageOptions: {
//       path: path.resolve(__dirname, './data/1.json'),
//     },
//   });
// }

//  auth(){
//   const api_id = process.env.api_id;
//   const api_hash = process.env.api_hash;
//   const phone = process.env.phone;
//   mtproto.setDefaultDc(4)
//   mtproto.call('auth.sendCode',{
//     phone_number:'+963936265967',
//     api_id:api_id,
//     api_hash:api_hash,
//     settings: {_: 'codeSettings'}
//   }).then((result) => {
//     console.log(result);
//     mtproto.call('auth.signIn',{
//       phone_number:'+963936265967',
//       phone_code_hash:result.phone_code_hash,
//       phone_code:28171,
//       settings: {_: 'codeSettings'}
//     }).then(results=>{
//       console.log(results)
//     })
//   },(err)=>{
//     console.log(err)
//   });
// }

// createChannel() {
//   mtproto.call('channels.createChannel',{
//     megagroup:true,
//     title:'test',
//     about:'testAlso'
//   }).then(result => {
//     console.log('country:', result);
//   },(err)=>{
//     console.log(err)
//   });
// }

// getAdminChannel(){
//   mtproto.call('channels.getGroupsForDiscussion').then(result => {
//     console.log( result);
//   },(err)=>{
//     console.log(err)
//   });
// }
// addUserToChannel(){
//   mtproto.call('channels.inviteToChannel',{
//    }).then(result => {
//     console.log('country:', result);
//   },(err)=>{
//     console.log(err)
//   });
// }