from Blockchain.Backend.util.util import hash256, int_to_little_endian, little_endian_to_int

class BlockHeader:
    def __init__(self, version, prevBlockHash, merkleRoot, timestamp, bits):
        self.version = version
        self.prevBlockHash = prevBlockHash
        self.merkleRoot = merkleRoot
        self.timestamp = timestamp
        self.bits = bits
        self.nonce = 0
        self.blockHash = ''

    def mine(self, target):
        self.blockHash = target + 1
        
        """while (self.blockHash[0:4]) != '0000':
            self.blockHash = hash256((str(self.version) + self.prevBlockHash + self.merkleRoot + str(self.timestamp) + self.bits + str(self.nonce)).encode()).hex()
        """
        while self.blockHash > target:
            self.blockHash = little_endian_to_int(hash256(int_to_little_endian(self.version, 4) + bytes.fromhex(self.prevBlockHash)[::-1] + int_to_little_endian(self.timestamp, 4)))

            self.nonce += 1
            print(f"Mining Started {self.nonce}", end = '\r')

        self.blockHash - int_to_little_endian(self.blockHash, 32).hex()[::-1] #convert bits to hex and then reverse([::-1]) it
        self.bits = self.bits.hex()
