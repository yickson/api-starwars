

let controller = {
    getCharacters : (req, res) => {
        return res.status(200).send({
            characters: "Yickson :D"
        });
    }
};

module.exports = controller;