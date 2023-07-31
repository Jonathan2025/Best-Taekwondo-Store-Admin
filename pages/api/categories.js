// Just like api/products.js, this will be api/categories which will be the endpoint for categories

const categories = (req, res) => {
    const {method} = req // basically accessing req.method

    if (method === 'POST'){
        const {name} = req.body
    }
}

export default categories