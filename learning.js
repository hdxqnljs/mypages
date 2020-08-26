// 求字符串中最长的无重复的子串
// function test(str) {
//    let start = 0;
//    let tempHash = {};
//    let result = '';
//    for (let j = 0; j < str.length; j++) {
//        if (!tempHash[str[j]]) {
//            tempHash[str[j]] = 1;
//            continue;
//        }
//        tempHash[str[j]] += 1;
//        if (j - start > result.length) {
//            result = str.slice(start, j);
//        }
//        while(tempHash[str[j]] > 1) {
//            tempHash[str[start]] -= 1;
//            start++;
//        }
//    }
//    if (str.length - start - 1 > result.length) {
//        result = str.slice(start);
//    }
//    console.log(result, result.length, tempHash, '===========');
// }

// test('abcbadab');

// 求字符串T中包含字符串S中所有字母的子串，求这些子串中最短的
// function test(strT, strS) {
//    let start = 0;
//    let tHash = {};
//    let sHash = {};
//    let result = '';
//    for (let i = 0; i < strS.length; i++) {
//        sHash[strS[i]] = sHash[strS[i]] ? sHash[strS[i]] + 1 : 1;
//    }
//    for (let j = 0; j < strT.length; j++) {
//        if (strS.indexOf(strT[j]) < 0) { continue; }
//        tHash[strT[j]] = tHash[strT[j]] ? tHash[strT[j]] + 1 : 1;
//        if (tHash[strT[j]] <= sHash[strT[j]]) { continue; }
//        while (start < j) {
//            if (strS.indexOf(strT[start]) < 0) {
//                start++;
//                continue;
//            }
//            if (tHash[strT[j]] <= sHash[strT[j]]) {
//                if (!Object.keys(sHash).some((k) => !tHash[k] || tHash[k] < sHash[k])) {
//                    result = result && strT.slice(start, j + 1).length >= result ? result : strT.slice(start, j + 1);
//                }
//                break;
//            }
//            tHash[strT[j]] -= 1;
//            start++;
//        }
//    }
//    if (!Object.keys(sHash).some((k) => !tHash[k] || tHash[k] < sHash[k])) {
//        result = result && strT.slice(start, strT.length).length >= result ? result : strT.slice(start, strT.length);
//    }
//    console.log(result, '========');
// }

// test('ADOBECODEBANC', 'ABC');


// 寻找将字符串beginWord转换为endWord的最小步数
// 1.每次变换只能变换一个字符
// 2.每次变化只能变换成存在于wordList集合中的字符串
// function test(beginWord, endWord, wordList) {
//     const newWordList = wordList.indexOf(beginWord) >= 0 ?  wordList.slice() : [beginWord].concat(wordList);
//     const pathObj = newWordList.reduce((total, item) => {
//         total[item] = newWordList.filter((v) => {
//             let result = 0;
//             for (let i = 0; i < v.length; i++) {
//                 if (item.indexOf(v[i]) >= 0) { continue; }
//                 result++;
//             }
//             return result === 1;
//         });
//         return total;
//     }, {});
//     const wordQueune = [{ value: beginWord, path: 0 }];
//     let tempArr = [];
//     let pointer = 0;
//     console.log(pathObj);
//     while(wordQueune.length < newWordList.length) {
//         tempArr = pathObj[wordQueune[pointer].value].filter((v) => !wordQueune.some(({ value }) => value === v));
//         for (let j = 0; j < tempArr.length; j++) {
//             wordQueune.push({
//                 value: tempArr[j],
//                 path: wordQueune[pointer].path + 1
//             });
//             if (tempArr[j] === endWord) { break; }
//         }
//         if (wordQueune[wordQueune.length - 1].value === endWord) { break; }
//         pointer++;
//     }
//     console.log(wordQueune);
//     if (wordQueune[wordQueune.length - 1].value === endWord) {
//         console.log(`need ${wordQueune[wordQueune.length - 1].path} steps to transfer ${beginWord} to ${endWord}`);
//     } else {
//         console.log('fail =========');
//     }
// }

// test('hit', 'cog', ['hot', 'dot', 'lot', 'dog', 'log', 'cog']);

// 求使用纸币集合coins，凑出金额sum的最小张数
// function test(coins, sum) {
//    const dp = { '0': 0 };
//    let tempArr = [];
//    for (let i = 0; i < coins.length; i++) {
//        dp[coins[i]] = 1;
//    }
//    for (let j = 1; j <= sum; j++) {
//        if (typeof dp[j] != 'undefined') { continue; }
//        tempArr = coins.filter((v) => j - v >= 0)
//            .map((v) => dp[j - v]);
//        dp[j] = Math.min.apply(null, tempArr) + 1;
//    }
//    console.log(dp[sum]);
// }

