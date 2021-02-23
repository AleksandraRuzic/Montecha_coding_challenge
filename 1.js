function calculateMeasure(num, measure) {
    let formatNum       = num % measure.size;
    let measureString   = 1 === formatNum ? measure.name : `${measure.name}s`;
    let biggerDimNum    = 0 === formatNum ? num / measure.size : (num - formatNum) / measure.size;
    return {"formatNum" : formatNum, "measure" : measureString, "biggerDimNum" : biggerDimNum}
}

function calculateMeasures(minDimNum, measures) {
   let output = [];
    for(i = 0; i < measures.length -1; i++) {
        let {formatNum, measure, biggerDimNum} = calculateMeasure(minDimNum, measures[i]);
        minDimNum = biggerDimNum;
        output.push({"formatNum" : formatNum, "measure" : measure});
    }
    let {measure, biggerDimNum} = calculateMeasure(minDimNum, measures[i]);
    output.push({"formatNum" : biggerDimNum, "measure" : measure});

    return output;

}

function toString(measures) {
    let output = "";
    let add = " and";
    measures = measures.filter((measure) => measure.formatNum > 0);
    for(i = 0; i < measures.length - 1; i++) {
        output = `${add} ${measures[i].formatNum} ${measures[i].measure}` + output;
        add = ',';
    }
    output = `${measures[i].formatNum}  ${measures[i].measure}` + output;
    return output;
}

function formatDuration(seconds) {

    const measures = [
        {name : "second", size : 60},
        {name : "minute", size : 60},
        {name : "hour", size : 24},
        {name: "day", size : 365},
        {name : "year", size : 1}
    ];
    
    return 0 === seconds ? "Now" : toString(calculateMeasures(seconds, measures));
}


console.log(formatDuration(1));
console.log(formatDuration(120));
console.log(formatDuration(126));
console.log(formatDuration(3600));
console.log(formatDuration(7226));
console.log(formatDuration(7320));
console.log(formatDuration(7266));
console.log(formatDuration(86400));
console.log(formatDuration(63072543));