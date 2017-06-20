## Step 2

All Users:
```js
{
  users {
    id
    name
  }
}
```

Single User:
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

## Step 3

Single User with Pets Owned and Followed:

```js
query SingleUserWithPets($id: Int){
  user(id: $id) {
    id
    name
    email
    friends {
      name
    }
    pets_owned {
      name
      species
      breed
      total_followers
    }
    pets_followed {
      name
      species
      breed
    }
  }
}
```

Single Pet with Owners, Followers, and Total Followers:
```js
query SinglePetWithFollowers($id: Int){
  pet(id: $id) {
    id
    name
    owners {
      name
    }
    followers {
      name
    }
    total_followers
  }
}
```
