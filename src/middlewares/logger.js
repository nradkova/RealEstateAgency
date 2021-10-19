module.exports = () => (req, res, next) => {
    let result='>>> '+ req.method+ req.url;
    if(req.user){
        result+='  >>> '+ req.user.username;
    }
    console.log(result);
    next();
};