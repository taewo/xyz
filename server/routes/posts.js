import express from 'express';
import path from 'path';

const router = express.Router();

router.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../../client/index.html'));
})
// router.get('/', (req, res) => {
//   res.send('posts');
// });

export default router;
