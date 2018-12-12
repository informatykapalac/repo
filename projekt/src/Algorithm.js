module.exports = {
  auth: function(token1, token2) {
    let mix = "";
    let flag = false;
    let mixNum = 3;

    for(let i = 0; i < token2.length; i++) { // tworzenie mix'a dwóch kluczy
      let char1 = token1.charAt(i);
      let char2 = token2.charAt(i);
      mix = mix + char1;
      mix = mix + char2;
      if(!flag) { // szukanie flagi
        let code2 = token2.charCodeAt(i);
        if(code2 > 50 && code2 < 58) { // wyłączność dla uuid.v4
          mixNum = parseInt(char1);
          flag = true;
        }
      }
    }

    let auth_token = "";
    let step = 0;
    let length = mix.length/2;

    for(let j = 0; j < length; j++) {
      step += mixNum; // kolejny char mix'u
      if(step >= length) { // jeśli przekroczymy długość mix'a
        step -= length;
      }
      auth_token += mix.charAt(step);
    }

    return auth_token; // token autoryzacyjny
  }
};
