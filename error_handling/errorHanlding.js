const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = err.status || 500;
    const message = err.message || 'Serverda kutilmagan xatolik yuz berdi.';
  
    res.status(statusCode).json({
      success: false,
      error: {
        message: message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
      },
    });
  };
  
  module.exports = errorHandler;
  