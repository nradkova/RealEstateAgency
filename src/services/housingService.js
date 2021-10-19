const Housing = require('../models/Housing');

async function createHousing({ name, type, year, city, image, description, pieces, owner }) {
    const housing = new Housing({ name, type, year, city, image, description, pieces, owner });
    await housing.save();
    return housing;
}

async function getHousingById(id) {
    const housing = await Housing.findById(id)
        .populate('rented')
        .populate('creator')
        .lean();
    if (housing) {
        const viewModel = {
            _id: housing._id,
            name: housing.name,
            type:housing.type,
            year:housing.year,
            city:housing.city,
            image: housing.image,
            description: housing.description,
            pieces: housing.pieces,
            rented: housing.rented,
            ownerId:cube.owner._id.toString()
        }
        return viewModel;
    }
    return undefined;
}

async function edit(id, housing) {
    const current = await Housing.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
    Object.assign(current, housing);
    return current.save();
}

async function del(id) {
    const current = await Housing.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
  return Housing.deleteOne({_id:id});
}

async function getAllHousings() {
    return await Housing.find({}).lean();
}

async function getLastThreeHousings() {
    return await Housing.find().sort({ createdAt: 1 }).limit(3).lean();
}


module.exports = {
    createHousing,
    getHousingById,
    edit,
    del,
    getAllHousings,
    getLastThreeHousings,
}