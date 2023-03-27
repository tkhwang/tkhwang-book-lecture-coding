# The recursive book of recursion

![img](https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRgGoYDRsJXoytnavqvdriskhmIzXVON5kNuzv1sOC-T56NE0qX) <br />
[The recursive book of recursion](https://www.amazon.com/Recursive-Book-Recursion-Interview-Javascript/dp/1718502028)

## Chapter03

## [1] Summing numbers in an array

- head-tail technique for implementing recursive function

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
