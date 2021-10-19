const router = require('express').Router();
const { isUser, isGuest } = require('../middlewares/guard');
const { housingValidation } = require('../middlewares/validation');
const { createHousing, getHousingById, del } = require('../services/housingService')

router.get('/create', isUser(), (req, res) => {
    try {
        res.render('housing/create', { title: 'Create Offer', user: req.user })
    } catch (error) {
        res.render('404', { title: 'Not Found' });
    }
});

router.post('/create', isUser(), housingValidation('housing/create', 'Create Offer'), async (req, res) => {
    try {
        console.log(req.body)
        const { name, type, year, city, image, description, pieces } = req.body;
        const housing = {
            name: name.trim(),
            type,
            year: Number(year),
            city: city.trim(),
            image,
            description: description.trim(),
            pieces: Number(pieces),
            owner: req.user._id
        }
        await createHousing(housing);
        res.redirect('/');
    } catch (error) {
        res.render('404', { title: 'Not Found' });
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        const housing = await getHousingById(req.params.id);
        if (housing.rented.length > 0) {
            housing.rented = housing.rented.join(', ')
        }
        const ctx={
            title: 'Details',
            housing,
            user:req.user
        }
        if (!req.user) {
            ctx.guest = 'guest';
        }
        if (housing.ownerId == req.user?._id) {
            ctx.owner = 'owner';
        } else {
            ctx.logged = 'logged';
        }
        res.render('housing/details', ctx)
    } catch (error) {
        res.render('404', { title: 'Not Found' });
    }
});

router.get('/:id/delete', isUser(), async (req, res) => {
    try {
        await del(req.params.id);
       res.redirect('/');
    } catch (error) {
        res.render('404', { title: 'Not Found' });
    }
});

module.exports = router;