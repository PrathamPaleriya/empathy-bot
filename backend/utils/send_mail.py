import smtplib
from email.message import EmailMessage

from utils.constants import SENDER_EMAIL
from utils.load_env import smtp_app_password
from utils.logger_config import logger


def send_mail(msg: EmailMessage, to: str):
    """Function to send a mail."""
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(SENDER_EMAIL, smtp_app_password)
            server.send_message(msg)

        logger.info(
            "Email sent successfully to:",
            extra={
                "to": to,
            }
        )
        
    except Exception as e:
        logger.error(
            "Error sending email",
            extra={
                "to": to,
                "error": str(e)
            }
        )
        raise e


def send_welcome_email(to: str):
    """Function to send a mail when user create a account."""
    subject = "Welcome to EmpathyBot! 🫂"

    plain_text_body = """
    Hey there 👋,

    Welcome to EmpathyBot — a tiny safe space on the internet I'm building with all heart and no filters.

    EmpathyBot is more than just a project — it's something I've poured my heart into because I know what it's like to need a friend, especially when life feels overwhelming.

    ✨ What you can expect:
    - zero judgment, always support
    - chats that feel like 3AM convos
    - a bot that remembers you, not just your words
    - Your conversations are safe — I don't store exact chat history, so feel free to speak your mind without any worries. 

    Thanks for showing up. Seriously.
    Let's build something beautiful together 🧡

    — Pratham
    Just a guy who wants tech to feel more human

    P.S. If anything feels off or you've got ideas — just reply to this email. I read everything.
    """ #noqa

    html_body = """
    <html lang="en" style="margin:0;padding:0;background-color:#fefefe;font-family:sans-serif;">
      <head>
        <meta charset="UTF-8" />
        <title>Welcome to EmpathyBot</title>
      </head>
      <body style="margin:0;padding:0;">
        <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#fefefe;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600px" style="background-color:#ffffff;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.05);padding:40px;">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <h1 style="font-size:28px;margin:0;color:#222;">Hey there 👋</h1>
                  </td>
                </tr>

                <tr>
                  <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:20px;">
                    Welcome to <strong>EmpathyBot</strong> — a tiny safe space on the internet I'm building with all heart and no filters.
                  </td>
                </tr>

                <tr>
                  <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:20px;">
                    This isn't a product made by a big team. It's a personal project I'm pouring my soul into — something real, something that <em>feels</em> like a friend who listens, remembers, and vibes with you.
                  </td>
                </tr>

                <tr>
                  <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:20px;">
                    ✨ <strong>What you can expect:</strong><br />
                    - zero judgment, always support<br />
                    - chats that feel like 3AM convos<br />
                    - a bot that remembers you, not just your words<br />
                    - Your conversations are safe — I don't store exact chat history, so feel free to speak your mind without any worries.
                  </td>
                </tr>

                <tr>
                  <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:28px;">
                    I know we're all figuring life out — so if EmpathyBot can even help a little, that's everything to me.
                  </td>
                </tr>

                <tr>
                  <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:40px;">
                    Thanks for showing up. Seriously.<br /><br />
                    Let's build something beautiful together 🧡<br /><br />
                    — Pratham<br />
                    <span style="font-size:14px;color:#777;">Just a guy who wants tech to feel more human</span>
                  </td>
                </tr>

                <tr>
                  <td style="font-size:14px;color:#aaa;border-top:1px solid #eee;padding-top:20px;">
                    P.S. If anything feels off or you've got ideas — just reply to this email. I read everything.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """  #noqa

    msg = EmailMessage()
    msg["From"] = SENDER_EMAIL
    msg["To"] = to
    msg["Subject"] = subject

    msg.set_content(plain_text_body)
    msg.add_alternative(html_body, subtype="html")

    send_mail(msg, to)



def send_delete_account_email(to: str):
    """Function to send a mail when user deletes a account."""
    subject = "Your EmpathyBot account has been deleted."

    plain_text_body = """
    Hey there,

    I noticed that you've decided to delete your EmpathyBot account, and while I completely respect your decision, I just want to take a moment to thank you for being a part of this journey.

    EmpathyBot was built with the intention of creating a space where you could feel heard, understood, and supported. If for any reason, it didn't meet your expectations or if you'd just like a break, I totally get it.

    That being said, if you ever decide to come back, I'll be here. And if you have any feedback or thoughts on how I can improve, I'd love to hear them. Your voice matters, even if you're not here right now.

    Take care, and remember, you're always welcome to return if you ever need that little bit of comfort again.

    Wishing you all the best 💛

    — Pratham
    Just a guy who wants tech to feel more human

    P.S. If there's anything I could do better, please feel free to reply to this email. I'm always listening. 
    """  #noqa

    html_body = """
    <html lang="en" style="margin:0;padding:0;background-color:#fefefe;font-family:sans-serif;">
    <head>
        <meta charset="UTF-8" />
        <title>Sorry to See You Go - EmpathyBot</title>
    </head>
    <body style="background-color:#fefefe;padding:40px 0;">
        <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
            <table width="100%" max-width="600px" style="background-color:#ffffff;border-radius:14px;box-shadow:0 4px 20px rgba(0,0,0,0.05);padding:40px;">
                <tr>
                <td align="center" style="padding-bottom:24px;">
                    <h1 style="font-size:28px;margin:0;color:#222;">We're sorry to see you go 😔</h1>
                </td>
                </tr>
                <tr>
                <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:20px;">
                    Hey there,  
                    <br />
                    I noticed that you've decided to delete your EmpathyBot account, and while I completely respect your decision, I just want to take a moment to thank you for being a part of this journey.
                </td>
                </tr>
                <tr>
                <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:20px;">
                    EmpathyBot was built with the intention of creating a space where you could feel heard, understood, and supported. If for any reason, it didn't meet your expectations or if you'd just like a break, I totally get it.
                </td>
                </tr>
                <tr>
                <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:20px;">
                    That being said, if you ever decide to come back, I'll be here. And if you have any feedback or thoughts on how I can improve, I'd love to hear them. Your voice matters, even if you're not here right now.
                </td>
                </tr>
                <tr>
                <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:28px;">
                    Take care, and remember, you're always welcome to return if you ever need that little bit of comfort again.
                </td>
                </tr>
                <tr>
                <td style="font-size:16px;line-height:1.7;color:#333;padding-bottom:40px;">
                    Wishing you all the best 💛<br /><br />
                    — Pratham<br />
                    <span style="font-size:14px;color:#777;">Just a guy who wants tech to feel more human</span>
                </td>
                </tr>
                <tr>
                <td style="font-size:14px;color:#aaa;border-top:1px solid #eee;padding-top:20px;">
                    P.S. If there's anything I could do better, please feel free to reply to this email. I'm always listening.
                </td>
                </tr>
            </table>
            </td>
        </tr>
        </table>
    </body>
    </html>
    """  #noqa

    msg = EmailMessage()
    msg["From"] = SENDER_EMAIL
    msg["To"] = to
    msg["Subject"] = subject

    msg.set_content(plain_text_body)
    msg.add_alternative(html_body, subtype="html")

    send_mail(msg, to)