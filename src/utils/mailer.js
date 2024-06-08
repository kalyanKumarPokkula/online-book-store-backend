const transporter = require("../config/emailConfig.js");

const sendEmail = async body => {
  const mailOptions = {
    from: "kalyanakhil22@gmail.com",
    to: body.email,
    subject: body.subject,
    html: `
            <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Book Purchase Confirmation</title>
                        <style>
                            /* CSS styles go here */
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f9f9f9;
                            }
                            
                            .container {
                                width: 600px;
                                margin: 40px auto;
                                padding: 20px;
                                background-color: #fff;
                                border: 1px solid #ddd;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            
                            .header {
                                background-color: #333;
                                color: #fff;
                                padding: 10px;
                                text-align: center;
                            }
                            
                            .header h1 {
                                margin: 0;
                            }
                            
                            .content {
                                padding: 20px;
                            }
                            
                            .order-details {
                                margin-bottom: 20px;
                            }
                            
                            .order-details dt {
                                font-weight: bold;
                                margin-bottom: 10px;
                            }
                            
                            .order-details dd {
                                margin-bottom: 10px;
                            }
                            
                            .next-steps {
                                margin-bottom: 20px;
                            }
                            
                            .next-steps p {
                                margin-bottom: 10px;
                            }
                            
                            .thank-you {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            
                            .thank-you p {
                                margin-bottom: 10px;
                            }
                            
                            .footer {
                                background-color: #333;
                                color: #fff;
                                padding: 10px;
                                text-align: center;
                                clear: both;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Book Purchase Confirmation</h1>
                            </div>
                            <div class="content">
                                <h2>Dear ${body.name},</h2>
                                <p>Thank you for purchasing ${body.title} from our online bookstore! We are thrilled that you have chosen to read this amazing book.</p>
                                <div class="order-details">
                                    <dl>
                                        <dt>Order ID:</dt>
                                        <dd>${body.orderId}</dd>
                                        <dt>Book Title:</dt>
                                        <dd>${body.title}</dd>
                                        <dt>Price:</dt>
                                        <dd>${body.price}</dd>
                                        <dt>Purchase Date:</dt>
                                        <dd>${body.purchaseDate}</dd>
                                    </dl>
                                </div>
                                <div class="next-steps">
                                    <p>Your book will be shipped to you within the next 3-5 business days. You will receive a separate email with tracking information once your book is shipped.</p>
                                    <p>If you have any questions or concerns about your order, please don't hesitate to reach out to us at <a href="mailto:support@bookstore.com">support@bookstore.com</a>.</p>
                                </div>
                                <div class="thank-you">
                                    <p>Thank you again for choosing our bookstore. We hope you enjoy reading your new book!</p>
                                </div>
                            </div>
                            <div class="footer">
                                <p>&copy; 2023 Bookstore.com</p>
                            </div>
                        </div>
                    </body>
                    </html>`,
  };
  const mailResponse = await transporter.sendMail(mailOptions);
  console.log(mailResponse);

  return mailResponse;
};

module.exports = sendEmail;
