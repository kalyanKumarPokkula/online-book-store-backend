import { Author } from "../models/index";

class AuthorRepository {
  async getAuthors() {
    try {
      return await Author.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthorRepository;
