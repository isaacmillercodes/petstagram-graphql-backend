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

## Step 4

Get All Images of Pets:
```js
{
  pet_images {
    uploaded_at
    likes
    caption
    image_url
  }
}
```

Get a pet with its images:
```js
query SinglePetWithImages($id: Int){
  pet(id: $id) {
    id
    name
    images {
      uploaded_at
      likes
      image_url
      caption
    }
    total_followers
  }
}
```

Get a pet and an owner
```js
query SinglePetandSingleUser($pet_id: Int, $user_id: Int){
  pet(id: $pet_id) {
    id
    name
    images {
      uploaded_at
      likes
      image_url
      caption
    }
    total_followers
  }
  user(id: $user_id) {
    id
    name
    email
    profile_image {
      image_url
      caption
    }
  }
}
```

## Step 5

Add a single pet:
```js
mutation AddPet {
  addPet(
    name: "Sparky"
    species: "Fish"
    breed: "Goldfish"
    age: 0.5
  ) {
    id
    name
    species
    breed
    age
  }
}
```

Add two pets with aliases:
```js
mutation AddPet {
  addLucille: addPet(
    name: "Lucille"
    species: "Dog"
    breed: "Black Labrador"
    age: 10
  ) {
    id
    name
    species
    breed
    age
  }
  addBarry: addPet(
    name: "Barry"
    species: "Dog"
    breed: "Boston Terrier"
    age: 12
  ) {
    id
    name
    breed
    species
    breed
    age
  }
}
```
