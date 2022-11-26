# Notes

## User model
- user_id
- firstname
- lastname
- middlename
- username
- email
- password
- profile image
- isVerified
- type (user | farmer | admin)

### Billing address
- country
- state
- city
- zip code
- address

### Delivery address
- country
- state
- city
- zip code
- address

## Store
- **user_id**
- store name
- store image
- description
- wallet id

### Products
- id
- name
- description
- quantity (unit | kg)
- cost
- price
- actual price - (price * (100% + markup%))
- *category id*
- *store id*
- status (pending verification | verified)

### Product images
- id
- product id
- url

### Category
- id
- name
- description
- *store id*

### Wallet
- id
- balance

### Wallet history
- id
- wallet id
- amount (order_row.price)
- order row id


## Order
- id
- *user id*
- comment
- total actual price
- total quantity
- status ( cart abandoned || pending | shipped | refunded | completed )

### Order row
- *product id*
- quantity
- price
- actual price
- total price
- *order id*
- *store id*

---

# Admins
- Priviledge ( manageUsers, Manage stores, Manage reports )
- Admin types ( store manager, account manager)

- Review product - update product




---
## Questions
- Products have multiple categories? 
- Store logic (seller or Store)? 

## To figure out
- Revenue sharing
- who's pocket the broker's money come from?
- business wallet 