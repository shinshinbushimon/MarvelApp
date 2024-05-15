import md5 from 'md5';
import crypto from 'crypto';

export const generateParam = () => {
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + privateKey + publicKey);
    return `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
}

export const generateSessionId = (username: string): string => {
    return crypto.createHash('sha256').update(username + Date.now().toString()).digest('hex');
}