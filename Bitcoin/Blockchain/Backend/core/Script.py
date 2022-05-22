from argparse import ArgumentDefaultsHelpFormatter

from Blockchain.Backend.util.util import encode_variant, int_to_little_endian
from Blockchain.Backend.core.EllepticCurve.op import OP_CODE_FUNCTION


class Script:
    def __init__(self, cmds = None):
        if cmds is None:
            self.cmds = []
        else:
            self.cmds = cmds

    def serialize(self):
        # initialize what we'll send back
        result = b''

        # go through each cmd
        for cmd in self.cmds:
            # if the cmd is an interger, it's an opcode
            if type(cmd) == int:
                # turn the cmd into a single byte integer using int_to_little_endian
                #result += into_to_little_endia(cmd, 1)
                result += int_to_little_endian(cmd, 1)
            else:
                # otherwise, this is an element. Get the length in butes
                length = len(cmd)

                # for large lengths, we have to use a pushdata opcode
                if length < 75:
                    # turn the length into a single byte integer
                    result += int_to_little_endian(length, 1)
                elif length > 75 and length < 0x100:
                    # 76 is pushdata1
                    result += int_to_little_endian(76, 1)
                    result += int_to_little_endian(length, 1)
                elif length >= 0x100 and length <= 520:
                    #77 is pushdata2
                    result += int_to_little_endian(77, 1)
                    result += int_to_little_endian(length, 2)
                else:
                    raise ValueError('cmd too long')
                
                result += cmd
            
            #get the length of everything
            total = len(result)

            # encode_variant the total length of the result and prepend
            return encode_variant(total) + result

    def evaluate(self, z):
        cmds = self.cmds[:]
        stack = []

        while len(cmds) > 0:
            cmd = cmds.pop(0)

            if type(cmd) == int:
                operation = OP_CODE_FUNCTION[cmd]

                if cmd == 172:
                    if not operation(stack, z):
                        print(F"Error in Signature Verification")
                        return False
                
                elif not operation(stack):
                        print(F"Error in Signature Verification")
                        return False 
            else:
                stack.append(cmd)
        return True

    @classmethod
    def p2pkh_script(cls, h160):
        """Takes a hash160 and returns the p2pkh (public key hash) ScriptPubkey"""
        return Script([0x76, 0xa9, h160, 0x88, 0xac])