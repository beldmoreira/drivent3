import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.business(),
    },
  });
}

export async function createAnotherHotel() {
  return prisma.hotel.create({
    data: {
      name: 'Hotel California',
      image: 'https://lirp.cdn-website.com/3b09881a/dms3rep/multi/opt/2+escultura+sereia-1920w.jpg',
    },
  });
}

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.company.catchPhraseAdjective(),
      capacity: faker.datatype.number({ min: 100, max: 1000 }),
      hotelId: hotelId,
    },
  });
}

export async function createAnotherRoom(hotelIId: number) {
  return prisma.room.create({
    data: {
      name: 'Moroccan Style',
      capacity: 70,
      hotelId: hotelIId,
    },
  });
}
