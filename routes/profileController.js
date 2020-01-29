var express=require('express')
var app=express();
var router =express.Router();
var bodyParser= require('body-parser');
var urlencodedParser= bodyParser.urlencoded({extended:false});
var userItemProfile=require('../models/userProfile.js');
var itemUtil=require('../models/itemUtil')
var allItems=itemUtil.getItems();
var listofitems=itemUtil.itemcodes();
var utility=require('../models/itemUtil')
const { check, validationResult } = require('express-validator/check')


var theUser=function(req,res,next){
  req.session.listofitems=listofitems;
  req.session.save();
  next()

}

router.use(theUser);

router.get('/myItems',function(req,res,next){
console.log("Entered profile controller")
var action=req.query.action
console.log(action ,'is the requested action')
var Session_User=req.session.theUser;

if(Session_User==undefined){
console.log("entered no session")

var consolemsg='Please logIn before Proceeding!!!!'

res.render('signIn',{consolemsg:consolemsg,start:[]})

}
//--------------------------------------This below part executes when session is already present---------------------------------------------------
else

{
  var consolemsg='';
var userId=req.session.theUser[0].UserId;
console.log(req.session.theUser[0].UserId,'is the session data',userId)
//------------------------------------ logic for sesion is  started and clicked in delete ----------------------------------------------------------
  if(action=='delete'){
  console.log("entered delete")

  itemCode=req.query.theItem

  var stored=0;
//  var allItems=req.session.currentProfile.UserItems;
    var allItems=userItemProfile.getUserItems(userId);
    var present=0;
    allItems.exec().then(function(docs){
      for(i=0;i<docs.length;i++){
      //  console.log(docs[i].itemCode,'is the item id ',i)
        if(docs[i].itemCode==itemCode){
          present=1;
        }
      }
      if(present==1){

          userItemProfile.removeItem(userId,itemCode);

      }
      else{
          console.log('item is not present')
        consolemsg='You cannot delete the item that is not present in your items list'

      }

    })

    var allItems=userItemProfile.getUserItems(userId);

    allItems.then(function(doc){
      //console.log(doc ,'are the remaining elements')

      if(doc.length!=0){
        req.session.currentProfile=doc
    res.redirect('myitems')
    res.render('myitems',{allItems:req.session.currentProfile,firstname:userId,consolemsg:consolemsg, start:[1]});
      }
      else {
        console.log('length=0')
        req.session.currentProfile=doc
        res.redirect('myitems')
           res.render('myitems',{allItems:[],firstname:userId,consolemsg:consolemsg, start:[1]});
      }
    })

}

//------------------------------------ logic for sesion is  started and clicked on myItems ----------------------------------------------------------

else if(action==undefined){

  var allItems=userItemProfile.getUserItems(userId);
  allItems.exec().then(function(docs){
if(docs.length!=0){

    req.session.currentProfile=docs
    res.render('myitems',{allItems:req.session.currentProfile,firstname:userId,consolemsg:consolemsg, start:[1]});
}
else{
  consolemsg='Not able to find ant items for this user'
    res.render('myitems',{allItems:[],firstname:userId,consolemsg:consolemsg, start:[1]});
}
  })

}

//------------------------------------ logic for sesion is  started and clicked on saveIt----------------------------------------------------------

else if(action=='SaveIt'){
  var consolemsg=''

var itemCode=req.query.theItem
var stored=0;

  var allItems=userItemProfile.getUserItems(userId);
  allItems.exec().then(function(docs){

    for(i=0;i<docs.length;i++){
      if(docs[i].itemCode==itemCode){
        stored=1
      }
    }
    if(stored==0){
    userItemProfile.addItem(userId,itemCode);
    console.log('entered stored=0');
    }
    if(stored==1){
      consolemsg='The item is already saved to your page!!! Please find it in the below list'
    }

  });

  var totalData=userItemProfile.getUserItems(userId);
  totalData.exec().then(function(docsAfterSave){

res.redirect('myitems')
req.session.currentProfile=docsAfterSave

res.redirect('myitems')
  res.render('myitems',{allItems:req.session.currentProfile,firstname:userId,consolemsg:consolemsg, start:[1]});

  })

}
//------------------------------------ logic for sesion is  started and clicked on Update----------------------------------------------------------

else if(action=='update'){
  console.log('entered update')
var itemCode=req.query.theItem

var item=userItemProfile.getUserItem(userId,itemCode)

item.exec().then(function(docs){

  if(docs.length!=0){

  res.render('feedback',{allItems:docs,firstname:userId, start:[1]});
  }
  else
   {
    console.log('length=0')
    var allItems=utility.getItems();
    allItems=allItems.exec();
    allItems.then(function(docs){
      res.render('categories',{data:docs,firstname:userId, start:[1],consolemsg:''});
    })
  }

});
}


//------------------------------------ logic for sesion is  started and clicked on Rate it----------------------------------------------------------
else if(action=='RateIt'){
  console.log('entered RateIt')
var itemCode=req.query.theItem
var stored=0;
var allUserItems=userItemProfile.getUserItems(userId);
allUserItems.exec().then(function(docs){
for(i=0;i<docs.length;i++){
  if(docs[i].itemCode==itemCode){
    stored=1
  }
}

if(stored==1){
  var item=userItemProfile.getUserItem(userId, itemCode)
  item.exec().then(function(specificItem){
res.render('feedback',{allItems:specificItem,firstname:userId, start:[1],consolemsg:''});
})
}
else {
  var allItems=utility.getItems();
  allItems=allItems.exec();
  allItems.then(function(docs){
    res.render('categories',{data:docs,firstname:userId, start:[1],consolemsg:''});
  })

}
})


}

}
});

