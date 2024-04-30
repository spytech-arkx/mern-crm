const { sign } = require('jsonwebtoken');
const { sendVerificationEmail } = require('./email.service');
require('dotenv').config();

// Helper function for sending a confirmation mail,
// Used in mongoose `post` middleware.
async function sendConfirmationMail() {
    const link = process.env.SERVER_API_URI + '/users/verify-email/';
      const user = this;
      const verifJWT = await sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
      const { success, message } = await sendVerificationEmail(user.email, link + verifJWT);
      if(!success) {
        let retries = 0;
        while (!success && retries < 7) {
          logger.log("warn", `Failed to send confirmation email to ${user.email}. Retrying... (attempt ${retries + 1}/7)`);
          try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const { success, message } = await sendVerificationEmail(user.email, link + verifJWT);
            if(!success) throw new Error()
          } catch (error) {
            logger.log("error", `Error sending confirmation email (retry ${retries + 1}):`, error);
            retries++;
          }
        }
      }
  }

module.exports = {
    sendConfirmationMail,
}