// test([1,2,5,7,10], 14);

// 求三角形从顶点下到底部的最小路径和
// function test(triangle) {
//   const dp = {};
//   let tempArr = triangle[triangle.length - 1];
//   for (let n = 0; n < tempArr.length; n++) {
//     dp[`${triangle.length - 1}-${n}`] = tempArr[n];
//   }
//   for (let i = triangle.length - 2; i >= 0; i--) {
//     for (let j = 0; j < triangle[i].length; j++) {
//       tempArr = [j - 1, j, j + 1].filter((v) => v >= 0)
//         .map((y) => dp[`${i + 1}-${y}`]);
//       dp[`${i}-${j}`] = triangle[i][j] + Math.min.apply(null, tempArr);
//     }
//   }
//   console.log(dp, dp['0-0']);
// }

// test([
//   [2],
//   [3,4],
//   [6,5,7],
//   [4,1,8,3]
// ]);

// 求无序数组中，最长的递增子序列的长度
// function test(nums) {
//   let result = nums.slice(0, 1);
//   const dp = [result];
//   for(let i = 1; i < nums.length; i++) {
//     dp[i] = dp.slice(0, i)
//       .filter((value, index) => nums[index] < nums[i])
//       .reduce((total, item) => item.length > total.length ? item : total, [])
//       .concat(nums[i]);
//     if (dp[i].length > result.length) {
//       result = dp[i];
//     }
//   }
//   console.log(result, dp);
// }

// test([1,3,2,3,1,4]);

// 求使用硬币组合coins凑出金额amount的所有办法数量
// function test(amount, coins) {
//   dp = [[1].concat(new Array(amount).fill(0))];
//   for(let j = 1; j <= coins.length; j++) {
//       dp[j] = [];
//       for (let i = 0; i <= amount; i++) {
//         if (i < coins[j - 1]) {
//           dp[j][i] = dp[j - 1][i];
//         } else {
//           console.log()
//           dp[j][i] = dp[j - 1][i] + dp[j][i - coins[j - 1]];
//         }
//       }
//   }
//   console.log(dp[coins.length][amount], dp);
// };

// test(5, [1, 2, 5]);

// 求数组nums能不能分成总和相等的两个子集，例如[1,5,5] 和 [11]
// function test(nums) {
//   const dp = {};
//   const avarage = nums.reduce((total, item) =>  total + item, 0);
//   if (avarage % 2 !== 0) { return false; }
//   let sum = 0;
//   for (let i = 0; i <= avarage / 2; i++) {
//     dp[`0-${i}`] = i <= 0;
//   }
//   for (let j = 1; j <= nums.length; j++) {
//     sum += nums[j - 1];
//     for (let n = 0; n <= Math.min(sum, avarage / 2); n++) {
//       if (dp[`${j - 1}-${n}`]) {
//         dp[`${j}-${n}`] = true;
//         continue;
//       }
//       if (dp[`${j - 1}-${n - nums[j - 1]}`]) {
//         dp[`${j}-${n}`] = true;
//         continue;
//       }
//       dp[`${j}-${n}`] = false;
//     }
//   }

//   console.log(dp[`${nums.length}-${avarage / 2}`], dp);
// }

// test([1, 5, 11, 5]);

// 求数组nums是否能凑出一个正方形，要求每个元素必须用到
// function test(nums) {
//   if (nums.length < 4) { return console.log('false'); }
//   const sum = nums.reduce((total, item) => total + item, 0);
//   if (sum % 4 !== 0) { return console.log('false'); }
//   const bucket = [0, 0, 0, 0];
//   const tempNums = nums.sort((a, b) => b - a);
//   function putIntoBucket(index, numsArr, bucketArg, totalSum) {
//     if (index >= numsArr.length) {
//       return !bucketArg.some((v) => v !== totalSum / 4);
//     }
//     for (let i = 0; i < 4; i++) {
//       if (bucketArg[i] + numsArr[index] > totalSum / 4) { continue; }
//       bucketArg[i] += numsArr[index];
//       if (putIntoBucket(index + 1, numsArr, bucketArg, totalSum)) {
//         return true;
//       }
//        bucketArg[i] -= numsArr[index];
//     }
//     return false;
//   }
//   const result = putIntoBucket(0, tempNums, bucket, sum);
//   if (result) {
//     console.log('true');
//   } else {
//     console.log('false');
//   }
// }

