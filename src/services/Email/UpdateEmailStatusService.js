var request = require ('http');
function changeEmailStatus(messageIDs) {
    data = {
      messageId: messageIDs,
      status: '1'
    }
    var payload = JSON.stringify(data)
    const req = request.request(
        {
          host: 'localhost',
          port: '8186',
          path: '/updateemailstatus',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        },
        response => {
          console.log(response.statusCode); // 200
        }
      );
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      }); 
      req.write(payload)
      req.end(); 
}

module.exports = { changeEmailStatus }