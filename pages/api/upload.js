// This will be the endpoint for uploading images 
import multiparty from 'multiparty' // Multiparty is a package that parses multipart- form data requests which supports streaming
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3' // we will need the s3 client in order to upload images to our aws S3 bucket

const handleUpload = async(req, res) => {
    // using the multipart format from the documentation
    const form = new multiparty.Form()

    // The promise is a proxy for a value not necessarily known when promise is created
    // Allows you to associate handlers with an async action's eventual success value of failure reason
    // promise is in one of these states: pending, fulfilled, rejected
    
    // Instead of returning the new promise, we can just grab the fields and files 
    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files)=>{
            if (err) reject(err) // if theres an error then reject with the error
            resolve({fields, files}) // otherwise we will resolve with the fields and files
        })
       
    })
    console.log(files.file.length) // important as we access an object we know what attributes are in it 
    
    for (const file of files.file){
        const extension = file.originalFilename.split('.').pop() // Here we just want the extension of the file first

        console.log({extension, file})
        // await client.send(new PutObjectCommand(
        //     Bucket: 'best-tkd-online',
        //     // Key will be the name of the file. We want to have unique file names 
        //     Key: 
    
        // ))
    }



    // Set up the S3 client with the access key credentials from our s3 bucket
    const client = new S3Client({
        region: 'us-east-1',
        credentials:{
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    })

    
    
    
    res.json('ok')
    
}
// set configurations to not parse the body to json
export const config = {
    api: {bodyParser: false},

}

export default handleUpload