let validator = require('validator');
let Character = require('../models/character');

let shell = require('shelljs');

let controller = {
    getCharacters : (req, res) => {
        let query = Character.find({});

        query.sort('-_id').exec((err, characters) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en el listado de personajes'
                });
            }
            if (!characters) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay personajes'
                });
            }
            return res.status(200).send({
                characters
            });
        });
    },
    getCharacter: (req, res) => {

        let characterId = req.params.id;

        if(!characterId){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo !!!'
            });
        }

        Character.findById(characterId, (err, character) => {

            if(err || !character){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo !!!'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                article: character
            });

        });
    },
    addCharacter: (req, res) => {
        let params = req.body;
        try {
            var name = !validator.isEmpty(params.name);
            var last_name = !validator.isEmpty(params.last_name);
        } catch (e) {
            return res.status(200).send({
                status: 'error',
                message: 'Error, faltan datos por enviar'
            });
        }

        if (name && last_name) {
            let character = new Character();
            character.name = params.name;
            character.last_name = params.last_name;
            if(params.image){
                character.image = params.image;
            }else{
                character.image = null;
            }
            character.save((err, characterStored) => {
                if(err || !characterStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El personaje no se ha guardado'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    character: characterStored
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }
    },
    updateCharacter: (req, res) => {
        let characterId = req.params.id;
        let params = req.body;

        try {
            var name = !validator.isEmpty(params.name);
            var last_name = !validator.isEmpty(params.last_name);
        } catch (e) {
            return res.status(200).send({
                status: 'error',
                message: 'Error, faltan datos por enviar'
            });
        }

        if (name && last_name) {
            Character.findOneAndUpdate({_id: characterId}, params, {new: true}, (err, characterUpdated) => {
                if(err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar el personaje'
                    });
                }
                if (!characterUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe este personaje'
                    });
                }

                return res.status(200).send({
                   characterUpdated
                });
            });
        } else {
            return res.status(500).send({
               status: 'error',
               message: 'Faltan datos para actualizar'
            });
        }
    },
    deleteCharacter: (req, res) => {
        let characterId = req.params.id;

        Character.findOneAndDelete({_id: characterId}, (err, characterDeleted) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'El personaje no pudo ser eliminado'
                });
            }
            if(!characterDeleted) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El personaje no existe'
                });
            }

            return res.status(200).send({
                characterDeleted
            });
        });
    },

    updateCode: (req, res) => {
        shell.exec('./scripts/api.sh');
    }
};

module.exports = controller;