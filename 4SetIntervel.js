// 2.OTP Countdown Simulator (Console App)
// ------------------------------------
console.log("OTP Sent Successfully")
let i=10
console.log("Countdown Started")
console.log(i)

let intervelId=setInterval(()=>{
i--
console.log(i)
if(i==0)
{
    console.log("Tap to Resend Code")
    //break;
    clearInterval(intervelId)
}
},1000)

