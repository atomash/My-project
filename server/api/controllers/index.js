exports.fetchUser = (req, res) => {
    res.json({id: 1, name: 'User from server'})
};

exports.fetchProduct = (req, res) => {
    res.json({id: 1, title: 'Product from server'})
};