router.post('/action*',urlencodedParser,function(req,res,next){
  var userId=req.session.theUser[0].UserId

    var itemcodeobj=req.session.listofitems;
    var theItem=req.query.theItem;
     var action=req.query.action;

var consolemsg=''
      if(action=='feedback'){

     var itemCode=req.query.theItem


       var rating;
       var madeIt;
       if(req.body.rating!=null){
          rating=req.body.rating;


     userItemProfile.updateItemRating(userId,itemCode,rating);
      var items=userItemProfile.getUserItems(userId)
      items.exec().then(function(docs){

        if(docs.length!=0){
          res.redirect('myItems')
           res.render('myItems',{allItems:docs,firstname:userId,consolemsg:'', start:[1]});
        }
        else{
            res.send('There are no items in profile to view');
        }
      })
    }

    if(req.body.madeIt!=null){
      madeIt=req.body.madeIt;
      userItemProfile.updateItemMadeIt(userId,itemCode,madeIt);
      var items=userItemProfile.getUserItems(userId)
      items.exec().then(function(docs){

        if(docs.length!=0){
          res.redirect('myItems')
           res.render('myItems',{allItems:docs,firstname:userId,consolemsg:'', start:[1]});
        }
        else{
            res.send('There are no items in profile to view');
        }
      })

    }


     }

 });


router.get('/login', function(req,res,next){
  var consolemsg='Please logIn before Proceeding'

  res.render('signIn',{consolemsg:consolemsg,start:[]})
})

router.get('/logout',function(req,res,next){
    req.session.destroy();
    console.log('session ended');
    res.render('index',{start:[]})

})

router.post('/LogIn',urlencodedParser,[
      check('emailAddress').isEmail().not().isEmpty(),
      check('password').isLength({ min: 6 }),
],function(req,res,next){
  const errors = validationResult(req);
    if(!errors.isEmpty()){
          return res.status(422).json({errors: errors.array() });
    }
    else{
      console.log('in post method');
  var email=req.body.emailAddress
  var password=req.body.password
  var users=userItemProfile.getUsers(email)
  users.exec().then(function(docs){
    console.log(docs,'is docsgfggf')
  })
  users.exec().then(function(docs){

    if(docs.length==0){
        console.log('in post method1');
      var consolemsg='The userId does not exist, Please use a valid UserId'
      res.render('signIn',{consolemsg:consolemsg,start:[]})
    }

    else if(password==docs[0].Password){
        console.log('in post method2');
      req.session.theUser=docs
      var userId=req.session.theUser[0].UserId
      var allItems=userItemProfile.getUserItems(userId);
      allItems.exec().then(function(userItems){

    if(docs.length!=0){
  console.log('in post method3');
      req.session.currentProfile=userItems
        res.render('myitems',{allItems:userItems,firstname:userId,consolemsg:consolemsg, start:[1]});
    }
    else{
        console.log('in post method4');
      consolemsg='Not able to find ant items for this user'
        res.render('myitems',{allItems:[],firstname:userId,consolemsg:consolemsg, start:[]});
    }
      })
    }
    else{
      var consolemsg='Incorrect UserId or Password. Please try again!!!'
      res.render('signIn',{consolemsg:consolemsg,start:[]})
    }
  })
}
})

 module.exports= router;
