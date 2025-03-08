
// Sample speeches for various topics
const sampleSpeeches: Record<string, string> = {
  "leadership": "Leadership is not about being in charge. It's about taking care of those in your charge. A true leader has the confidence to stand alone, the courage to make tough decisions, and the compassion to listen to the needs of others. They don't set out to be a leader, but become one through the quality of their actions and the integrity of their intent. Leadership is about inspiring others to do things they never thought they could.",
  "technology": "Technology is a word that describes something that doesn't work yet. The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life. Technology is best when it brings people together. The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency. The second is that automation applied to an inefficient operation will magnify the inefficiency.",
  "environment": "The environment is where we all meet; where we all have a mutual interest; it is the one thing all of us share. It is not only a mirror of ourselves, but a focusing lens on what we can become. Our planet's alarm is going off, and it is time to wake up and take action. The Earth does not belong to us: we belong to the Earth. We must protect the Earth for those who inhabit it today and for the generations yet to come.",
  "education": "Education is the most powerful weapon which you can use to change the world. It is the passport to the future, for tomorrow belongs to those who prepare for it today. An investment in knowledge pays the best interest. The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.",
  "health": "Health is a state of complete harmony of the body, mind, and spirit. It is not merely the absence of disease or infirmity. Good health is not something we can buy. However, it can be an extremely valuable savings account. The first wealth is health. Take care of your body. It's the only place you have to live in. A healthy outside starts from the inside.",
};

/**
 * Generates a speech based on the provided topic
 * 
 * @param topic The topic to generate a speech for
 * @returns A generated speech
 */
export const generateSpeech = (topic: string): string => {
  // Clean up the topic by removing extra spaces and converting to lowercase
  const cleanTopic = topic.trim().toLowerCase();
  
  // Check if we have a pre-written speech for this topic
  if (sampleSpeeches[cleanTopic]) {
    return sampleSpeeches[cleanTopic];
  }
  
  // If no exact match, look for partial matches
  for (const [key, speech] of Object.entries(sampleSpeeches)) {
    if (cleanTopic.includes(key) || key.includes(cleanTopic)) {
      return speech;
    }
  }
  
  // If no match found, return a generic speech
  return `Thank you for the opportunity to speak about ${topic}. This is an important subject that affects many aspects of our lives. When considering ${topic}, we must look at its history, current state, and future implications. Throughout time, various perspectives on ${topic} have emerged, each with their own merits. As we move forward, it's crucial that we continue to research, discuss, and innovate in this area. I hope this brief introduction to ${topic} has been informative and inspires further exploration of this fascinating subject.`;
};
