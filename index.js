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
/*function findPokemonByName(name) {
  const data = db.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!data) {
    return null;
  }
  return data;
};

function getPokemonInformations(req, res) {
  const pokemon = req.body.conversation.memory.pokemon;
  const pokemonInfos = findPokemonByName(pokemon.value);

  if (!pokemonInfos) {
    res.json({
      replies: [
        { type: 'text', content: `I don't know a Pokémon called ${pokemon} :(` },
      ],
    });
  } else {
    res.json({
      replies: [
        { type: 'text', content: `🔎${pokemonInfos.name} infos` },
        { type: 'text', content: `Type(s): ${pokemonInfos.types.join(' and ')}` },
        { type: 'text', content: pokemonInfos.description },
        { type: 'picture', content: pokemonInfos.image },
      ],
    });
  }
}


function getPokemonEvolutions(req, res) {
  const pokemon = req.body.conversation.memory.pokemon;
  const pokemonInfos = findPokemonByName(pokemon.value);

  if (!pokemonInfos) {
    res.json({
      replies: [
        { type: 'text', content: `I don't know a Pokémon called ${pokemon} :(` },
      ],
    });
  } else if (pokemonInfos.evolutions.length === 1) {
    res.json({
      replies: [{ type: 'text', content: `${pokemonInfos.name} has no evolutions.` }],
    });
  } else {
    res.json({
      replies: [
        { type: 'text', content: `🔎${pokemonInfos.name} family` },
        {
          type: 'text',
          content: pokemonInfos.evolutions.map(formatEvolutionString).join('\n'),
        },
        {
          type: 'card',
          content: {
            title: 'See more about them',
            buttons: pokemonInfos.evolutions
              .filter(p => p.id !== pokemonInfos.id) // Remove initial pokemon from list
              .map(p => ({
                type: 'postback',
                title: p.name,
                value: `Tell me more about ${p.name}`,
              })),
          },
        },
      ],
    });
  }
}

function formatEvolutionString(evolution) {
  let base = `🔸 ${evolution.name}`;
  if (evolution.trigger === 'leveling') {
    base += ` -> lvl ${evolution.trigger_lvl}`;
  }
  if (evolution.trigger === 'item') {
    base += ` -> ${evolution.trigger_item}`;
  }
  return base;
}

*/

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
