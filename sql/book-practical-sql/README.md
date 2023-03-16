# 실용 SQL

PostgreSQL로 시작하는 데이터 스토리텔링 가이드북

[![img](https://image.aladin.co.kr/product/30866/56/cover200/8931465955_1.jpg)](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=308665691)

[실용 SQL](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=308665691)

## Chapter 6 : SQL 사용한 기본 수학 및 통계

#### 백분위수 함수

```sql
percentile_cont(.X)
    WITHIN GROUP (ORDER BY column_name)
```

```sql
SELECT
    percentile_cont(.5)
    WITHIN GROUP (ORDER BY numbers),
    percentile_disc(.5)
    WITHIN GROUP (ORDER BY numbers)
FROM percentile_test;
```

## Chapter 7 : JOIN

#### JOIN (INNER JOIN)

- 양쪽 모두 포함된 경우에만 표시됨.
- `id` 가 양쪽 모두 표시됨.

```sql
SELECT *
FROM district_2020 AS d20
JOIN district_2035 AS d35
ON d20.id = d35.id
```

#### JOIN .. USING (id)

- `id` 가 공통으로 한 번 만 표시됨.

```sql
SELECT *
FROM district_2020 AS d20
JOIN district_2035 AS d35
USING (id)
```

#### `LEFT JOIN`, `RIGHT JOIN`

- 기본 한 쪽 테이블을 표시하고
- 상대편에 matching된 경우가 있는 경우에만 이를 표시

```sql
SELECT *
FROM district_2020 d20
LEFT JOIN district_2035 d35
USING (id);
```

#### `FULL OUTER JOIN`

#### `CROSS JOIN`

#### `ANTI JOIN` : `NULL` 사용하여 결측값이 있는 행 찾기

- 왼쪽 테이블 확인

```sql
SELECT *
FROM district_2020 d20
JOIN district_2035 d35
USING (id)
WHERE d35.id IS NULL;
```

- 오른쪽 테이블 확인

```sql
SELECT *
FROM district_2020 d20
RIGHT JOIN district_2035 d35
USING (id)
WHERE d20.id IS NULL;
```

#### 두 개 이상 테이블 JOIN

`district_2020` 테이블에

- `district_2020_enrollment` join
- `district_2020_grades` join

```sql
SELECT *
FROM district_2020 AS d20
JOIN district_2020_enrollment AS d20en
USING (id)
JOIN district_2020_grades AS d20gr
USING (id)
```

#### 집합 연산자

- `UNION`
  - `UNION ALL` : 중복 포함
- `INTERSECT`
- `EXCEPT`

## Chap 11. SQL 통계 함수

#### 순위

```sql
SELECT
    company
    , widget_output
    , rank() OVER (ORDER BY widget_output DESC)
    , dense_rank() OVER (ORDER BY widget_output DESC)
FROM widget_companies
```

```sql
SELECT
    category
    , store
    , unit_sales
    , rank() OVER (PARTITION BY category ORDER BY unit_sales DESC)
FROM store_sales
ORDER BY
    category
    , rank() OVER (PARTITION BY category ORDER BY unit_sales DESC)
```

#### 최근 12주 평균

```sql
OVER(ORDER BY year, month
     ROWS BETWEEN 11 PRECEDING 11 AND CURRENT ROWS)
```

```sql
SELECT year, month, citrus_export_value,
    round(
       avg(citrus_export_value)
            OVER(ORDER BY year, month
                 ROWS BETWEEN 11 PRECEDING AND CURRENT ROW), 0)
       AS twelve_month_avg
FROM us_exports
ORDER BY year, month;
```

## Chapter 13. 고급 쿼리 기술

#### Sub query : derived table

```sql
SELECT round(calcs.average, 0) as average
       , calcs.median
       , round(calcs.average - calcs.median, 0) AS median_average_diff
FROM (
     SELECT avg(pop_est_2019) AS average
            , percentile_cont(.5) WITHIN GROUP (ORDER BY pop_est_2019)::numeric AS median
     FROM us_counties_pop_est_2019
     )
AS calcs;
```

#### CTE (Common Table Expression)

`WITH ... AS`

```sql
WITH large_counties (country_name, state_name, pop_est_2019)
AS (
    SELECT
        county_name
        , state_name
        , pop_est_2019
    FROM us_counties_pop_est_2019
    WHERE pop_est_2019 >= 10000
)
SELECT
    state_name
    , count(*)
FROM large_counties
GROUP BY state_name
ORDER BY count(*) DESC;
```
