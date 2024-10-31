# SSR Auth flow using Appwrite node SDK

**(on the server)**
When a user logs in,

- The account is created and session is stored in cookie (securely) on in the browser. 
- user gets redirect to home page
- Any requests made, will need to have session cookie attached. Because only authenticated users with sessions can make requests to DB. 



## Additional Notes
- **Middleware.js** checks for auth user before routing to requested page
- **auth.js** contains methods 
    - **createSession** *(used in login page)*
        - creates account in appwrite from form data, that account returns a session which is stored in a cookie securly in the browser.
    - **getUser** *(used in middleware file)*
        - gets the session from cookie, then finds the user by that session. lastly, set and return user/session. 
    - **deleteSession** *(when user logs out)*
        - gets the session from cookie, delete that session from DB, then delete the session from cookie. 


