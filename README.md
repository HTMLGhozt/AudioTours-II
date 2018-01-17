# AudioTours-II

<!-- 
***** ReadMe Notation *****

   - Anchor links are listed relative to the order anachors appear at the end of the document.
   - Offsite links are listed inline.

***** End ReadMe Notation *****
-->

## AudioTours Server

The backend server for the [audiotours frontend](https://github.com/HTMLGhozt/audiotours-frontend.git).

## Dependencies

- bcrypt: ^1.0.3
- body-parser: ^1.18.2
- chai: ^4.1.2
- cors: ^2.8.4
- express: ^4.16.2
- mocha: ^4.0.1
- mongoose: ^4.13.7
- sinon: ^4.1.

Before attempting to run this applicaiton install the dependencies with `npm i`.

## User

User is a
[Mongoose Schema](http://mongoosejs.com/docs/schematypes.html)
for a
[Mongo](https://docs.mongodb.com/manual/)
server.

### User Schema

| Name           | Type                         | Required
| :------------- | :--------------------------- | :---
| username*      | `String`                     | Yes
| password**     | Hashed `String`              | No
| purchasedTours | `Array` of [Tour Objects][] | No
| createdTours   | `Array` of [Tour Objects][] | No
| _createdAt     | `Date`                       | No
| _updatedAt     | `Date`                       | No
| _creator       | `Boolean`                    | No
***MUST** be unique.</br>
**will be rejected by middleware if empty.
See [[ POST ] `/new-user`][4].

### User Routes

| Route            | Description | Return
| :--------------- | :---------- | :---
| [`/new-user`][4] | [ POST ]    | Confirmation
| [`/user:id`][5]  | [ GET ]     | JSON user Schema & JWT
| [`/user:id`][6]  | [ PUT ]     | Confirmation

#### [[ POST ] `/new-user`](#post-new-user)

Posting to `/new-user` requires a `username` and `password`. The password is checked by middleware before the route hashes the password by
[bCrypt](https://www.npmjs.com/package/bcrypt/).

Returns a success message:

``` javascript
{
  "success": true,
  "message": "New user saved to User database.",
  "userId": Mongoose.Schema.ObjectId
}
```

#### [[ GET ] `/user:id`](#get-user-id)

Getting from `/user:id` takes no arguments and returns a modified object including
[`_id`](http://mongoosejs.com/docs/api.html#schema-objectid-js).

from the User document databse and a
[JSON Web Token](https://jwt.io/).

```javascript
{
  "_id": Mongoose.Schema.ObjectId,
  "username": String,
  "purchasedTours": [/* Tour Objects */],
  "createdTours": [/* Tour Objects */],
  "_creator": Boolean,
  "token": /* JWT */
}
```

#### [[ PUT ] `/user:id`](#put-user-id)

Putting to `/user:id` requres an update in one or more of the following fields (based on [User Schema][2]):

- purchasedTour
- createdTour
- password
- creator

Returns a success message:

``` javascript
{
  "success": true,
  "message": `Updated user with ${id}.`
}
```

---

## Tours

### Tour Routes

### Tour Schema

### Point Schema

<!-- ***** Links ***** -->
[1]: #user
[2]: #user-schema
[3]: #user-routes
[4]: #post-new-user
[5]: #get-user-id
[6]: #put-user-id