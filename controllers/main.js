const path = require('path');

exports.indexPage = (req, res, next) => {
    return res.status(200).sendFile(path.join(__dirname, '../views', 'index.html'));
};