import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IaService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private readonly apiKey = process.env.IA_API_KEY;
  private userDemand = "";

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
              text: prompt,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      console.log('Response:', response.data.choices[0].message.content);
      return response.data;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error.response?.data || error.message);
      throw error;
    }
  }

  async getPrestations(userRequest: string, organisations: any[], prestations: any[]) {
    console.log(userRequest, organisations, prestations);
    this.userDemand = userRequest;
    const prompt = `
      L'utilisateur demande un type de service. Voici les détails de l'organisation et des prestations disponibles :

      Organisations :
      ${organisations.map(org => `- ${org.nom} : [id: ${org.id}, nom: ${org.nom}, secteur: ${org.secteur}, pays: ${org.pays}, description: ${org.description}, prestations: [${org.prestations.map(presta => `${presta}`).join(', ')}]]`).join('\n')}

      Prestations :
      ${prestations.map(prestation => `- ${prestation.nom} : [id: ${prestation.id}, nom: ${prestation.nom}, descriptif: ${prestation.descriptif}, localisation: ${prestation.localisation}, physique: ${prestation.physique}, tags: [${prestation.tags.map(tag => `${tag}`).join(', ')}]]`).join('\n')}

      Utilisateur : ${userRequest}

      Réponds avec une liste de prestations pertinentes pour la demande de l'utilisateur.
      Tu me répondra au format UNIQUEMENT sous le format [prestationID, ...]
    `;

    const response = await this.generateText(prompt);
    return response.choices[0].message.content;
  }

  async generateForm() {
    console.log(this.userDemand);
    const prompt = `
      L'utilisateur à fais une demande de prestation :
      ${this.userDemand}

      Génère un formulaire dynamique demandant les informations nécessaires pour répondre à la problématique de l'utilisateur. Par exemple, pour un logo, demande des informations sur les couleurs, les formes, etc.
      Tu me répondra UNIQUEMENT sous le format JSON comme l'exemple suivant :  
      [{
        type: "text",
        name: "couleur",
        label: "Couleur"
      }, {
        type: "select",
        name: "forme",
        label: "Forme",
        options: [{
            name: "Rond",
            value: "rond",
          }, {
            name: "Carré",
            value: "carre"
          }
        ]
      }]
    `;

    const response = await this.generateText(prompt);
    return response.choices[0].message.content;
  }
}
