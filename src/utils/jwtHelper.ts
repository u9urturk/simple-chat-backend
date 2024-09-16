import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

interface JWTPayload extends JwtPayload {
    uid: string;
}

class JWTService {
    private readonly secretKey: Secret;
    private readonly expiresIn: string | number;

    constructor(secretKey: Secret, expiresIn: string | number = '1h') {
        this.secretKey = secretKey
        this.expiresIn = expiresIn;
    }

    public generateToken(payload: JWTPayload): string {
        const token = jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn });
        return token;
    }

    public verifyToken(token: string): JWTPayload | null {
        try {
            const decoded = jwt.verify(token, this.secretKey) as JWTPayload;
            return decoded;
        } catch (error) {
            console.error('Token doğrulama hatası:', error);
            return null;
        }
    }

    public decodeToken(token: string): JWTPayload | null {
        try {
            const decoded = jwt.decode(token) as JWTPayload;
            return decoded;
        } catch (error) {
            console.error('Token çözme hatası:', error);
            return null;
        }
    }

    
}


export default JWTService;
