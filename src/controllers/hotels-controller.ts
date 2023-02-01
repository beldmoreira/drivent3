import hotelsService from '@/services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotel = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
