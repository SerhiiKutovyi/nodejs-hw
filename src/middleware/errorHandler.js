export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  console.error('Error:', err.message);

  res.status(500).json({
    message: isProd ? 'Щось пішло не так' : err.message,
  });
};
