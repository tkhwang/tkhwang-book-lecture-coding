# Errors

## 프로젝트 환경설정

### JPA와 DB 설정, 동작확인

```
java.lang.IllegalStateException: Failed to load ApplicationContext
```

- H2 실행 여부
- H2 설정 확인할 것.
  - `src/resources/application.yml` 에 정의한 H2 설정 file path
  - 실제 H2 file path

```yml
spring:
  datasource:
    // OK
    url: jdbc:h2:tcp://localhost/~/jpashop

    // ERROR: 실제와 다른 H2 file path 설정한 경우의 위의 예와 같은 오류 발생
    url: jdbc:h2:tcp://localhost/~/h2/jpashop
```
