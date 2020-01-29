var userItem=require('./UserItem.js');
var user=require('./User.js');
var itemUtil=require('./itemUtil.js');

var allItems=itemUtil.getItems();

var user1=new user('1','Akhil','Battu','akhil.battu96@gmail.com','12002 Diploma Drive','Apt H','Charlotte','NC','28262','USA');

var UserItem1=new userItem(allItems[0],'5','Yes');
var UserItem2=new userItem(allItems[5],'3','No');
var UserItem3=new userItem(allItems[2],'4','No')

function UserProfile(UserId, UserItems) {
  this.UserId = UserId;
  this.UserItems = UserItems;
};

var user1Items=[UserItem1, UserItem2, UserItem3];

var UserProfile1=new UserProfile(user1.UserId,user1Items)

var allUsers=[user1];
var allUserItems= [UserItem1,UserItem2];
var allUserProfiles= [UserProfile1];


var userList=[];

var userList=function(allUserProfiles){
  for (i=0;i<allUserProfiles.length;i++){
    userList.push(allUserProfiles[i].UserId);
  }
  return userList;
}

function getUsers(allUsers){
  return allUsers;
}

var getUserProfile=function(UserId){
  for(i=0;i<allUserProfiles.length;i++){
    if(allUserProfiles[i].UserId===UserId){
return allUserProfiles[i];
    }
    else{
      return "Not Valid"
    }
  }
}

module.exports.allUsers=allUsers;
module.exports.allUserItems=allUserItems;
module.exports.allUserProfiles=allUserProfiles;
module.exports.getUsers=getUsers;
module.exports.UserProfile=UserProfile;
module.exports.getUserProfile=getUserProfile;
