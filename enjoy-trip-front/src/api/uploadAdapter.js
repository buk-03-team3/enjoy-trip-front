import http from '@/common/axios-config.js';

export default class UploadAdapter {
    constructor(loader, url) {
        this.url = url;
        this.loader = loader;
        this.loader.file.then((pic) => (this.file = pic));

        this.upload();
    }

    // Starts the upload process.
    upload() {
        return this.loader.file.then((uploadedFile) => {
            return new Promise((resolve, reject) => {
                const params = {
                    image: uploadedFile,
                };
                http.post('/community/uploadImage', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((response) => {
                        const returnUrl = response.data.imageUrl;
                        resolve({
                            default: `${returnUrl}`,
                        });

                        console.log(returnUrl)
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error.response.data.message);
                    });
            });
        });
    }
}