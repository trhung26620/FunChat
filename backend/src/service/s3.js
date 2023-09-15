require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

// uploads a file to s3
const uploadFile = (file) => {
    try {
        const fileStream = fs.createReadStream(file.path)
        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename
        }
        return s3.upload(uploadParams).promise()
    } catch (error) {
        throw error
    }

}

// downloads a file from s3
const getFileStream = (fileKey) => {
    try {
        const downloadParams = {
            Key: fileKey,
            Bucket: bucketName
        }

        return s3.getObject(downloadParams).createReadStream()
    } catch (error) {
        throw error
    }
}

const deleteFile = (fileUrl) => {
    try {
        const fileKey = fileUrl.split('/')[3]
        const deleteParams = {
            Key: fileKey,
            Bucket: bucketName
        }
        return s3.deleteObject(deleteParams).promise()
    } catch (error) {
        throw error
    }
}


module.exports = {
    uploadFile, getFileStream, deleteFile
}