import { Router } from "express";

const router = Router();



//create tweet
router.post('/', (req, res) => {
    res.status(501).json({error: 'Not Implemented'})
})

//list tweet
router.get('/', (req, res) => {
    res.status(501).json({error: 'Not Implemented'})
});

//get one 
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemented: ${id}`});
});

//update 
router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemented: ${id}`});
});

//delete 
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(501).json({error: `Not Implemented: ${id}`});
});

export default router