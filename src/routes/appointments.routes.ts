import { Router, request, response } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, isEqual, parseISO } from 'date-fns';
const appointmentsRouter = Router();

interface Appointment {
  id: String;
  provider: String;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentsDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

export default appointmentsRouter;
