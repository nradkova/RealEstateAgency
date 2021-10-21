const router = require('express').Router();
const { getLastThreeHousings, getAllHousings } = require('../services/housingService')

router.get('/', async (req, res) => {
    try {
        const ctx = {
            title: 'Real Estate Agency'
        }
        
        let lastThreeHousings = await getLastThreeHousings();
        if (lastThreeHousings.length > 0) {
            ctx.housings = lastThreeHousings;
        }
        res.render('home/home', ctx)
    } catch (error) {
        res.render('404', { title: 'Not Found' });
    }
});

router.get('/offers', async (req, res) => {
    try {
        const ctx = {
            title: 'Real Estate Agency'
        }
        const all = await getAllHousings();

        if (all.length > 0) {
            ctx.housings = all;
        }
        res.render('home/offers', ctx)
    } catch (error) {
        res.render('404', { title: 'Not Found' });
    }
});


module.exports = router;