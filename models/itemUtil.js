var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/MusicCenter')
//var Item=require('../models/item.js')
//var itemData=require("../models/itemDB.js")
//var Item=require("../models/item.js")
//mongoose.Promise=Promise;

var Schema=mongoose.Schema;

var ItemSchema=new Schema({
  itemCode:String,
  itemName:String,
  catalogCategory:String,
  description:String,
  rating:String,
  getImageURL:String
});

var Item=mongoose.model('item',ItemSchema);

var getItems=function(){
var data=Item.find();
console.log(typeof(data),'is data type')
return data;
}

var getItem=function(code){
var item=Item.find({itemCode:code});

return item;
};

var getSpecificCategoryItems=function(category){
var specificCategoryItems=Item.find({catalogCategory:category});
return specificCategoryItems;
}

var itemcodes=function(){
  allitems=Item.find({}).then(function(docs){
    console.log(docs);
  });
  console.log(allitems,'is all items data')
  var itemcodeobj=[];
  for(var i=0;i<allitems.length;i++){
    itemcodeobj.push(allitems[i].itemCode);
  }
  return itemcodeobj;
}

var getItemByName=function(name){
  var itemByName=Item.find({itemName:name});
  return itemByName;
}

var updateItem=function(itemCode){
  var items=update({userId:userId, itemCode:itemCode},{$set:{madeIt:madeIt}}).exec().then(function(docs){
    console.log('updating items')
  })
}
//itemcodes(allItems);
//console.log(getItems,'is data after function call')

module.exports.getItems=getItems;
module.exports.getItem=getItem;
module.exports.getSpecificCategoryItems=getSpecificCategoryItems;
module.exports.itemcodes=itemcodes;
module.exports.getItemByName=getItemByName;
