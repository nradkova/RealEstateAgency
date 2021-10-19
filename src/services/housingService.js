const Housing = require('../models/Housing');

async function createHousing({ name, type, year, city, image, description, pieces, owner }) {
    const housing = new Housing({ name, type, year, city, image, description, pieces, owner });
    await housing.save();
    return housing;
}


async function getAllHousings() {
    return await Housing.find({}).lean();
}

async function getLastThreeHousings() {
    return await Housing.find().sort({ createdAt: 1 }).limit(3).lean();
}


module.exports = {
    createHousing,
    getAllHousings,
    getLastThreeHousings,
}