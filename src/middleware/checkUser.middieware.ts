/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function CheckUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('middleWare Working');
  next();
}
