// This will be the endpoint for uploading images 
import multiparty from 'multiparty' // Multiparty is a package that parses multipart- form data requests which supports streaming


const handleUpload = async(req, res) => {
    // using the multipart format from the documentation
    const form = multiparty.Form()
    form.parse(req, (err, fields, files)=>{
        console.log(files.length)
        res.json('ok')
    })
}

export const config = {
    api: {bodyParser: false},

}

export default handleUpload