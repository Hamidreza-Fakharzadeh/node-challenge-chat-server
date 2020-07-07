const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
let idGenerator = 0;

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.post("/messages", (request, response) => {
  request.body.from === "" || request.body.text === ""
  ? response.sendStatus(404).json({"message not send": true})
  : messages.push({
    id: idGenerator+=1,
    from: request.body.from,
    text: request.body.text
  })
  response.json({"message sending": true})
})
app.listen(process.env.PORT || 5000);
console.log("hi")

// app.listen(process.env.PORT);
