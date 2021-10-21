function isGuest(){
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
}

function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        if (req.user && req.housing &&(req.user._id==req.housing.ownerId)) {
            next();
        } else {
            res.redirect('/offers');
        }
    }
}

module.exports={
    isGuest,
    isUser,
    isOwner
}