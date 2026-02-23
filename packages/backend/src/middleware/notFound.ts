import { Request, Response, NextFunction } from 'express'

type HttpError = Error & { statusCode?: number }

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: HttpError = new Error(`Not Found - ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}