// test([1,1,2,4,3,2,3]);

// 求数组nums的全排列
// function test(nums) {
//   const result = [];
//   function insertNum(tempArr, numArr, maxLen, resultArr) {
//     if (tempArr.length >= maxLen) {
//       return resultArr.push(tempArr);
//     }
//     for (let i = 0; i < numArr.length; i++) {
//       insertNum(tempArr.concat(numArr[i]), numArr.filter((value, index) => index !== i), maxLen, resultArr);
//     }
//   }
//   insertNum([], nums, nums.length, result);
//   console.log(result);
// };
// test([1, 2, 3]);

// 求数组nums的不重复的全排列
// function test(nums) {
//   const result = [];
//   function insertNum(tempArr, numArr, maxLen, resultArr) {
//     if (tempArr.length >= maxLen) {
//       return resultArr.push(tempArr);
//     }
//     for (let i = 0; i < numArr.length; i++) {
//       if (numArr.slice(0, i).some((value) => value === numArr[i])) { continue; }
//       insertNum(tempArr.concat(numArr[i]), numArr.filter((value, index) => index !== i), maxLen, resultArr);
//     }
//   }
//   insertNum([], nums, nums.length, result);
//   console.log(result);
// };
// test([3,3,0,3]);

// 求元素中和为target的两个元素
// function test(nums, target) {
//     const tempObj = {};
//     let temp = 0;
//     for (let i = 0; i < nums.length; i ++) {
//         temp = target - nums[i];
//         if (typeof tempObj[temp] !== 'undefined') {
//             return console.log([tempObj[temp], i]);
//         }
//         tempObj[nums[i]] = i;
//     }
//     console.log(tempObj, []);
// };

// test([-3,4,3,90], 0);

// 求数组array中的最小区间[left, right]，使得该区间排序后，整个数组就是有序数组了
// function test(array) {
//   let min = Number.MAX_SAFE_INTEGER;
//   let max = Number.MIN_SAFE_INTEGER;
//   let left = -1;
//   let right = -1;
//   for (let i = 0; i < array.length; i++) {
//       if (array[array.length - 1 - i] < min) {
//           min = array[array.length - 1 - i];
//       }
//       if (array[i] > max) {
//           max = array[i];
//       }
//       if (array[array.length - 1 - i] > min) {
//           left = array.length - 1 - i;
//       }
//       if (array[i] < max) {
//           right = i;
//       }
//   }
//   console.log([left, right]);
//   return [left, right];
// }

// test([1,2,4,7,10,11,7,12,6,7,16,18,19]);

// function isString(s) {
//     return Number.isNaN(Number.parseInt(s));
// }

// var findLongestSubarray = function(array) {
//     const hash = {};
//     const diffArr = [isString(array[0]) ? 1 : -1];
//     let result = [];
//     for (let i = 1; i < array.length; i++) {
//         diffArr.push(isString(array[i]) ? diffArr[i - 1] + 1 : diffArr[i - 1] - 1);
//         if (typeof hash[diffArr[diffArr.length - 1]] === 'undefined') {
//             hash[diffArr[diffArr.length - 1]] = i;
//         }
//     }
//     console.log(hash, diffArr);
//     for (let j = diffArr.length - 1; j >= 0; j--) {
//         if (diffArr[j] === 0 && j + 1 > result.length) {
//           result = array.slice(0, j + 1);
//           continue;
//         }
//         if (typeof hash[diffArr[j]] === 'undefined' || hash[diffArr[j]] >= j) {
//             continue;
//         } 
//         if (j - hash[diffArr[j]] > result.length) {
//           result = array.slice(hash[diffArr[j]] + 1, j + 1);
//         }
//     }
//     console.log(result);
//     return result;
// };

// findLongestSubarray(["42","10","O","t","y","p","g","B","96","H","5","v","P","52","25","96","b","L","Y","z","d","52","3","v","71","J","A","0","v","51","E","k","H","96","21","W","59","I","V","s","59","w","X","33","29","H","32","51","f","i","58","56","66","90","F","10","93","53","85","28","78","d","67","81","T","K","S","l","L","Z","j","5","R","b","44","R","h","B","30","63","z","75","60","m","61","a","5","S","Z","D","2","A","W","k","84","44","96","96","y","M"]);

