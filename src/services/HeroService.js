class HeroService {
  constructor ({ heroRepository }) {
    this.heroRepository = heroRepository;
  }

  async find(itemId) {
    return await this.heroRepository.find(itemId);
  }

  async create(data) {
    return await this.heroRepository.create(data);
  }

  async update({ id, hero }) {
    return await this.heroRepository.update({ id, hero });
  }

  async exclude(id) {
    return await this.heroRepository.exclude(id);
  }
}

module.exports = HeroService;