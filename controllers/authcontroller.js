var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('signup');
 
}
exports.signin = function(req, res) {
 
    res.render('login');
 
}
exports.dashboard = function(req, res) {
 
    res.render('dashboard');
 
}