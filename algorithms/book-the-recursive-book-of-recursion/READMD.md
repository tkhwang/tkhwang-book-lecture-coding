# The recursive book of recursion

![img](https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRgGoYDRsJXoytnavqvdriskhmIzXVON5kNuzv1sOC-T56NE0qX) <br />
[The recursive book of recursion](https://www.amazon.com/Recursive-Book-Recursion-Interview-Javascript/dp/1718502028)

## Chapter03

- head-tail technique for implementing recursive function

## [1] Summing numbers in an array

```javascript
const sum = (nums) => {
  if (nums.length === 0) return 0;

  const head = nums[0];
  const tail = nums.slice(1);

  return head + sum(tail);
};

const nums = [1, 2, 3, 4, 5];

console.log(sum(nums)); // 15
```

## [2] Reversing a string

```javascript
const reverse = (str) => {
  if (str.length === 0 || str.length === 1) return str;

  const head = str.slice(0, 1);
  const tail = str.slice(1);

  return reverse(tail) + head;
};

const str = "abcdefghijklmnop";
console.log(reverse(str)); // ponmlkjihgfedcba
```

## [3] Detecting Palindromes

```javascript
const isPalindrome = (str) => {
  if (str.length === 0 || str.length === 1) return true;

  const head = str.slice(0, 1);
  const rest = str.slice(1, str.length - 1);
  const last = str.slice(str.length - 1);

  return head === last && isPalindrome(rest);
};

const str = "racecar";
console.log(isPalindrome(str));
```
