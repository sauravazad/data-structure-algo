// https://www.hackerearth.com/# search for bit manipulation

# Quick Hacks:
  - n & 1 = returns the least significant bit (0 or 1)
  - check odd / even n & 1 == 1 // odd n & 1 == 0 // even
  - 1 << n : set the nth bit as 1
  - get/check the ith bit is set on n :
    - (n >> i) & 1  (Move i'th bit to the end and perform & with 1)
  
  - set the ith bit is set on n :
    - n | (1 << i). (Set the ith bit on 1 and perform | with number)

  - Clear i'th Bit 
    - n & ~(1 << i) (set the ith bit on 1, then flip it so that the ith bit is zero and all other bit are 1 , now use & with n)

  - Flip ith bit
    - n ^ (1 << i) : (XOR : if the number are different set to 0 else 1)

  - Update the ith bit - user can send 1 or 0 
    - n & ~(1 << i) // clear the ith bit n | (valueFromUser << i)

    clear last n bits // 1111 << i ~= 1100 n & (-1 << i)

    clear bits in range (j, i) // 11110000000111 (j+1) (2**i-1) ~= (1 << i) - 1 n & ((-1 << (j + 1)) | ((1 << i) - 1))

    - Power of 2
    (n & (n - 1)) == 0



# Bitwise operators
- references:
- https://cp-algorithms.com/algebra/bit-manipulation.html#bit-operators
- https://lucasfcosta.com/2018/12/25/bitwise-operations.html


## &  : (AND)
- The bitwise AND operator compares each bit of its first operand with the corresponding bit of its second operand. If both bits are 1, the corresponding result bit is set to 1. Otherwise, the corresponding result bit is set to 0.

```
n         = 01011000
n-1       = 01010111
--------------------
n & (n-1) = 01010000
```

 

## |  : (OR)
 -  The bitwise inclusive OR operator compares each bit of its first operand with the corresponding bit of its second operand. If one of the two bits is 1, the corresponding result bit is set to 1. Otherwise, the corresponding result bit is set to 0.

```
n         = 01011000
n-1       = 01010111
--------------------
n | (n-1) = 01011111
```
 
## ^  : (XOR)
 - The bitwise exclusive OR (XOR) operator compares each bit of its first operand with the corresponding bit of its second operand. If one bit is 0 and the other bit is 1, the corresponding result bit is set to 1. Otherwise, the corresponding result bit is set to 0.

```
n         = 01011000
n-1       = 01010111
--------------------
n ^ (n-1) = 00001111
```

 
## !  : (NOT)
 -  The bitwise complement (NOT) operator flips each bit of a number, if a bit is set the operator will clear it, if it is cleared the operator sets it.

```
n         = 01011000
--------------------
~n        = 10100111
```

# Shift operators
There are two operators for shifting bits.

## >> (right shift)
 - Shifts a number to the right by removing the last few binary digits of the number.
 Each shift by one represents an integer division by 2, so a right shift by  k  represents an integer division by  2^k .
- eg:
 ```  5 >> 1 = 101 >> 1 = 010 = 1 which is the same as  
    5/2^2 = 5/4 = 1 . For a computer though shifting some bits is a lot faster than doing divisions.
 ```


## << (left shift)
 - Shifts a number to left by appending zero digits. In similar fashion to a right shift by  k ,
   a left shift by  k represents a multiplication by 2^k.
 -  eg:
 ```
   5 << 3 = 101 << 3 = 101000 = 40  which is the same as  5 *  2^3 = 5 * 8 = 40 .
 ```
 - *[NOTE:]*: Notice however that for a fixed-length integer that means dropping the most left digits,
 and if you shift too much you end up with the number  0 .

# Useful tricks for programming

## Set a Bit
-  1 << x  (x is a binary with only the  x -th bit set)
  ```4 & 1
  1<< 4 = 10000 = 16
  ```
- ~(1>>2) is a number with all bits set except the  x-th bit. (NOT in JS as it uses 2's complement )
  ```
  ~(1>>2) = 01111 = 15
  ```

##   When you subtract subtract -1 from a binary number , it will result in  flipping the lest significant bit ie: (right most bit that is set) and all bits after it will be now 1
 - n & (n-1)
  ```sh
  3     = 00000011
  (3-1) = 00000010
  3 & 2 = 00000001
  ```

## Brian Kernighan's algorithm (count number of bits set)

- The idea is to consider only the set bits of an integer by turning off its rightmost set bit (after counting it), so the next iteration of the loop considers the Next Rightmost bit.

```
int countSetBits(int n)
{
    int count = 0;
    while (n)
    {
        n = n & (n - 1);
        count++;
    }
    return count;
}

```