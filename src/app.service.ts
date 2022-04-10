import { Injectable, OnModuleInit } from '@nestjs/common';
const path = require('path');
const MTProto = require('@mtproto/core');

var mtproto 
 @Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log(`Initialization...`);
    this.initTelegram()
    //this.auth()
    //this.createChannel()
    this.addUserToChannel()
   }

  initTelegram() {
    const api_id = process.env.api_id;
    const api_hash = process.env.api_hash;
    mtproto = new MTProto({
      api_id,
      api_hash,
      storageOptions: {
        path: path.resolve(__dirname, './data/1.json'),
      },
    });
  }

   auth(){
    const api_id = process.env.api_id;
    const api_hash = process.env.api_hash;
    const phone = process.env.phone;
    mtproto.setDefaultDc(4)
    mtproto.call('auth.sendCode',{
      phone_number:'+963936265967',
      api_id:api_id,
      api_hash:api_hash,
      settings: {_: 'codeSettings'}
    }).then((result) => {
      console.log(result);
      mtproto.call('auth.signIn',{
        phone_number:'+963936265967',
        phone_code_hash:result.phone_code_hash,
        phone_code:28171,
        settings: {_: 'codeSettings'}
      }).then(results=>{
        console.log(results)
      })
    },(err)=>{
      console.log(err)
    });
  }

  createChannel() {
    mtproto.call('channels.createChannel',{
      megagroup:true,
      title:'test',
      about:'testAlso'
    }).then(result => {
      console.log('country:', result);
    },(err)=>{
      console.log(err)
    });
  }

  getAdminChannel(){
    mtproto.call('channels.getGroupsForDiscussion').then(result => {
      console.log( result);
    },(err)=>{
      console.log(err)
    });
  }
  addUserToChannel(){
    mtproto.call('channels.inviteToChannel',{
     }).then(result => {
      console.log('country:', result);
    },(err)=>{
      console.log(err)
    });
  }
}
