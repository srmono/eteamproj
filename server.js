const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
const path = require('path');

const app = express();


//Connect Database
connectDB();

//Set cors
app.use(cors());

// Init Middleware
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(express.json());// User to parese JSON bodies

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

//Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))




