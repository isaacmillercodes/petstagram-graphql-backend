** Step 2

* All Users:
```js
{
  users {
    id
    name
  }
}
```

* Single User:
```js
{
  user(id: 2) {
    id
    name
    email
    friends {
      name
    }
  }
}
```

or

```js
query SingleUser($id: Int){
  user(id: $id) {
    id
    name
    email
    friends {
      name
    }
  }
}
```
