import sys
sys.path.append('/Users/USER/Documents/BCD/Bitcoin')
from Blockchain.Backend.core.EllepticCurve.EllepticCurve import Sha256Point
import secrets
from Blockchain.Backend.util.util import hash160, hash256
from Blockchain.Backend.core.database.database import AccountDB

class account:
    def createKeys(self):
        Gx = 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798
        Gy = 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8
        
        #Create an instance of SHA256Point
        G = Sha256Point(Gx, Gy)

        #Generate secure private key
        self.privateKey = secrets.randbits(256)
        #print(f"Private key is {privateKey}")
        
        """
         # Multiple private key with generator point
         # Returns x-coordinate and y-coordinate
        """
        unCompressedPublicKey = self.privateKey * G
        xpoint = unCompressedPublicKey.x
        ypoint = unCompressedPublicKey.y

        if ypoint.num % 2 == 0:
            compressedKey = b'\x02' + xpoint.num.to_bytes(32, 'big')    #checks for even number
        else:
            compressedKey = b'\x03' + xpoint.num.to_bytes(32, 'big')    #else, return odd

        hsh160 = hash160(compressedKey)

        """Prefix from Mainnet"""
        main_prefix = b'\x00'

        newAddr = main_prefix + hsh160

        """Checksum"""
        checksum = hash256(newAddr)[:4] # [:4] checks for the first four characters

        newAddr = newAddr + checksum
        BASE58_ALPHABET = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        
        """Counter to find leading zeros"""
        count = 0
        for c in newAddr:
            if c == 0:
                count += 1
            else:
                break
        
        """Convert to Numeric from bytes"""
        num = int.from_bytes(newAddr, 'big')
        prefix = '1' * count

        result = ''

        """BASE58 Encoding"""
        while num > 0:
            num ,  mod = divmod(num, 58)
            result = BASE58_ALPHABET[mod] + result

        self.PublicAddress = prefix + result

        print(f"Private Key is: {self.privateKey}")
        print(f"Public Key is: {self.PublicAddress}")

if __name__ =='__main__':
    acct = account()
    acct.createKeys()
    AccountDB().write([acct.__dict__])