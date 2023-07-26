// This will be the endpoint for uploading images 
import multiparty from 'multiparty' // Multiparty is a package that parses multipart- form data requests which supports streaming


const handleUpload = async(req, res) => {
    // using the multipart format from the documentation
    const form = multiparty.Form()

    // The promise is a proxy for a value not necessarily known when promise is created
    // Allows you to associate handlers with an async action's eventual success value of failure reason
    // promise is in one of these states: pending, fulfilled, rejected
    
    // Instead of returning the new promise, we can just grab the fields and files 
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files)=>{

            if (err) reject(err) // if theres an error then reject with the error
            resolve({fields, files}) // otherwise we will resolve with the fields and files
        })
        console.log(files.file.length) // important as we access an object we know what attributes are in it 
        res.json('ok')
    })
    
}

export const config = {
    api: {bodyParser: false},

}

export default handleUpload