import { Prisma } from "@prisma/client";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();





//create users
router.post('/create', async (req, res) => {
    const {email, name, username} = req.body;
    
    try {
        const result = await prisma.user.create({
            data: {
                email,
                name,
                username,
                bio: "Hello there, I am new here"
            }
        })
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: "Usernam or Email already exist"});
    }
    
})

//list users
router.get('/get-all', async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers);
});

//get one 
router.get('/get/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({where: {id: Number(id)}, include: {tweets: true}})
    res.json(user);
});

//update 
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { bio, name, image} = req.body;

    try {
        const result = await prisma.user.update({
            where: {id: Number(id)},
            data: {bio, name, image}
        });
        res.status(201).json(result);      
    } catch (error) {
        res.status(400).json({error: "User unable to update"})
    }
    res.status(501).json({error: `Not Implemented: ${id}`});
});

//delete 
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await prisma.user.delete({
            where: {id: Number(id)}
        })
        res.status(200).send("User succefully deleted");    
    } catch (error) {
        res.status(400).json({error: "User unable to be deleted"})
    }

    res.status(501).json({error: `Not Implemented: ${id}`});
});

export default router