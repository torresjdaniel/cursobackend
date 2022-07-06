process.on('message', msg =>{
        const cant = msg;
        const numsRandom = {};
        if(cant != 'vacio'){
            for (let i = 0; i < cant ; i++) {
            let numRandom = getRandom(1,1001);
            numsRandom[numRandom] ? (numsRandom[numRandom] = numsRandom[numRandom] + 1) : (numsRandom[numRandom] = 1);
            }
            process.send(numsRandom);
        } else{
            for (let i = 0; i < 100000000 ; i++) {
            let numRandom = getRandom(1,1001);
            numsRandom[numRandom] ? (numsRandom[numRandom] = numsRandom[numRandom] + 1) : (numsRandom[numRandom] = 1);
            }
            process.send(numsRandom);
            }
})

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }