

function setReplacement(req, res) {
  const damageValue = req.body.conversation.memory.number.scalar;
  const userId = req.body.conversation.memory.userId.value;
  const userToFind = userId.toUpperCase();
  const docToFind =  { ID: userToFind};
  const replies = [];

  MongoClient.connect('mongodb://localhost:27017/tutoriel', function(error, db){
             if (error) throw error;
             var collection = db.collection("customers");
             if (damageValue > 2) {
                replies.push({
                  type: 'text',
                  content: 'It seems to me that your screen needs to be replaced.'
                },
                {
                  type: 'text',
                  content: 'Let me check if your phone is still under warranty.'
                },
                {
                  type: 'text',
                  content: '...'
                });
                collection.findOne(docToFind, function(error, userInfo) {
                    if (error) throw error;
                    if (userInfo.phoneWarranty == "Y") {
                         replies.push({
                           type: 'text',
                           content: 'Our records show that your phone is still under warranty.'
                         });
                    }
                }
              )
              res.json({ replies : $replies});
           }
           }
    )
}
