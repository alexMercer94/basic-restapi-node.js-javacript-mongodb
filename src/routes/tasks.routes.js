import { Router } from 'express';

const router = Router();

// Database
import { connect } from '../database';
import { ObjectID } from 'mongodb';

/**
 * Route to get all tasks
 */
router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db
        .collection('tasks')
        .find({})
        .toArray();
    console.log(result);
    res.json(result);
});

/**
 * Route to create a task
 */
router.post('/', async (req, res) => {
    const db = await connect();
    const task = {
        title: req.body.title,
        description: req.body.description
    };
    const result = await db.collection('tasks').insert(task);
    console.log(result);
    res.json(result.ops[0]);
});
/**
 * Get just a task
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').findOne({ _id: ObjectID(id) });
    res.json(result);
});

/**
 * Delete a task
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').deleteOne({ _id: ObjectID(id) });
    res.json({
        message: `Task ${id} deleted`,
        result
    });
});

/**
 * Update a Task
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const updateTask = {
        title: req.body.title,
        description: req.body.description
    };
    await db.collection('tasks').updateOne({ _id: ObjectID(id) }, { $set: updateTask });
    res.json({
        message: `Task ${id} updated`
    });
});

export default router;
