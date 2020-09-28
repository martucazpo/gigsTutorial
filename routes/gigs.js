const router = require('express').Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

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
    const data = {
        title: 'simple Wordpress website',
        technologies: 'wordpress,php,html,css',
        budget: '$1000',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas. Ac turpis egestas sed tempus urna et pharetra. Est ullamcorper eget nulla facilisi etiam dignissim diam quis enim. Urna nec tincidunt praesent semper feugiat nibh.',
        contact_email: 'user2@gmail.com'
    }

    let {
        title,
        technologies,
        budget,
        description,
        contact_email
    } = data;

    Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));
});

module.exports = router;