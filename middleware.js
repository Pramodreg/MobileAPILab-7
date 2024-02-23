const logCreateRequest = (req, res, next) => {
    console.log(`Creating a new movie with title: ${req.body.title}, genre: ${req.body.genre}`);
    next();
  };
  
  const logReadRequest = (req, res, next) => {
    console.log('Fetching all movies');
    next();
  };
  
  const logUpdateRequest = (req, res, next) => {
    console.log(`Updating movie with ID: ${req.params.id}, new title: ${req.body.title}, new genre: ${req.body.genre}`);
    next();
  };
  
  const logDeleteRequest = (req, res, next) => {
    console.log(`Deleting movie with ID: ${req.params.id}`);
    next();
  };

  //Middleware to check if user is authenticated
  const isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
      returnnext();
    }else{
      res.status(401).json({error:'Unauthorized'});
    }
  }
  
  module.exports = {
    logCreateRequest,
    logReadRequest,
    logUpdateRequest,
    logDeleteRequest,
    isAuthenticated
  };