export default class FakeDiskStorageProvider {
  private files: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.files.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    this.files = this.files.filter(item => item !== file);
  }
}

