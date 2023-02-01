import { notFoundError, requestError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import hotelRepository from '@/repositories/hotel-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  if (!ticket.TicketType.isRemote) {
    throw notFoundError();
  }
  if (ticket.status !== 'PAID') {
    throw requestError(400, 'The ticket needs to be paid');
  }
  const hotels = await hotelRepository.findHotels();

  if (!hotels) {
    throw notFoundError();
  }
  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;