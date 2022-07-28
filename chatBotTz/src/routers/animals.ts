import express from 'express';
import controller from '../controllers/animalController';

const router = express.Router();

router.get('/list/dog/images', controller.check);
router.post('/upload/dog/image', controller.take);

export = router;
