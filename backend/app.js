const express = require('express'); //Importation framework express
const bodyParser = require('body-parser'); //Importation body-parser pour générer le corps en json
const path = require('path');
const helmet = require('helmet'); //sécurisation des HEADERS HTTP

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Permission d'accès à  notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //Ajout des headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Permet l'envoi des requêtes
    next();
});

//Body-Parser config
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
//Chemin des images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

app.use('/api/auth', userRoutes); //pour la routes auth on utilise le router userRoutes
app.use('/api/wall', postRoutes); //pour la route wall/Mur on utilise le router postsRoutes

module.exports = app; //exportation de l'app