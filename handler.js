module.exports.sendEmail = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello from Appleworld!',
      }),
    };
  };
  