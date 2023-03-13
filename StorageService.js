const {Storage} = require('@google-cloud/storage');
const NotFoundError = require('./exceptions/NotFoundError');

class StorageService {
  constructor() {
    const storage = new Storage({
      projectId: 'xharf-dev',
    });

    this._bucket = storage.bucket("gs-app");
  }

  async writeFile(file) {
    const filename = +new Date() + file.name;
    await this._bucket.file(filename).save(file._data);

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
}

module.exports = StorageService;
