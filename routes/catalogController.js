var express= require('express');
var router = express.Router();
var utility=require('../models/itemUtil')
var profileController=require('./profileController')
var allItems123 = {};

router.get('/index',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('index',{start:[]})
}
  else{
      res.render('index',{firstname:req.session.theUser.FirstName,start:[1]})
  }
})
router.get('/',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('index',{start:[]})
}
  else{
      res.render('index',{start:[1],firstname:req.session.theUser.FirstNam,})
  }
})
//------------------------------------------#Categories page ---------------------------------------------------------
router.get('/categories',function(req,res)
{
  var allItems=utility.getItems();
 allItems=  allItems.exec();


  var Session_User=req.session.theUser;

console.log(req.query.category,'is the req')
// ----------------------------------------if the specific category is given by user-------------------------------------
if(Object.keys(req.query).length!=0){

  catergory=req.query.category;
  var specificCategoryItems=utility.getSpecificCategoryItems(catergory);
  specificCategoryItems=specificCategoryItems.exec();
  if(Session_User==undefined)
{
    console.log('session undefined');
    specificCategoryItems.then(function(docs){
      Items=docs
      console.log(docs,'is the specific category data')
        res.render('categories',{data:docs,firstname:req.session.theUser.FirstName, start:[]});
    })
}
else
 {
  specificCategoryItems.then(function(docs){
    Items=docs
      res.render('categories',{data:docs,firstname:req.session.theUser.FirstName, start:[1]});
    })
  }

}

// ----------------------------------------if the no specific category is given by user-------------------------------------
else
{
if(Session_User==undefined)
{
  allItems.then(function(docs){
    Items=docs
    console.log(docs,'is the data')
      res.render('categories',{data:docs,start:[]});
  })
}
  else
  {
  allItems.then(function(docs){
    Items=docs
      res.render('categories',{data:docs,firstname:req.session.theUser.FirstName, start:[1]});
  })
  }
}

});

//----------------------------------------#Item page ----------------------------------------------------------------------
router.get('/item', function(req,res){
  var itemCode=req.query.itemCode;
  var Session_User=req.session.theUser;

  var allItems=utility.getItems();
  allItems=allItems.exec();
  var item=utility.getItem(itemCode);
  item=item.exec();
  allItems.then(function(docs){
    Items=docs
    console.log('the item is ',docs)
  })


      if(Session_User==undefined){
        item.then(function(docs){
          Items=docs
          if(docs.length!=0){
          console.log('entered the session data undefined and the data is',docs)
          res.render('item',{data:docs, start:[]});
        }
        else{
          allItems.then(function(docs){
            Items=docs
              res.render('categories',{data:docs,start:[]});
          })
        }
      })

    }
    else {
      item.then(function(docs){
        Items=docs
        console.log(docs.length,'is the length of data')
        if(docs.length!=0){
        res.render('item',{data:docs,firstname:req.session.theUser.FirstName, start:[1]});
      }
      else{
          console.log(docs.length,'is the length of data')
        res.render('categories','We cannot find the item you ar looking for')
      }
    }).catch(function(err){
    res.render('categories','We cannot find the item you ar looking for')
    })

    }



  if(itemCode.length===0){
      if(Session_User==undefined){
        allItems.then(function(docs){
          Items=docs
          console.log(docs,'is the data')
            res.render('categories',{data:docs, start:[]});
        })
  }
  else {
    allItems.then(function(docs){
      Items=docs
        res.render('categories',{data:docs,firstname:req.session.theUser.FirstName, start:[1]});
    })
  }
  }
  else if(item.length===0){
      if(Session_User==undefined){
    res.render('categories','We cannot find the item you ar looking for')
  }
  else {
    res.render('categories','We cannot find the item you ar looking for')
  }
  }

});


//----------------------------------------#contact page ----------------------------------------------------------------------
router.get('/contact',function(req,res){
    var Session_User=req.session.theUser;
    if(Session_User==undefined){
  res.render('contact', {start:[]})
}
else {
  res.render('contact', {start:[1],firstname:req.session.theUser.FirstName})
}
});
//----------------------------------------#feedback page ----------------------------------------------------------------------

router.get('/feedback',function(req,res){
  var Session_User=req.session.theUser;
        if(Session_User==undefined){
  res.render('feedback',{start:[]})
}
else {
  res.render('feedback',{start:[1],firstname:req.session.theUser.FirstName})
}
});
//----------------------------------------#about page ----------------------------------------------------------------------
router.get('/about',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('about', {start:[]})
}
else {
    res.render('about', {start:[1],firstname:req.session.theUser.FirstName})
}
});

router.get('/*',function(req,res){
  var Session_User=req.session.theUser;
  if(Session_User==undefined){
  res.render('404',{start:[]})
}
else {
  res.render('404',{start:[1],firstname:req.session.theUser.FirstName})
}
});



module.exports=router;
