const {Storage} = require('@google-cloud/storage');
const NotFoundError = require('./exceptions/NotFoundError');

class StorageService {
  constructor() {
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
    });

    this._bucket = storage.bucket(process.env.BUCKET_NAME);
  }

  async writeFile(file) {
    const filename = +new Date() + file.name;
    console.log("writeFile")
    console.log(file)
    await this._bucket.file(filename).save(file.data);

    return filename;
  }

  async deleteFile(filename) {
    try {
      await this._bucket.file(filename).delete();
    } catch (error) {
      if (error.code === 404) {
        throw new NotFoundError('File tidak ditemukan');
      }
      throw error;
    }
  }

  async listFiles() {
    try {
      const [files] = await this._bucket.getFiles();
      return files.map((file) => file.name);
    } catch (error) {
      throw error;
    }
  }

  async downloadFile(filename) {
    try{
      const [file] = await this._bucket.file(filename).download();
      return file;
    }
    catch(error){
      if (error.code === 404) {
        throw new NotFoundError('File tidak ditemukan');
      }
      throw error;
    }
  }
}

module.exports = StorageService;
