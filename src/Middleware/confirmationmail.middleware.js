import mailer from "nodemailer";
const mail = async (req, res, next) => {
  const transporter = mailer.createTransport({
    service: "gmail",
    auth: { user: "", pass: "" },
  });
  const mailoptions = {
    from: "",
    to: req.body.email,
    subject: "You resume recieved successfully",
    text: `Dear ${req.body.name},

     We have successfully received your resume and application. We appreciate the time and effort you put into your application.
    
    Our team is currently reviewing all submissions, and we will reach out to you if your qualifications match the requirements of the position. In the meantime, if you have any questions or need further assistance, please don't hesitate to contact us.
    
    Thank you once again for considering as a potential employer. We wish you the best of luck in your job search.
    
    Best regards,
    
  `,
  };
  try {
    const response = await transporter.sendMail(mailoptions);
    console.log("the mail sent successfully");
  } catch (err) {
    console.log("there was a error in sending mails" + err);
  }
  next();
};
export default mail;
