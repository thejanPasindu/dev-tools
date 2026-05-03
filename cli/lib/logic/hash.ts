import CryptoJS from 'crypto-js';

export interface Hashes {
    md5: string;
    sha1: string;
    sha256: string;
    sha512: string;
}

export function hashText(input: string): Hashes {
    return {
        md5: CryptoJS.MD5(input).toString(),
        sha1: CryptoJS.SHA1(input).toString(),
        sha256: CryptoJS.SHA256(input).toString(),
        sha512: CryptoJS.SHA512(input).toString(),
    };
}
