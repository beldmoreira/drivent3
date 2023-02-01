import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

const eventRepository = {
  findHotels,
};

export default eventRepository;
