## EXEMPLOS
 - localhost:4000/graphql
``` query{
  author(id: 12){
    name,
    books {
      title
      isbn
    }
  }
}
```
