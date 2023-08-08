// This will be the endpoint for uploading images 
import multiparty from 'multiparty' // Multiparty is a package that parses multipart- form data requests which supports streaming
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3' // we will need the s3 client in order to upload images to our aws S3 bucket
import fs from 'fs' //inbuilt application programming interface of the fs module which is used to read the file and return its content
import mime from 'mime-types'
import mongooseConnect from "@/lib/mongoose"
import { isAdminRequest } from "./auth/[...nextauth]"

const handleUpload = async(req, res) => {

    await mongooseConnect() // call the mongoose connect function we created in mongoose.js
    await isAdminRequest(req, res) // pretty much we make a call to isAdminrequest to make sure that the user logged in is an admin

    // using the multipart format from the documentation
    const form = new multiparty.Form()
    const bucketName = 'best-tkd-online'
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
      // Set up the S3 client with the access key credentials from our s3 bucket
      const client = new S3Client({
        region: 'us-east-1',
        credentials:{
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    })

    const links = []
    for (const file of files.file){
        const extension = file.originalFilename.split('.').pop() // Here we just want the extension of the file first
        //Similar to what we had in our kickflix app, we cant have files with the same filename being uploaded, so here we can update the filename to include a date
        
        console.log({extension, file})

        const newFilename = Date.now() + '.' + extension
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            // Key will be the name of the file. We want to have unique file names 
            Key: newFilename,
            Body: fs.readFileSync(file.path), 
            ACL: 'public-read',
            ContentType: mime.lookup(file.path), // Mime types will allow us to figure out the content type of the file being uploaded
        }))
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`
        links.push(link) // add the specific link to our link array
    }
    return res.json({links})
    
}
// set configurations to not parse the body to json
export const config = {
    api: {bodyParser: false},

}

export default handleUpload