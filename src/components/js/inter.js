
// 获取用户输入的数据
export function getInput() {
    var input = document.getElementsByName("data").value;
    console.log("Input:");
    console.log(input);
    var maxIndex = Math.max.apply(null, nodesIndexValue);
    loadById(input, maxIndex, nodesIndexId); // 传入当前ID，当前ID的INDEX值，当前画布所有已加载的ID列表
}

// 判断值是否是整数
function isInteger(obj) {
    return obj % 1 == 0;
}

// 记录NODES的index值
var nodesIndexValue = [], mapNodes = new Map(), nodesIndexId = [];

export function recordNodesIndex(nodesArr) {
    var maxIndex = Math.max.apply(null, nodesIndexValue);
    if (!isInteger(maxIndex)) {
        maxIndex = 0;
    }
    console.log("MaxIndex:" + maxIndex);
    if ((maxIndex - 1) < 0) {
        maxIndex = 0;
    }
    var temp;
    for (var i = 0; i < nodesArr.length; i++) {
        if (maxIndex == 0) {
            temp = maxIndex + i;
        } else {
            temp = maxIndex + i + 1;
        }
        nodesIndexValue.push(temp);
        nodesIndexId.push(nodesArr[i].id);
        mapNodes.set(nodesArr[i].id, temp);
    }
}
