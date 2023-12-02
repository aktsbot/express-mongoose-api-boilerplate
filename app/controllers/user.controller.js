export const createUser = (req, res, next) => {
  try {
    return res.json({});
  } catch (error) {
    next(error);
  }
};