// function helpSort(arr1, arr2) {
//   const result1 = [arr1[0]];
//   const result2 = [arr2[0]];
//   for(let i = 1; i < arr1.length; i++) {
//     for(let j = 0; j < result1.length; j++) {
//       if (arr1[i] > result1[j]) {
//         result1.splice(j, 0, arr1[i]);
//         result2.splice(j, 0, arr2[i]);
//         break;
//       }
//       if (j === result1.length - 1) {
//         result1.push(arr1[i]);
//         result2.push(arr2[i]);
//         break;
//       }
//     }
//   }
//   return [result1, result2];
// }

// function helpSort(arr1, arr2) {
//   const result1 = [];

// }

// var bestSeqAtIndex = function(height, weight) {
//   const [sortedHeight, sortedWeight] = helpSort(height, weight);
//   console.log(sortedHeight, sortedWeight);
//   const dp = [[sortedWeight[0]]];
//   for (let i = 1; i < sortedWeight.length; i++) {
//     dp[i] = dp.slice(0, i)
//       .filter((value, index) => sortedWeight[index] > sortedWeight[i])
//       .reduce((total, item) => item.length > total.length ? item : total , [])
//       .concat(sortedWeight[i]);
//   }
//   return dp.reduce((total, item) => item.length > total ? item.length : total ,0);
// };
// bestSeqAtIndex([5401,9628,3367,6600,6983,7853,5715,2654,4453,8619],
// [3614,1553,2731,7894,8689,182,7632,4465,8932,4304]);

// 寻找两个字符串的最长公共子序列的长度
// function test(str1, str2) {
//   const dp = [new Array(str1.length).fill(0)];
//   for (let i = 1; i <= str2.length; i++) {
//     dp[i] = [0];
//     for(let j = 1; j < str1.length; j++) {
//       if (str2[i - 1] === str1[j - 1]) {
//         dp[i][j] = (dp[i - 1][j - 1] || 0) + 1;
//       } else {
//         dp[i][j] = Math.max(dp[i][j - 1] || 0, dp[i - 1][j]);
//       }
//     }
//   }
//   console.log(dp[str2.length - 1][str1.length - 1]);
// }

// test('didactical', 'advantage');

// 两个无重复数组nums1和nums2，其中nums1是nums2的子集，求nums1中每个元素在nums2中比它大的第一个元素
// 利用单调栈求出nums2中所有元素的第一个比自身大的元素，记录为hash表，然后给出nums1的map结果
//   function test(nums1, nums2) {
//     const hash = {};
//     const stack = [];
//     for (let i =0; i < nums2.length; i++) {
//         if (stack.length <=0) {
//             stack.push(nums2[i]);
//             continue;
//         }
//         if (nums2[i] < stack[stack.length - 1]) {
//             stack.push(nums2[i]);
//             continue;
//         }
//         while(nums2[i] > stack[stack.length - 1]) {
//             let temp = stack.pop();
//             hash[temp] = nums2[i];
//             if (stack.length <= 0) { break; }
//         }
//         stack.push(nums2[i]);
//     }
//     while(stack.length > 0) {
//         hash[stack.pop()] = -1;
//     }
//     return console.log(nums1.map((v) => hash[v]));
// };

// test([4, 1, 2], [1, 3, 4, 2]);

// 经过优化的冒泡排序，如果某一次冒泡过程中，没有发生元素交换，则证明子序列已经有序，无需继续进行冒泡
// function test(array) {
//   let hasSwap = false;
//   const tempArr = array.slice();
//   let tempSwap = null;
//   for (let i = tempArr.length - 1; i >= 1; i--) {
//     hasSwap = false;
//     for (let j = 0; j < i; j++) {
//       if (tempArr[j] > tempArr[j + 1]) {
//         tempSwap = tempArr[j + 1];
//         tempArr[j + 1] = tempArr[j];
//         tempArr[j] = tempSwap;
//         hasSwap = true;
//       }
//     }
//     if (!hasSwap) {
//       break;
//     }
//   }
//   console.log(tempArr);
// }

// test([1,2,4,7,10,11,7,12,6,7,16,18,19]);

