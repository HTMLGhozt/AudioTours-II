# AudioTours-II

AudioTours Server

## User Routes

| Route      | Description | Return
| :--------- | :---------- | :---
| `/user`    | [ POST ]    | Confirmation
| `/user:id` | [ GET ]     | JSON user Schema & JWT
| `/user:id` | [ PUT ]     | Confirmation

### User Schema

| Name           | Type                         | Required
| :------------- | :--------------------------- | :---
| username       | `String`                     | Yes
| password       | Hashed string                | No*
| purchasedTours | `Array` of [Tour Objects][1] | No
| createdTours   | `Array` of [Tour Objects][1] | No
| _createdAt     | `Date`                       | No
| _creator       | `Boolean`                    | No
[1]: #tours
*Will be rejected by middleware if empty.

## Tours

### Tour Routes

### Tour Schema

### Point Schema