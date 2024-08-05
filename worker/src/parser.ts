
export function parse(text: string, values: any, startDelimeter = "{", endDelimeter = "}") {
    // You received {comment.amount} momey from {comment.link}
    let startIndex = 0;
    let endIndex = 1;

    let finalString = "";
    while (endIndex < text.length) {
        if (text[startIndex] === startDelimeter) {
            let endPoint = startIndex + 2;
            while (text[endPoint] !== endDelimeter) {
                endPoint++;
            }
            // 
            let stringHoldingValue = text.slice(startIndex + 1, endPoint);
            const keys = stringHoldingValue.split(".");
            let localValues = {
                ...values
            }
            for (let i = 0; i < keys.length; i++) {
                if (typeof localValues === "string") {
                    localValues = JSON.parse(localValues);
                }
                localValues = localValues[keys[i]];
            }
            finalString += localValues;
            startIndex = endPoint + 1;
            endIndex = endPoint + 2;
        } else {
            finalString += text[startIndex];
            startIndex++;
            endIndex++;
        }
    }
    if (text[startIndex]) {
        finalString += text[startIndex]
    }
    return finalString;
}





// export function parse(text: string, startDelimeter = "{", endDelimeter = "}") {
//     // You received {comment.amount} money from {comment.link}
//   let firstIndex = text.indexOf(startDelimeter);
//   let lastIndex = text.indexOf(endDelimeter) + 1

//   let subStringArr = []
//   subStringArr.push(text.slice(firstIndex, lastIndex));
//   let newText = text.slice(lastIndex, text.length)
// while(true){
//   console.log(newText)
//   console.log("------")
//   firstIndex = newText.indexOf(startDelimeter);
//   lastIndex = newText.indexOf(endDelimeter) + 1;
//   subStringArr.push(newText.slice(firstIndex, lastIndex));
//   console.log(newText)
//   if(lastIndex == newText.lastIndexOf(endDelimeter)+1){
//     break;
//   }
//   newText = (newText.slice(lastIndex, newText.length))

// }
//   console.log(subStringArr)
// } 