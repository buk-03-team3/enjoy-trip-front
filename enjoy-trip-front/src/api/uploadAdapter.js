import axios from 'axios';
const noConextPathUrl = import.meta.env.VITE_APP_NO_CONTEXT_PATH_URL;

export default class UploadAdapter {
    constructor(loader, url) {
        this.url = url;
        this.loader = loader;
        this.loader.file.then((pic) => (this.file = pic));

        // this.upload();
    }

    // Starts the upload process.
    upload() {
        return 
    }
}