// 再次经过优化的冒泡排序，每次冒泡找出最后一次交换位置的元素的位置，说明该位置之后的区间已经不用再交换了
// 下次冒泡就从开头到上次的最后位置区间，进行冒泡排序
// function test(array) {
//   let last = array.length - 1;
//   const tempArr = array.slice();
//   let tempSwap = null;
//   let i = last;
//   while(i >= 1) {
//     last = 0;
//     for (let j = 0; j < i; j++) {
//       if (tempArr[j] > tempArr[j + 1]) {
//         tempSwap = tempArr[j + 1];
//         tempArr[j + 1] = tempArr[j];
//         tempArr[j] = tempSwap;
//         last = j;
//       }
//     }
//     i = last;
//   }
//   console.log(tempArr);
// }

// test([1,2,4,7,10,11,7,12,6,7,16,18,19]);


// 归并排序，使用test函数将数组不断一分为二，直到长度小于等于1时返回数组
// 然后借助helpMerge函数合并两个子数组，变成一个有序的更大的数组，直到合并为原始数组大小的数组
// function helpMerge(arr1, arr2) {
//   let result = [];
//   let i = 0;
//   let j = 0;
//   for (let i = 0, j = 0; i <= arr1.length || j <= arr2.length;) {
//     if (i === arr1.length) {
//       result = result.concat(arr2.slice(j));
//       break;
//     }
//     if (j === arr2.length) {
//       result = result.concat(arr1.slice(i));
//       break;
//     }
//     if (arr1[i] < arr2[j]) {
//       result.push(arr1[i]);
//       i++;
//     } else {
//       result.push(arr2[j]);
//       j++;
//     }
//   }
//   return result;
//   console.log(result);
// }

// function test(array) {
//   if (array.length <= 1) { return array; }
//   const mid = Math.floor(array.length / 2);
//   return helpMerge(test(array.slice(0, mid)), test(array.slice(mid)));
// }

// console.log(test([1,2,4,7,10,11,7,12,6,7,16,18,19]));

// 选择排序，每次选择剩余数组中最大的元素，插入到结果数组的头部
// 与冒泡排序时间复杂度相同，但是每一轮的交换次数只有一次，相较而言有很大优化
// function test(array) {
//   const result = [];
//   const tempArr = array.slice();
//   while(tempArr.length > 0) {
//     let index = 0;
//     for (let i = 1; i < tempArr.length; i++) {
//       if (tempArr[i] > tempArr[index]) {
//         index = i;
//       }
//     }
//     result.unshift(tempArr.splice(index, 1)[0]);
//   }
//   console.log(result);
// }

// test([1,2,4,7,10,11,7,12,6,7,16,18,19]);

// 插入排序，遍历原始数组中的每一项，在结果数组中找到该项要插入的位置
// function test(array) {
//   const result = [array[0]];
//   for (let i = 1; i < array.length; i++) {
//     let index = 0;
//     while(index < result.length) {
//       if (result[index] >= array[i]) { break; }
//       index++;
//     }
//     result.splice(index, 0, array[i]);
//   }
//   console.log(result);
// }

// test([1,2,4,7,10,11,7,12,6,7,16,18,19]);


// 树的各种遍历用假数据
const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: {
        value: 7,
        left: { value: 10 },
        right: { value: 11 }
      },
      right: {
        value: 8,
        left: { value: 12 }
      }
    },
    right: {
      value: 5,
      right: { value: 9 }
    }
  },
  right: {
    value: 3,
    left: {
      value: 6
    }
  }
};

// 树结构的先序遍历，每次访问栈顶元素，将它的右孩子先压入栈，再将左孩子压入栈
// function test(treeObj) {
//   const stack = [treeObj];
//   const result = [];
//   while(stack.length > 0) {
//     let temp = stack.pop();
//     console.log(temp.value, '===');
//     result.push(temp.value);
//     if (temp.right) {
//       stack.push(temp.right);
//     }
//     if (temp.left) {
//       stack.push(temp.left);
//     } 
//   }
//   console.log('先序遍历后的结果数组为： ', result);
// }

// 树的先序遍历方法2，使用辅助函数visitLeft一路访问左孩子到底部，每一次将节点的右子树压入栈中
// 当visitLeft访问到底石，控制权交还给主函数test，主函数取出右子树栈的栈顶元素，将其作为参数
// 再次传给visitLeft方法调用，实现了树的先序遍历
// function visitLeft(treeObj, stack) {
//   let temp = treeObj;
//   while (!!temp) {
//     console.log(temp.value);
//     stack.push(temp.right || null);
//     temp = temp.left;
//   }
// }

// function test(treeObj) {
//   if (!treeObj) {
//     return console.log('empty tree');
//   }
//   const stack = [];
//   let temp = treeObj;
//   while(true) {
//     visitLeft(temp, stack);
//     if (stack.length <= 0) { break; }
//     temp = stack.pop();
//   }
// }

