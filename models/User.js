"use strict"

class User{
  constructor(user_id,username,email,password,profile_picture){
    this.user_id=user_id;
    this.username=username;
    this.email=email;
    this.password=password;
    this.profile_picture=profile_picture;
  }
  
  getUserId(){
    return this.user_id;
  }
  getUsername(){
    return this.username;
  }
  getEmail(){
    return this.email;
  }
  getPassword(){
    return this.password;
  }
  getProfilePicture(){
    return this.profile_picture;
  }

  setUserId(user_id){
    this.user_id=user_id;
  }
  setUsername(username){
    this.username=username;
  }
  setEmail(email){
    this.email=email;
  }
  setPassword(password){
    this.password=password;
  }
  setProfilePicture(profile_picture){
    this.profile_picture=profile_picture;
  }

}

module.exports=User;