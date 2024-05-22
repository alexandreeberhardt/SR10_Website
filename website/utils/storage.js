const pdfFolderPath = 'public/pdf/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        if (file.fieldname !== 'pdf') { // check the fieldname
            console.log('Erreur de type')
            // on ne fait rien 
        }
        else {
            cb(null, pdfFolderPath);
        }
     },
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 

