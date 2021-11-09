const { readFile, writeFile } = require('fs/promises');

class HeroRepository {
  constructor ({ file }) {
    this.file = file;
  }
  
  async __currentFileContent() {
    return JSON.parse(await readFile(this.file, 'utf8'));
  } 

  async recordInTheFile(currentFile) {
    return await writeFile(this.file, JSON.stringify(currentFile), 'utf8');
  }

  async find(itemID) {
    const all = await this.__currentFileContent();

    return !itemID ? all : all.find(({ id }) => itemID === id);
  }

  async create(data) {
    const currentFile = await this.__currentFileContent();

    currentFile.push(data);

    await this.recordInTheFile(currentFile);
    
    return data.id;
  }

  async update({id, hero}) {
    const allHeroes = await this.__currentFileContent();
    const savedHeroes = allHeroes.filter(({ id: _id }) => id != _id);
    
    hero.id = id;
    savedHeroes.push(hero);

    await this.recordInTheFile(savedHeroes);
  }

  async exclude(id) {
    if (!id) return await this.record([]);

    const allHeroes = await this.__currentFileContent(); 
    const savedHeroes = allHeroes.filter(({ id: _id }) => id != _id);
    
    return await this.recordInTheFile(savedHeroes);
  }
}

module.exports = HeroRepository;