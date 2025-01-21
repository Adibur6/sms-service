export const sendEmail = (subject: string, body: string, recipient: string): string => {
    // Here you would add logic to send the email
    return `Email sent to ${recipient} with subject: ${subject} and body: ${body}`;
};