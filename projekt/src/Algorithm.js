module.exports = {
  auth: function(token1, token2) {
    let mix = "";
    let flag = false;
    let mixNum = 3;

    for(let i = 0; i < token2.length; i++) {
      let char1 = token1.charAt(i);
      let char2 = token2.charAt(i);
      mix = mix + char1;
      mix = mix + char2;
      if(!flag) {
        let code1 = token1.charCodeAt(i);
        let code2 = token2.charCodeAt(i);
        if(code1 > 50 && code1 < 58) {
          mixNum = parseInt(char1);
          flag = true;
          continue;
        } else if(code2 > 50 && code1 < 58) {
          mixNum = parseInt(char2);
          flag = true;
        }
      }
    }

    let auth_token = "";
    let step = 0;
    let length = mix.length/2;

    for(let j = 0; j < length; j++) {
      step += mixNum;
      if(step >= length) {
        step -= length;
      }
      auth_token += mix.charAt(step);
    }

    return auth_token;
  }
};
