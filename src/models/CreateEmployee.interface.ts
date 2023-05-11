interface CreateEmployee {
  name: string;
  surname: string;
  middleName: string;
  titleId: number | null;
  status: string | null;
  image: File | null;
  isManager: boolean;
  email: string;
  password: string;
}

export default CreateEmployee;
