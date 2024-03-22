

// Import open Ai module
const OpenAI = require('openai');


// require and read env file
require("dotenv").config();



 // Creating a openAi instance
 const client = new OpenAI( {apiKey : process.env.OPENAI_API_KEY} );     






async function generateRecommendation(healthQuiz,recentScan){
   
    

    // const content = `Role: Cocacola , User Description : I am advised not to take any sugary drinks, i am 35 years old , i am looking for sugar free drinks ro any sugar free foods`
    
    const content = "Role: "+  recentScan + ", User Description : " + healthQuiz

    //  const content = `Role: {munche cream cracker } , User Description : {}`

    const completion = await client.chat.completions.create(
        
        {
            messages:[{role:"user", content}],
            // Our custom fine tuned model
            model:"ft:gpt-3.5-turbo-0613:personal:nutrimatemodel:8vk4PaWF"


        }

    );

    const response = JSON.parse(completion.choices[0].message.content);
    // If no response retun null
    if(!response.rate){
        return "error";
    }

    return  await response.rate;

}

module.exports = {generateRecommendation};