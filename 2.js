const fs = require('fs');

try {
    const data = fs.readFileSync('matrix.txt', 'utf8');
    let matrix = data.split("\n").map((e) => e.split(""));
    let letterPositions = Array(26).fill([]);
    let letters = [];
    matrix.map((r, i) => {
        r.map((c, j) => {
            if(" " !== c) {
                letters.push(c);
                letterPositions[c.charCodeAt(0) -"a".charCodeAt(0)] = [i, j]
            }
        })
    });


    const connect = (a, b, direction) => {
        if("x" === direction) {
            let from = a.x > b.x ? b.x : a.x;
            let to = a.x > b.x ? a.x : b.x;
    
            for(k=from; k<=to; k++) {
                matrix[k][a.y] = "*";
            }
        }
        else if ("y" === direction) {
            let from = a.y > b.y ? b.y : a.y;
            let to = a.y > b.y ? a.y : b.y;

            for(k=from; k<=to; k++) {
                matrix[a.x][k] = "*";
            }
        }
        else {
            
            let fromY = a.y > b.y ? b.y : a.y;
            let toY = a.y > b.y ? a.y : b.y;
            let fromX = a.x > b.x ? b.x : a.x;
            let toX = a.x > b.x ? a.x : b.x;
    
            if(0 < (a.y - a.x) * (b.y - b.x)) {
                for(k=0; k<=toX - fromX; k++) {
                    matrix[fromX+k][fromY+k] = "*";
                }
            }
            else {
                for(k=0; k<=toX - fromX; k++) {
                    matrix[fromX+k][toY-k] = "*";
                }
            }
        }
    }

    for(i=0; i<letterPositions.length-1; i++){
        if(0 !== letterPositions[i].length && 0 !== letterPositions[i+1].length) {
            const deltaX = Math.abs(letterPositions[i][0] - letterPositions[i+1][0]);
            const deltaY = Math.abs(letterPositions[i][1] - letterPositions[i+1][1]);

            let dir;
            if(deltaX === deltaY) {
                dir = "d";
            }
            else if (0 === deltaX) {
                dir = "y";
            }
            else if (0 === deltaY) {
                dir = "x";
            }
            connect({x: letterPositions[i][0], y: letterPositions[i][1]},
                {x: letterPositions[i+1][0], y: letterPositions[i+1][1]},
                dir);
        }
    }

    console.log(matrix.map((e) => e.join("")).join("\n"));

} catch (err) {
  console.error(err)
}

