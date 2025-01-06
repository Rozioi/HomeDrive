const Link = require('../models/Link');
const File = require('../models/File');
const Gtoken = require('../Utils/generateToken');
const LinkController = {
    CreateLink: async (req,res) => {
        const {fileId, ownerId, isPublic} = req.body;
        try{
            const file = await File.findById(fileId);
            if (!file){
                return res.status(404).json({message: "Такого файла не существует"});
            }

        } catch (e){
            return res.status(500).json({error: "Ошибка сервера . Попробуйте ещё раз"})
        }
    }
}