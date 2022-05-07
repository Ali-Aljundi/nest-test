import { IsString } from "class-validator";

export class CreateCountryDto {
    @IsString()
    public readonly name: string;
}