// 树的中序遍历，从根节点开始一路将左孩子压入栈中，当到达左孩子的叶子结点时，无左结点可以再压入栈中
// 此时应该访问栈顶元素，然后将控制权交还给该被访问结点的右子树，让它去重复上面的过程
// function visitLeft(treeObj, stack) {
//   let temp = treeObj;
//   while (!!temp) {
//     stack.push(temp);
//     temp = temp.left || null;
//   }
// }
// function test(treeObj) {
//   if (!treeObj) {
//     return console.log('empty tree');
//   }
//   const result = [];
//   const stack = [];
//   let temp = treeObj;
//   while(true) {
//     visitLeft(temp, stack);
//     if (stack.length <= 0) { break; }
//     temp = stack.pop();
//     console.log(temp.value);
//     result.push(temp.value);
//     temp = temp.right;
//   }
//   console.log('中序遍历后的结果数组为： ', result);
// }

// 树结构的层次优先遍历，利用队列，每次访问队首元素（即数组最后一项），然后先将左孩子排队入队列
// 然后将右孩子排队入队列
// function test(treeObj) {
//   const queune = [treeObj];
//   let temp = null;
//   while(queune.length > 0) {
//     temp = queune.pop();
//     console.log(temp.value);
//     if (temp.left) {
//       queune.unshift(temp.left);
//     }
//     if (temp.right) {
//       queune.unshift(temp.right);
//     }
//   }
// }

// test(tree);

// 根据树的先序遍历结果，和中序遍历结果，还原树结构
// function reBuild(preArr, midArr) {
//   if (preArr.length <= 0 || midArr <= 0) {
//     return null;
//   }
//   const leftMidArr = midArr.slice(0, midArr.indexOf(preArr[0]));
//   const rightMidArr = midArr.slice(midArr.indexOf(preArr[0]) + 1);
//   return {
//     value: preArr[0],
//     left: reBuild(preArr.slice(1, leftMidArr.length + 1), leftMidArr),
//     right: reBuild(preArr.slice(0 - rightMidArr.length), rightMidArr)
//   }
// }

// console.log(JSON.stringify(reBuild([ 1, 2, 4, 7, 10, 11, 8, 12, 5, 9, 3, 6 ], [ 10, 7, 11, 4, 12, 8, 2, 5, 9, 1, 6, 3 ])));


// function getNewString(target, position, operate) {
//   const tempArr = target.split('');
//   if (tempArr[position] === '0' && operate === -1) {
//     tempArr[position] = '9';
//   } else if (tempArr[position] === '9' && operate === 1) {
//     tempArr[position] = '0';
//   } else {
//     tempArr[position] = `${Number.parseInt(tempArr[position]) + operate}`;
//   }
//   return tempArr.join('');
// }

// function search(stepsArr, target, record) {
//   const currentValue = stepsArr[stepsArr.length - 1];
//   const tempArr = [];
//   if (currentValue === target) {
//     return true;
//   }
//   for (let i = 0; i < 8; i++) {
//     const position = Math.floor(i / 2);
//     if (currentValue[position] === target[position]) { continue; }
//     // if (Number.parseInt(currentValue[position]) > Number.parseInt(target[position]) && i % 2 === 0) {
//     //   continue;
//     // }
//     // if (Number.parseInt(currentValue[position]) < Number.parseInt(target[position]) && i % 2 === 1) {
//     //   continue;
//     // }
//     let tempStr = getNewString(currentValue, position, i % 2 === 0 ? 1 : -1);
//     if (record.indexOf(tempStr) >= 0) { continue; }
//     if (tempStr === target) {
//       stepsArr.push(tempStr);
//       return true;
//     }
//     record.push(tempStr);
//     tempArr.push(tempStr);
//   }
//   for (let j = 0; j < tempArr.length; j++) {
//     stepsArr.push(tempArr[j]);
//     if (search(stepsArr, target, record)) { return true; }
//     stepsArr.pop();
//   }
//   return false;
// }

// 求密码锁从 0000 转到 0202 的最短路径，过程中不能出现deadArr里的数组，否则死锁
// function test(deadArr, target) {
//   const queune = ["0000"];
//   const record = deadArr.slice();
//   const result = search(queune, target, record);
//   if (result) {
//     console.log(queune);
//   } else {
//     console.log('failed');
//   }
// }


// test(["0201","0101","0102","1212","2002"], "0202");
