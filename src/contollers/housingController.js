const router = require('express').Router();

const preloadHousing = require('../middlewares/preload');
const formatErrorMsg = require('../util/formatErrorMsg');
const { isUser, isOwner } = require('../middlewares/guard');
const { housingValidation } = require('../middlewares/validation');
const { createHousing, delHousing, editHousing } = require('../services/housingService');

router.get('/create', isUser(), (req, res) => {
    try {
        res.render('housing/create', { title: 'Create Offer' })
    } catch (error) {
        res.render('404', { title: 'Not Found' });
    }
});

router.post('/create', isUser(), housingValidation(), async (req, res) => {
    try {
        if (req.housingErrors) {
            throw req.housingErrors;
        }
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
        if (error.name == 'inputError'||error.name == 'ValidationError') {
            errors = formatErrorMsg(error);
            res.render('housing/create', { title: 'Create Offer', errors, housing: req.body });
        } else  {
            res.redirect('/404')
        } 
    }
});


router.get('/:id/details', preloadHousing(), async (req, res) => {
    try {
        const housing = req.housing;
        if (housing.rented.length > 0) {
            housing.rented = housing.rented.join(', ');
        }
        const ctx = {
            title: 'Details',
            housing
        }
        if (!req.user) {
            ctx.guest = 'guest';
        }
        if (housing.ownerId == req.user?._id) {
            ctx.owner = 'owner';
        } else {
            ctx.logged = 'logged';
        }
        res.render('housing/details', ctx);
        
    } catch (error) {
        res.redirect('/404')
    }
});

router.get('/:id/edit', preloadHousing(), isOwner(), async (req, res) => {
    try {
        const housing = req.housing;
        if (housing.rented.length > 0) {
            housing.rented = housing.rented.join(', ')
        }
        const ctx = {
            title: 'Edit',
            housing
        }
        res.render('housing/edit', ctx);

    } catch (error) {
        res.redirect('/404')
    }
});

router.post('/:id/edit', preloadHousing(), isOwner(), housingValidation(), async (req, res) => {
    try {
        if (req.housingErrors) {
            throw req.housingErrors;
        }
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
        await editHousing(req.params.id, housing);
        res.redirect('/');

    } catch (error) {
        if (error.name == 'inputError'||error.name == 'ValidationError') {
            errors = formatErrorMsg(error);
            res.render('housing/create', { title: 'Create Offer', errors, housing: req.body });
        } else  {
            res.redirect('/404')
        } 
    }
});

router.get('/:id/delete', preloadHousing(), isOwner(), async (req, res) => {
    try {
        await delHousing(req.params.id);
        res.redirect('/');

    } catch (error) {
        res.redirect('/404')
    }
});

module.exports = router;