import CryptoJS from 'crypto-js';

export type HmacAlgo = 'SHA256' | 'SHA512' | 'SHA1' | 'MD5';

export function generateHmac(message: string, secret: string, algo: HmacAlgo): string {
    const algos: Record<HmacAlgo, (msg: string, key: string) => CryptoJS.lib.WordArray> = {
        SHA256: CryptoJS.HmacSHA256,
        SHA512: CryptoJS.HmacSHA512,
        SHA1: CryptoJS.HmacSHA1,
        MD5: CryptoJS.HmacMD5,
    };
    return algos[algo](message, secret).toString();
}
