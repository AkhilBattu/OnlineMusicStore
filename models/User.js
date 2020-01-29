class User{
  constructor(UserId, FirstName, LastName, EmailAddress,AddressLine1, AddressLine2, City, State, PostalCode, Country){
  this.UserId=UserId;
  this.FirstName=FirstName;
  this.LastName=LastName;
  this.EmailAddress=EmailAddress;
  this.AddressLine1=AddressLine1;
  this.AddressLine2=AddressLine2;
  this.City=City;
  this.State=State;
  this.PostalCode=PostalCode;
  this.Country=Country;
}
};

module.exports=User;
