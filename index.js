const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var MongoClient = require("mongodb").MongoClient;
var MongoObjectID = require("mongodb").ObjectID;


//

app.use(bodyParser.json());
// Load routes
app.post('/Identification', getIdentification);
app.post('/Replacement', setReplacement);

app.post('/errors', function (req, res) {
  console.error(req.body);
  res.sendStatus(200);
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

// ====================================================================================================================///// Functions

function getIdentification(req, res) {
  const userId = req.body.conversation.memory.userId.value;
  const userToFind = userId.toUpperCase();
  const docToFind =  { ID: userToFind};
  MongoClient.connect('mongodb://mrezzouk:marsem1@ds243041.mlab.com:43041/tutoriel', function(error, db) {
      if (error) throw error;
      var collection = db.collection("customers");

      collection.findOne(docToFind, function(error, userInfo) {
          if (error) throw error;
          console.log("client connecte");
          if (!userInfo) {
            res.json({
              replies: [
                { type: 'text', content: `I'm sorry I don't have a user in my database who's ID is  ${userToFind} :(` },
              ],
            });
          } else {
            res.json({
              replies: [
                {
                  type: 'card',
                  content: {
                    title: `${userInfo.ID}`,
                    subtitle: 'User Information',
                    imageUrl: '',
                    buttons: [
                      {
                        title: `Name :${userInfo.name} ${userInfo.surname}`,
                        type: 'postback',
                        value:  ``,
                      },
                      {
                        title: `Num: ${userInfo.phoneNumber}`,
                        type: 'postback',
                        value:  ``,
                      }
                    ]
                  }
                },
                {
                  type: 'quickReplies',
                  content: {
                    title: 'Can you confirm the information above ?',
                    buttons: [
                      {
                        title: 'yes',
                        value: 'yes'
                      },
                      {
                        title: 'no',
                        value: 'no'
                      }
                    ]
                  }
                }
              ],
            });
          };
  });
  db.close();
  });
}

function setReplacement(req, res) {
  const damageValue = req.body.conversation.memory.number.scalar;
  const userId = req.body.conversation.memory.userId.value;
  const userToFind = userId.toUpperCase();
  const docToFind =  { ID: userToFind};
  const replies = [];

  MongoClient.connect('mongodb://mrezzouk:marsem1@ds243041.mlab.com:43041/tutoriel', function(error, db){
             if (error) throw error;
             var collection = db.collection("customers");
           if (damageValue > 2) {
             collection.findOne(docToFind, function(error, userInfo) {
                 if (error) throw error;
                 if (userInfo.phoneWarranty == "Y") {
                   res.json({
                             replies: [
                               {
                                 type: 'text',
                                 content: 'It seems to me that your screen needs to be replaced.'
                               },
                               {
                                 "type": "picture",
                                 "content": "https://i.imgur.com/vEY7Mwt.gif",
                               },
                               {
                                 type: 'text',
                                 content: 'Let me check if your phone is still under warranty.'
                               },
                               {
                                 type: 'text',
                                 content: '...'
                               },
                               {
                                 type: 'text',
                                 content: 'OK !! Our records show that your phone is still under warranty'
                               }
                  ]
                 });
                 }
             })
           }
         })
}
