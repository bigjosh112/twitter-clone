import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();



//create tweet
router.post('/create', async (req, res) => {
    const {content, image, userId} = req.body;

    try {
        const result = await prisma.tweet.create({
            data: {
                content,
                image,
                userId
            }
        })
        res.status(201).json(result)
    } catch (error) {
        res.status(501).json({error: "Tweet not created"})
    }
})

//list tweet
router.get('/get-all', async (req, res) => {
    try {
       const result = await prisma.tweet.findMany();
       res.status(201).json(result)
    } catch (error) {
        res.status(404).json({error: "Unable to get Tweets"})
    }
});

//get one 
router.get('/get/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.tweet.findUnique({where: {id: Number(id)}})
        res.status(201).json(result)
    } catch (error) {
        res.status(404).json({error: "Unable to get the tweet"});
    }
    
});

//update 
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { content, image} = req.body;

    try {
        const result = await prisma.tweet.update({
            where: {id: Number(id)},
            data: {content, image}
        });
        res.status(201).json(result);      
    } catch (error) {
        res.status(501).json({error: "Tweet unable to be updated"})
    }
    
});

//delete 
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await prisma.tweet.delete({where: {id: Number(id)}})
        res.status(201).send("Tweet successfully deleted")
    } catch (error) {
        res.status(501).json({error: "Unable to delete tweet"});
    }
    
});

export default router