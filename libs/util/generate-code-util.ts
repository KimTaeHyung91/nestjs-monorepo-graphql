import {v4} from 'uuid';

export class GenerateCodeUtil {
  private constructor() {
  }

  static generateUUID() {
    return v4();
  }
}
