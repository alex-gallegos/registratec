const jwt = require('jsonwebtoken');

const secret = '102ca31bccfeca37119ed6c608d2798a01d86dc69b38571745d9ba69d2efda6eee95ac665e76172d7b3e4ec17bc389c54c76e4d304795012b623cdf76de059c5';

function generate_token(username) {
    return jwt.sign({ username: username }, secret, { expiresIn: '60d' });
}

function verify_token(token) {
    try {
        const result = jwt.verify(token, secret);
        if (result) return true;
        else return false;
    }
    catch(err) {
        return false;
    }
}

function check_login_middleware(request, response, next) {
    const token = request.cookies.access_token || null;
    if (token && verify_token(token)) {
        console.log('Found valid token! (from middleware)');
        next();
    }
    else{
        console.log('No valid token (from middleware)');
        response.redirect('/login');
    }
}

module.exports.generate_token = generate_token;
module.exports.verify_token = verify_token;
module.exports.check_login_middleware = check_login_middleware;
