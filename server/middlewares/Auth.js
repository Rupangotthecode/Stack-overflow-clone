import jwt from 'jsonwebtoken'
// every time we have a database altering request, we wil check if the token is present or not so that we do not have unauthirized altering of the database.
//This is an additional security feature on top of the token based authentication. 
const auth = (req,res, next) =>{

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodeData = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decodeData?.id
        next() // refers to the next function to be called in the request like PostAnswer, etc
    } catch (error) {
        console.log(error)
    }    
    
}
export default auth