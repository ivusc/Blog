import jwt from 'jsonwebtoken';

const auth = async (req, res,next) => {
  const token = req.cookies.authCookie;
  if (!token) {
    return res.status(404).json({message: 'Unauthenticated!'});
  }

  let decodedData;

  try {
    if(token){
      decodedData = jwt.verify(token, 'mysecretprivatekey' );
      req.userId = decodedData?.id;
    }else{
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    return next();
  } catch (error) {
    return res.clearCookie("authCookie").status(404).json({message: 'Error'});
  }
}

export default auth;