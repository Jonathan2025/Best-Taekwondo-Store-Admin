// This will pretty much be 

const handler = (req, res) => {
    // We send a post request from new.js, therefore the method will be post
    res.json(req.method)
}


export default handler