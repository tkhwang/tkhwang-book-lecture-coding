# 누구나 쉽게 SQL

[![img](https://image.aladin.co.kr/product/19415/10/cover200/k582635314_1.jpg)](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=194151006) <br />
[누구나 쉽게 SQL](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=194151006)

## Chapter 10. 서브 쿼리

#### 10.2 Scalar sub-query

```sql
SELECT
    a.emp_id
    , a.emp_name
    , a.gender
    , a.age
    , a.dept_id
    , (
        SELECT
        FROM dept_master b
        WHERE a.dept_id = b.dept_id
    ) AS dept_name
FROM emp_master a
```

#### 10.3 Inline View

FROM 절에 사용하는 sub-query

```sql
SELECT
    a.dept_id
    , a.dept_name
    , k.emp_id
    , k.emp_name
    , k.address
FROM
    dept_master a
    , (
        SELECT
            b.emp_id
            , b.emp_name
            , c.city || c.gu || c.address_name AS address
            , b.dept_id
        FROM
            emp_master b
            , address_master c
        WHERE
            b.address_id = c.address.id
    ) AS k
WHERE
    a.use_yn = 'Y' AND a.dept_id = k.dept_id
ORDER BY 1, 3
```

#### 10.4 nested sub-query

- where 절에 사용: 조건절의 일부로 사용
- 메인쿼리 테이블의 특정 컬럼 값과 비교한 값을 반환하는 용도로 사용

```sql
SELECT *
FROM dept_master a
WHERE a.dept_id = (
    SELECT b.dept_id
    FROM emp_master b
    WHERE b.emp_name = '세종대왕'
)
```

```sql
SELECT *
FROM dept_master a
WHERE a.dept_id = (
    SELECT b.dept_id
    FROM emp_master b
    WHERE b.age BETWEEN 40 AND 49
)
```

```sql
SELECT *
FROM emp_master a
WHERE (a.gender, a.age) IN (
    SELECT
        b.gender
        , b.age
    FROM
        emp_master b
        , address_master c
    WHERE b.address_id = c.address_id
        AND c.gu IN ('중구', '서대문구')
)
```
