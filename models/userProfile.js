var itemUtil= require('../models/itemUtil');

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/MusicCenter');

var Schema=mongoose.Schema;

var UserSchema=new Schema({
  UserId : String,
  Password : String,
  FirstName : String,
  LastName : String,
  EmailAddress : String,
  City : String,
  State : String
});

var User=mongoose.model('user',UserSchema);

var UserProfileSchema=new Schema(
  {
    userId: String,
    userItems:[]

  }
);
var UserProfile=mongoose.model('userprofile',UserProfileSchema);

var UserItemsSchema= new Schema(
  {
    userId: String,
    itemCode:String,
    itemName: String,
    catalogCategory:String,
    getImageURL:String,
    rating: String,
    madeIt: String

  }
);
var UserItems =mongoose.model('useritem',UserItemsSchema);



var getUsers = function(userId){
  console.log(userId,'is the mail passed')
  var user=User.find({EmailAddress:userId})
  return user;
}

var getUserItems=function(id){
  console.log(id,'is the id passed')
  var userData=UserItems.find({userId:id});
  userData.exec().then(function(docs){
  });

  return userData;
}

var getUserItem=function(id,itemCode){
  var data=UserItems.find({userId:id,itemCode:itemCode})
return data
}

var addItem=function(userId,itemCode){
  var item=itemUtil.getItem(itemCode);
  item=item.exec();
  item.then(function(docs){
    var newUserItem=new UserItems({
      userId: userId,
      itemCode:itemCode,
      itemName: docs[0].itemName,
      catalogCategory:docs[0].catalogCategory,
      getImageURL:docs[0].getImageURL,
      rating: "0",
      madeIt: "No"
    })
    newUserItem.save().then(function(docs){
      console.log('item is saved')
    })
  //addItemToProfile(userId,itemCode);

});
}

var removeItem=function(userId,itemCode){
  UserItems.remove({userId: userId,itemCode:itemCode}).then(function(docs){
  });

}

var updateItemRating=function(userId,itemCode,rating){

UserItems.update({userId:userId,itemCode:itemCode},{$set:{rating:rating}}).exec().then(function(docs){
});

}

var updateItemMadeIt=function(userId,itemCode,madeIt){

UserItems.update({userId:userId,itemCode:itemCode},{$set:{madeIt:madeIt}}).exec().then(function(docs){
});
}

// var getUser=function(id){
// var user=User.find({EmailAdress:id})
// return user
// }


module.exports.getUserItems=getUserItems;
module.exports.getUserItem=getUserItem;
module.exports.removeItem=removeItem;
module.exports.addItem=addItem;
module.exports.updateItemRating=updateItemRating;
module.exports.updateItemMadeIt=updateItemMadeIt;
module.exports.getUsers=getUsers;
//module.exports.getUsers1=getUsers1;
