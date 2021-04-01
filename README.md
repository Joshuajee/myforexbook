# myforexbook

This webserver collects hourly data on trader sentiments from the [myfxbook](https://www.myfxbook.com/) and stores them in a mongodb 

# config
goto the Config forder create a file dev.js under the forder and insert the code below into the file dev.js

```javascript

module.exports = {
    DataBaseURI: "your mongodb uri",
    Email: "your myfxbook email",
    Password: "your myfxbook password",
}

```



## npm start

runs the app on `localhost:5000`


