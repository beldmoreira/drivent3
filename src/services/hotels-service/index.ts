import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import hotelRepository from '@/repositories/hotel-repository';
import { paymentError } from '@/errors/payment-error';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.TicketType.isRemote || ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel) {
    throw paymentError();
  }
  const hotels = await hotelRepository.findHotels();

  return hotels;
}

async function getHotelRooms(userId: number, hotelId: string) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  if (ticket.TicketType.isRemote || ticket.status !== 'PAID' || !ticket.TicketType.includesHotel) {
    throw paymentError();
  }
  const rooms = await hotelRepository.findHotelRooms(hotelId);
  if (!rooms) {
    throw notFoundError();
  }
  return rooms;
}

const hotelsService = {
  getHotels,
  getHotelRooms,
};

export default hotelsService;
