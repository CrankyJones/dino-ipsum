export class DinoIpsum{
  static getDinoIpsum(ps, ws){
    return new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      const url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1`
      request.onload = function(){
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}