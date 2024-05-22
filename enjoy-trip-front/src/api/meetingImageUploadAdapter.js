import http from '@/common/axios-config.js'

export default class UploadAdapter {
    constructor(loader, url) {
        this.url = url
        this.loader = loader
        // this.upload() is no longer called here to avoid duplicate uploads
    }

    upload() {
        return this.loader.file.then((uploadedFile) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData()
                formData.append('image', uploadedFile)

                http.post('/meeting/writing-image-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        const data = response.data
                        const returnUrl = data.url
                        const imageName = data.imageName // Get image name with UUID

                        resolve({
                            default: returnUrl
                        })

                        console.log(returnUrl)
                    })
                    .catch((error) => {
                        console.log(error)
                        reject(error.response.data.message)
                    })
            })
        })
    }
}

export function deleteImageFromServer(imageName) {
    console.log(imageName)

    http.post(`/meeting/writing-image-delete/${imageName}`)
        .then((response) => {
            console.log('Image deleted:', response.data)
        })
        .catch((error) => {
            console.error('Error deleting image:', error)
        })
}
