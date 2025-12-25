import axios, { AxiosInstance } from 'axios';
import { Character, Asset, MarketOrder, SolarSystem, Skills, Stargate } from '../types';
import { API_CONFIG } from '../config';

class ESIService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.ESI_BASE_URL,
      params: {
        datasource: API_CONFIG.DATASOURCE,
      },
    });
  }

  // Set authentication token for authenticated requests
  setAuthToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Character endpoints
  async getCharacterInfo(characterId: number): Promise<Character> {
    const response = await this.client.get(`/characters/${characterId}/`);
    return {
      character_id: characterId,
      ...response.data,
    };
  }

  async getCharacterAssets(characterId: number): Promise<Asset[]> {
    const response = await this.client.get(`/characters/${characterId}/assets/`);
    return response.data;
  }

  async getCharacterOrders(characterId: number): Promise<MarketOrder[]> {
    const response = await this.client.get(`/characters/${characterId}/orders/`);
    return response.data;
  }

  async getCharacterSkills(characterId: number): Promise<Skills> {
    const response = await this.client.get(`/characters/${characterId}/skills/`);
    return {
      character_id: characterId,
      ...response.data,
    };
  }

  // Universe endpoints
  async getSolarSystem(systemId: number): Promise<SolarSystem> {
    const response = await this.client.get(`/universe/systems/${systemId}/`);
    return response.data;
  }

  async getStargate(stargateId: number): Promise<Stargate> {
    const response = await this.client.get(`/universe/stargates/${stargateId}/`);
    return response.data;
  }

  async getRoute(origin: number, destination: number, avoidSystems: number[] = []): Promise<number[]> {
    const params: any = {
      origin,
      destination,
    };
    
    if (avoidSystems.length > 0) {
      params.avoid = avoidSystems.join(',');
    }

    const response = await this.client.get('/route/', { params });
    return response.data;
  }

  async searchUniverseNames(search: string, categories: string[] = ['solar_system', 'station']): Promise<any[]> {
    const response = await this.client.get('/universe/names/', {
      params: {
        ids: search,
      },
    });
    return response.data;
  }

  async getTypeName(typeId: number): Promise<string> {
    const response = await this.client.get(`/universe/types/${typeId}/`);
    return response.data.name;
  }

  async searchSolarSystems(search: string): Promise<any[]> {
    const response = await this.client.get('/search/', {
      params: {
        categories: 'solar_system',
        search,
        strict: false,
      },
    });
    return response.data.solar_system || [];
  }

  // Market endpoints
  async getMarketOrders(regionId: number, typeId?: number): Promise<MarketOrder[]> {
    const endpoint = typeId 
      ? `/markets/${regionId}/orders/?type_id=${typeId}`
      : `/markets/${regionId}/orders/`;
    const response = await this.client.get(endpoint);
    return response.data;
  }

  async getMarketHistory(regionId: number, typeId: number): Promise<any[]> {
    const response = await this.client.get(`/markets/${regionId}/history/?type_id=${typeId}`);
    return response.data;
  }
}

export default new ESIService();
