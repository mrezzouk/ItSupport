const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dB.json');
const app = express();
app.use(bodyParser.json());
// Load routes
app.post('/Identification', getIdentification);
//app.post('/pokemon-evolutions', getPokemonEvolutions);
app.post('/errors', function (req, res) {
  console.error(req.body);
  res.sendStatus(200);
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

// ====================================================================================================================///// Functions

function findUserInfo(userId) {
  const userInfo = db.find(p => p.ID.toLowerCase() === userId.toLowerCase());
  if (!userInfo) {
    return null;
  }
  return userInfo;
};

function getIdentification(req, res) {
  const userId = req.body.conversation.memory.userId;
  const userInfo = findUserInfo(userId.value);

  if (!userInfo) {
    res.json({
      replies: [
        { type: 'text', content: `I'm sorry I don't have a user in my database who's ID is  ${userId} :(` },
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
  }
}
