import { Image } from '../models/Image.interface';

interface CreateEmployeeDto {
  name: string;
  surname: string;
  middleName: string;
  titleId: number | null;
  status: string | null;
  isManager: boolean;
  email: string;
  password: string;
  image: Image;
}

export default CreateEmployeeDto;
