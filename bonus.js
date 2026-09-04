
let nums=[3,2,2,3];

function expectedNums(nums,val)
{
let k=0;
for(let i=0;i<nums.length;i++)
{
    if(val!=nums[i])
    {
        nums[k]=nums[i];
        k++;

    }
}

return k ;

}
console.log( expectedNums(nums,2));
////////////////Code on LeetCode//////////////////
/*
 * 
 *@param {number[]} nums
 * @param {number} val
 * @return {number}
 */
/*var removeElement = function(nums, val) {

let k=0;
for(let i=0;i<nums.length;i++)
{
    if(val!=nums[i])
    {
        nums[k]=nums[i];
        k++;

    }
}

return k ;
    
};
 */