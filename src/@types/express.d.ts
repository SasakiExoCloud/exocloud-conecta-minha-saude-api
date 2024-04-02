declare namespace Express {
  interface Request {
    headers: {
      authorization: string
    }
    user: {
      userId: string
    }
  }
}
