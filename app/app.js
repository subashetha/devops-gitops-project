const http = require('http');
const PORT = 3000;

http.createServer((req,res)=>{
  res.write("DevOps GitOps Pipeline Running");
  res.end();
}).listen(PORT);
