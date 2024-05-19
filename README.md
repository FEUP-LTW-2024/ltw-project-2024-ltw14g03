# QuickFlip

## Group ltw14g03

- Guilherme Guerra (up202205140) 35 %
- Rui Borges (up202207475) 35 %
- Tiago Pires (up202208910) 30 %

## Install Instructions

    git clone https://github.com/FEUP-LTW-2024/ltw-project-2024-ltw14g03.git
    git checkout final-delivery-v1
    sqlite database/database.db < database/script.sql
    php -S localhost:9000

## Screenshots

#### Main Page:
![Main Page](/screenshots/img1.png)
#### Browse Page:
![BrowsePage](/screenshots/img2.png)
#### Chat Room:
![Chat Room](/screenshots/img3.png)

## Implemented Features

**General**:

- [ ] Create a new account.
- [ ] Log in and out.
- [ ] Edit their profile, including their name, username, password, email and profile picture.

**Sellers**  are able to:

- [ ] Create new sell orders, providing details such as category, brand, model, size, condition and description, along with the name of the item and an image.
- [ ] Manage their sell orders.
- [ ] Respond to messages from buyers about their items and add further information if needed.
- [ ] Print shipping forms for items they have sold.

**Buyers**  are able to:

- [ ] Browse items using filters like category, brand, size, name and condition.
- [ ] Contact the sellers to ask questions or negotiate prices.
- [ ] Add items to a wishlist and/or shopping cart.
- [ ] Simulate checkout with their shopping cart.

**Admins**  are able to:

- [ ] Promote a user to admin status.
- [ ] Introduce new item categories, sizes, conditions, and other pertinent entities.
- [ ] Oversee and ensure the smooth operation of the entire system.

**Security**:
We have been careful with the following security aspects:

- [ ] **SQL injection**
- [ ] **Cross-Site Scripting (XSS)**
- [ ] **Cross-Site Request Forgery (CSRF)**

**Password Storage Mechanism**: hash_password & verify_password
