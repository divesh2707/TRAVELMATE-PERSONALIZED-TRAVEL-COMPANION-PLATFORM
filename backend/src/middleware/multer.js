import multer from 'multer';

// Set up multer to store files in memory
const storage = multer.memoryStorage(); // Store the file in memory (as buffer)
const upload = multer({ storage: storage });

export default upload;
 