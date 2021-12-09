//middleware d'identification.
const jwt = require('jsonwebtoken');
const JWT_CLE_SECRETE = '1azenh44e2r5v8b7n4h5t65dvvvtyu5i1f6cc7cn'

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //on récupère le token (on split autour de l'espace), on récupère un tableau dont on prend le second élément (le 1)
        const decodedToken = jwt.verify(token, JWT_CLE_SECRETE); //On décode le token, on utilise la clé secrete, le token décodé devient un objet js
        const userId = decodedToken.userId; //On récupère l'id de la réponse
        if (req.body.userId && req.body.userId !== userId) { //si l'id ne correspond pas
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({ error: 'Requête non authentifiée'})
    }
};