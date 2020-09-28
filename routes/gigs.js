const router = require('express').Router();
//const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => Gig.findAll()
    .then(gigsObject => {
        const newGigsObject = {
            gigs: gigsObject.map(data => {
                return {
                    title: data.title,
                    description: data.description,
                    technologies: data.technologies,
                    budget: data.budget,
                    contact_email: data.contact_email
                };
            })
        };
        res.render('gigs', {
            gigs: newGigsObject.gigs
        });
    })
    .catch(err => console.log(err)));


router.get('/add', (req, res) => res.render('add'));

router.post('/add', (req, res) => {
    let {
        title,
        technologies,
        budget,
        description,
        contact_email
    } = req.body;
    let errors = [];
    if (!title) {
        errors.push({
            text: 'Please add a title'
        });
    }
    if (!technologies) {
        errors.push({
            text: 'Please list required technologies'
        });
    }
    if (!description) {
        errors.push({
            text: 'In a few word, please describe the job'
        });
    }
    if (!contact_email) {
        errors.push({
            text: 'Please add a contact email'
        });
    }

    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            description,
            budget,
            technologies,
            contact_email
        });
    } else {
        if(!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }
        technologies = technologies.toLowerCase().replace(/, /g, ',');
        Gig.create({
                title,
                technologies,
                budget,
                description,
                contact_email
            })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }
});

router.get('/search', (req, res) => {
    let { term } = req.query;
    term = term.toLowerCase();
    Gig.findAll({ where: { technologies: { [Op.like] : '%' + term + '%' } }})
    .then(gigsObject => {
        const newGigsObject = {
            gigs: gigsObject.map(data => {
                return {
                    title: data.title,
                    description: data.description,
                    technologies: data.technologies,
                    budget: data.budget,
                    contact_email: data.contact_email
                };
            })
        };
        res.render('gigs', {
            gigs: newGigsObject.gigs
        });
    })
    .catch( err => console.log(err) );
});

module.exports = router;