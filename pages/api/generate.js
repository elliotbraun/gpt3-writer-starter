import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
Write a long marketing email from a business to customers based on the following example:

Prompt: Come in to receive 20% off firewood and produce this Friday!

Subject: Get Ready for Winter with Big Savings at ABC Farms!

Dear Valued Customers, 

Winter is on its way, and with it comes cold temperatures and the need to stay warm. That’s why this Friday from 8-10am, we’re offering 20% off all firewood and produce from ABC Farms! 

Our firewood is hand-cut and perfect for keeping your living spaces cozy throughout the harsh winter months. Plus, we’ve got a great selection of locally sourced produce to keep your pantry well stocked. With the 20% off discount, it’s the perfect opportunity to stock up and make sure you’re prepared. 

So get started on those winter preparations by coming down to ABC Farms this Friday morning. We’re looking forward to seeing you there! 

Sincerely, 
ABC Farms

Prompt:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    // The below calls on the basePromptPrefix from above,
    // remove the \n if I don't want a new line. For example,
    // if I wanted GPT-3 to complete a sentence
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;