import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    filename: function (req, file, cb) {
        const nombreFinal = `${Date.now()}-foto-${file.originalname}`
        cb(null, nombreFinal)
    }
})

const upload = multer({ storage })
const upLoadAvatarImg = upload.single('avatar');

export default upLoadAvatarImg