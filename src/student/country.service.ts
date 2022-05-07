import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/country.dto';
import { Country } from './entities/student.entity';

@Injectable()
export class CountryService {
  @InjectRepository(Country)
  private readonly countryRepository: Repository<Country>;
     async create(body: CreateCountryDto): Promise<Country | never> {
      const {name}: CreateCountryDto = body;
      let country: Country = await this.countryRepository.findOne({ where: { name } });
      if (country) {
        throw new HttpException('Country Is Already Found', HttpStatus.CONFLICT);
      }
      country = new Country();
      country.name= name
      return this.countryRepository.save(country);
    }
    
      findAll() {
        return `This action returns all student`;
      }
    
      findOne(id: number) {
        return `This action returns a #${id} student`;
      }
    
      update(id: number, updateStudentDto) {
        return `This action updates a #${id} student`;
      }
    
      remove(id: number) {
        return `This action removes a #${id} student`;
      }
}
