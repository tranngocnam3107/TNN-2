import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_xtyfmpi';
const PUBLIC_KEY = '0H7ZgRnEAWI0YjYC4';
const TEMPLATE_ID = 'template_lxfa848';

export async function sendEmail(templateParams) {
    return emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .catch((err) => {
            console.error("Can't send email!");
            console.error(err);
        });
}