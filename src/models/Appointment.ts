import { uuid } from 'uuidv4';

class Appointment {
  id: String;
  provider: String;
  date: Date;

  constructor(provider: String, date: Date) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
