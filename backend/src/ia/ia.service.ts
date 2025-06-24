import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IaService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private readonly apiKey = process.env.IA_API_KEY;

  async generateText(prompt: string) {        
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
    
    const data = {
      model: 'mistralai/mistral-small-3.2-24b-instruct:free',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Salut',
            }
          ],
        },
      ],
    };
    
    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error.response?.data || error.message);
      throw error;
    }
  }
}