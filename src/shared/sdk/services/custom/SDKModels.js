import { User } from '../../models/User';
import { Message } from '../../models/Message';
import { Computer } from '../../models/Computer';
export class SDKModels {
  models = {
    User: User,
    Message: Message,
    Computer: Computer,
    
  };

  get(modelName) {
    return this.models[modelName];
  }

  getAll() {
    return this.models;
  }

  getModelNames() {
    return Object.keys(this.models);
  }
}
