# Learning SQL

[![img](https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81sE5LoP7vL._AC_UY436_FMwebp_QL65_.jpg)](https://www.amazon.com/Learning-SQL-Generate-Manipulate-Retrieve/dp/1492057614/ref=sr_1_1?keywords=learning+sql&sr=8-1) <br />
[Learning SQL](https://www.amazon.com/Learning-SQL-Generate-Manipulate-Retrieve/dp/1492057614/ref=sr_1_1?keywords=learning+sql&sr=8-1)

## Chapter 4. Filtering

#### `null`

- an expression can be `null`, but it can never equal `null`.
- two `null` s are never equal to each other.

## Chapter 5. Querying Multiple Tables

- join mental model : snowball rolling down a hill
  - The first two tables get the ball rolling, and each subsequent table gets tacked on to the snowball as it heads downhill.
  - Think of the snowball as `intermediate result set`
    which is picking up more and more columns as subsequent tables are joined.

## Chapter 9. Subqueries

#### `ALL`, `ANY` in multiple rows-single colmn subquery

```sql
SELECT
    account_id
    , cust_id
    , product_id
    , avail_balance
FROM account
WHERE avail_balance < ALL/ANY (
    SELECT
    FROM account a
    INNER JOIN individual i
    ON a.cust_id = i.cust_id
    WHERE i.fname = 'Frank' AND i.lname = 'Tucker'
)
```

### Correlated Subqueries

- subquery가 containing statement 와 연관됨.
- 각 row 마다 subquery 가 한 번씩 실행됨.

```sql
SELECT
    c.cust_id
    , c.cust_type_cd
    , c.city
FROM customer c
WHERE 2 = (
    SELECT COUNT(*)
    FROM account a
    WHERE a.cust_id = c.cust_id
)
```
