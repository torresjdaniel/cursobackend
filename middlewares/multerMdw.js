import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', `public/img`))
    },
    filename: function (req, file, cb) {
        const nombreFinal = `${Date.now()}-foto-${file.originalname}`
        cb(null, nombreFinal)
    }
})

const upload = multer({ storage })
const upLoadAvatarImg = upload.single('avatarImg');

export default upLoadAvatarImg
