import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: string) {
  return prisma.hotel.findFirst({
    where: { id: Number(hotelId) },
    include: {
      Rooms: true,
    },
  });
}

const eventRepository = {
  findHotels,
  findHotelRooms,
};

export default eventRepository;
