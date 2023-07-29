import e, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";



const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
const AUTHENTICATION_EXPIRATION_HOURS = 12;
const JWT_SECRET = process.env.JWT_SECRET ||"SERCRETBABA"



const router = Router();
const prisma = new PrismaClient();

//Generate a random 8 digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

//generate the JWT token
function generateAuthToken(tokenId: Number): string{
    const jwtPayload = { tokenId };

    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm: "HS256",
        noTimestamp: true
    })
}

//Create a user, if it doesn't exist
//generate the emailToken and send it to their

router.post('/login', async (req, res) => {
    const { email } = req.body;
  
    // generate token
    const emailToken = generateEmailToken();
    const expiration = new Date(
      new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60 * 1000
    );
  
    try {
        const createToken = await prisma.token.create({
            data: {
              type: 'EMAIL',
              emailToken,
              expiration,
              user: {
                connectOrCreate: {
                  where: { email }, 
                  create: { email },
                },
              },
            },
          });
      
          console.log(createToken);
          // TODO send emailToken to user's email
    
          res.status(200).json("Authentication done");
       
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "Unable to process authentication"})
    }
});


    //Validate the emailToken
    //Generate a long-lived JWT token
    router.post('/authenticate', async (req, res) => {
        const {email, emailToken} = req.body;

       const dbEmailToken = await prisma.token.findUnique({
        where: {
            emailToken
        },
        include: {
            user: true
        }
       })

       console.log(dbEmailToken);

       //validating the emailToken
       if(!dbEmailToken || !dbEmailToken.valid){
        return res.sendStatus(401)
       }

       //validation for expiring time of token
       if(dbEmailToken.expiration < new Date()){
        return res.status(401).json({error: "Token expired"});
       }

       //validation for email
       if(dbEmailToken?.user?.email != email){
        return res.sendStatus(401);
       }

       //create expiration time
       const expiration = new Date(
        new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 60 * 60 * 1000
      );
       const apiToken = await prisma.token.create({
        data: {
            type: 'API',
            expiration,
            user:{
                connect: {email}
            }
        }
       })

       //Invalidate the EmailToken
       await prisma.token.update({
        where: {id: dbEmailToken.id},
        data: {valid: false},
       });

       //generate the JWT token
       const authToken = generateAuthToken(apiToken.id);



        res.status(200).json({authToken});
    })

export default router;