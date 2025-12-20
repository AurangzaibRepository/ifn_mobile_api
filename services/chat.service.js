const axios = require('axios');

exports.processMessage = async (message) => {
    const systemPrompt = `You are an Islamic knowledge assistant. 
    Answer questions based only on the following trusted sources:

    1. https://ifnonline.com/
    2. https://hq.isna.net/

    If the answer is not found there, you may give general Islamic knowledge without referencing unverified sources. 
    Always answer politely and accurately.`;

    const messages = [
        {role: "system", content: systemPrompt },
        {role:"user", content: message }
    ];

    const response = await axios.post(process.env.GROQ_URL, {
            model: process.env.GROQ_MODEL,
            messages,
            max_tokens: 512
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
              }
        }
    );

    return response.data.choices[0].message.content;
}