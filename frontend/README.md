# frontend 초기 설정

Next,js 14 + Typescript

# Fetch API의 예시 코드

### GET

```
fetch(url, { cache: 'no-store' })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    // 데이터 처리
  })
  .catch(error => {
    // 오류 처리
  });
```

### POST

```
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  cache : 'no-store'
  body: JSON.stringify(data)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    // 응답 데이터 처리
  })
  .catch(error => {
    // 오류 처리
  });
```

### PUT

```
fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  cache : 'no-store'
  body: JSON.stringify(data)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    // 응답 데이터 처리
  })
  .catch(error => {
    // 오류 처리
  });
```

### DELETE

```
const url = 'https://api.example.com/resource/123'; // DELETE 요청을 보낼 대상 URL

fetch(url, {
  method: 'DELETE',
  cache : 'no-store'
})
  .then(response => {
    if (response.ok) {
      console.log('Resource deleted successfully.');
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => {
    // 오류 처리
    console.error('Error:', error);
  });
```
