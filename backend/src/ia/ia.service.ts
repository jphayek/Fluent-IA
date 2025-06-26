import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Prestation } from 'src/prestations/prestation.entity';
import { PrestationService } from 'src/prestations/prestation.service';

@Injectable()
export class IaService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private readonly apiKey = process.env.IA_API_KEY;
  private userDemand = "";

  constructor(private readonly prestationService: PrestationService) {}

  async generateText(prompt: string) {
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      model: 'deepseek/deepseek-r1-0528:free',
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
      return response.data;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error.response?.data || error.message);
      throw error;
    }
  }

  async getPrestations(userRequest: string) {
    const prestations = (await this.prestationService.findAll()).data;
    const prestationsHumaines = prestations.filter(prestations => prestations.serviceParIa != true);

    this.userDemand = userRequest;
    const prompt = `
Ta tâche est d’identifier les prestations les plus pertinentes pour une demande utilisateur.

Voici la liste des prestations disponibles :
${prestationsHumaines.map(prestation => `{
  id: ${prestation.id},
  titre: "${prestation.title}",
  categorie: "${prestation.category}",
  description: "${prestation.description}",
  tags: [${prestation.tags}],
  actif: ${prestation.isActive},
  prix: ${prestation.price}
}`).join(',\n')}

Demande utilisateur :
"${userRequest}"

Réponds uniquement avec une liste des IDs des prestations les plus pertinentes sous le format suivant :
[1, 2, 3]

Si aucune prestation n’est pertinente, réponds simplement :
[]

N’ajoute aucun texte explicatif.
`;

    const response = await this.generateText(prompt);

    const listIds = JSON.parse(response.choices[0].message.content);
    let responsePrestations : Prestation[] = [];
    for (let i=0; i < listIds.length; i++) {
      const prestation = (await this.prestationService.findOne(listIds[i])).data;
      if (prestation) {
        responsePrestations.push(prestation);
      }
    }
    const finalResponse = {
      humaines: responsePrestations,
      ia: await this.isServiceIaCompatible(userRequest)
    };
    return finalResponse;
  }

  async isServiceIaCompatible(userRequest: string) {
    const prestations = (await this.prestationService.findAll()).data;
    const prestationsIa = prestations.filter(prestations => prestations.serviceParIa);

    const prompt = `
    Ta tâche est d’identifier les prestations compatibles avec la demande de l'utilisateur.
    
    Voici la liste des prestations :
    ${prestationsIa.map(prestation => `{
      id: ${prestation.id},
      titre: "${prestation.title}",
      categorie: "${prestation.category}",
      description: "${prestation.description}",
      tags: [${prestation.tags}],
      actif: ${prestation.isActive},
      prix: ${prestation.price}
    }`).join(',\n')}
    
    Demande utilisateur :
    "${userRequest}"
    
    Réponds uniquement avec une liste des IDs des prestations pertinentes, sous le format :
    [1, 2]
    
    Sinon, réponds :
    []
    `;
    
    const response = await this.generateText(prompt);
    const listIds = JSON.parse(response.choices[0].message.content);
    let responsePrestations : Prestation[] = []
    for (let i=0; i < listIds.length; i++) {
      const prestation = (await this.prestationService.findOne(listIds[i])).data;
      if (prestation) {
        responsePrestations.push(prestation);
      }
    }

    return responsePrestations;
  }

  async generateForm(id: string) {
    
    const prestationIa = (await this.prestationService.findOne(Number(id))).data;
    
    const prompt =`
Ta tâche est de créer un formulaire demandant uniquement les informations nécessaires pour réaliser la prestation suivante et répondre à la demande de l'utilisateur.

Voici la prestation à réaliser :
  titre: "${prestationIa.title}",
  categorie: "${prestationIa.category}",
  description: "${prestationIa.description}",

Demande utilisateur :
  "${this.userDemand}"

Réponds uniquement la structure du formulaire sous le format suivant :
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
    
N’ajoute aucun texte explicatif.`

    const response = await this.generateText(prompt);
    return {
      prestationIa: id,
      form: JSON.parse(response.choices[0].message.content)
    };
  }

  async makePrestation(id: string, form: string) {
    // Récupération de la prestation via son ID
    // Exécution de la prestation avec les données du formulaire via un prompt
    // Renvoi de la réponse à l'utilisateur sous le format string
  }
}
