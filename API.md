# API Documentation

## Overview

Quartermaster integrates with two main APIs:
1. **EVE ESI API** - Official EVE Online API
2. **zkillboard API** - Community killboard data

## ESI API Integration

### Base URL
```
https://esi.evetech.net/latest
```

### Authentication
OAuth 2.0 with JWT tokens via CCP SSO

### ESIService Methods

#### Character Methods

##### getCharacterInfo(characterId: number)
Retrieves character information from ESI.

**Parameters:**
- `characterId` (number) - EVE character ID

**Returns:** `Promise<Character>`

**Example:**
```typescript
const character = await ESIService.getCharacterInfo(12345678);
console.log(character.character_name);
```

##### getCharacterAssets(characterId: number)
Fetches all assets for a character.

**Parameters:**
- `characterId` (number) - EVE character ID

**Returns:** `Promise<Asset[]>`

**Requires:** `esi-assets.read_assets.v1` scope

**Example:**
```typescript
ESIService.setAuthToken(token);
const assets = await ESIService.getCharacterAssets(12345678);
```

##### getCharacterOrders(characterId: number)
Retrieves all market orders for a character.

**Parameters:**
- `characterId` (number) - EVE character ID

**Returns:** `Promise<MarketOrder[]>`

**Requires:** `esi-markets.read_character_orders.v1` scope

##### getCharacterSkills(characterId: number)
Fetches character skills and skill points.

**Parameters:**
- `characterId` (number) - EVE character ID

**Returns:** `Promise<Skills>`

**Requires:** `esi-skills.read_skills.v1` scope

#### Universe Methods

##### getSolarSystem(systemId: number)
Gets solar system information.

**Parameters:**
- `systemId` (number) - Solar system ID

**Returns:** `Promise<SolarSystem>`

**Example:**
```typescript
const system = await ESIService.getSolarSystem(30000142);
console.log(system.system_name, system.security_status);
```

##### getStargate(stargateId: number)
Retrieves stargate information.

**Parameters:**
- `stargateId` (number) - Stargate ID

**Returns:** `Promise<Stargate>`

##### getRoute(origin: number, destination: number, avoidSystems?: number[])
Calculates route between two systems.

**Parameters:**
- `origin` (number) - Origin system ID
- `destination` (number) - Destination system ID
- `avoidSystems` (number[], optional) - Systems to avoid

**Returns:** `Promise<number[]>` - Array of system IDs in route

**Example:**
```typescript
const route = await ESIService.getRoute(30000142, 30002187);
console.log(`Route has ${route.length - 1} jumps`);
```

##### searchSolarSystems(search: string)
Searches for solar systems by name.

**Parameters:**
- `search` (string) - Search query

**Returns:** `Promise<any[]>` - Array of system IDs

##### getTypeName(typeId: number)
Gets the name of an item type.

**Parameters:**
- `typeId` (number) - Type ID

**Returns:** `Promise<string>` - Type name

#### Market Methods

##### getMarketOrders(regionId: number, typeId?: number)
Retrieves market orders for a region.

**Parameters:**
- `regionId` (number) - Region ID
- `typeId` (number, optional) - Filter by type ID

**Returns:** `Promise<MarketOrder[]>`

##### getMarketHistory(regionId: number, typeId: number)
Gets historical market data.

**Parameters:**
- `regionId` (number) - Region ID
- `typeId` (number) - Type ID

**Returns:** `Promise<any[]>` - Historical data

### Authentication Token

Set authentication token before making authenticated requests:

```typescript
ESIService.setAuthToken(accessToken);
```

## zkillboard API Integration

### Base URL
```
https://zkillboard.com/api
```

### ZKillboardService Methods

#### getSystemKills(systemId: number, hoursBack?: number)
Gets recent kills in a system.

**Parameters:**
- `systemId` (number) - Solar system ID
- `hoursBack` (number, default: 1) - Hours to look back

**Returns:** `Promise<KillmailSummary[]>`

**Example:**
```typescript
const kills = await ZKillboardService.getSystemKills(30000142, 1);
console.log(`${kills.length} kills in last hour`);
```

#### getSystemDangerRating(systemId: number)
Calculates danger rating for a system.

**Parameters:**
- `systemId` (number) - Solar system ID

**Returns:** `Promise<ZKillboardData>`

**Danger Ratings:**
- `low` - 0-5 kills/hour
- `medium` - 6-10 kills/hour
- `high` - 11-20 kills/hour
- `extreme` - 20+ kills/hour

**Example:**
```typescript
const danger = await ZKillboardService.getSystemDangerRating(30000142);
console.log(`Danger: ${danger.danger_rating}`);
console.log(`Kills: ${danger.kills_last_hour}`);
```

#### getRouteDangerAssessment(systemIds: number[])
Analyzes danger for multiple systems.

**Parameters:**
- `systemIds` (number[]) - Array of system IDs

**Returns:** `Promise<Map<number, ZKillboardData>>`

**Example:**
```typescript
const route = [30000142, 30000143, 30000144];
const dangerMap = await ZKillboardService.getRouteDangerAssessment(route);
dangerMap.forEach((data, systemId) => {
  console.log(`System ${systemId}: ${data.danger_rating}`);
});
```

#### getCharacterKills(characterId: number, limit?: number)
Gets kills for a character.

**Parameters:**
- `characterId` (number) - Character ID
- `limit` (number, default: 50) - Max results

**Returns:** `Promise<any[]>`

#### getCorporationKills(corporationId: number, limit?: number)
Gets kills for a corporation.

**Parameters:**
- `corporationId` (number) - Corporation ID
- `limit` (number, default: 50) - Max results

**Returns:** `Promise<any[]>`

## AI Service

### AIService Methods

#### calculateJumpRange(baseRange, jumpDriveCalibrationLevel, jumpFreighterSkillLevel)
Calculates jump range for capital ships.

**Parameters:**
- `baseRange` (number) - Base jump range in LY
- `jumpDriveCalibrationLevel` (number) - JDC skill level (0-5)
- `jumpFreighterSkillLevel` (number) - Jump Freighter skill level (0-5)

**Returns:** `number` - Effective jump range

**Example:**
```typescript
const range = AIService.calculateJumpRange(5, 5, 5);
// 5 * 2.0 (JDC V) * 1.5 (JF V) = 15 LY
```

#### generateRouteSuggestions(origin, destination, avoidHighSec?, useJumpDrive?, jumpRange?)
Generates AI-powered route suggestions.

**Parameters:**
- `origin` (number) - Origin system ID
- `destination` (number) - Destination system ID
- `avoidHighSec` (boolean, optional) - Avoid high-sec
- `useJumpDrive` (boolean, optional) - Use jump drive
- `jumpRange` (number, optional) - Jump range if applicable

**Returns:** `Promise<AIRouteSuggestion>`

**Example:**
```typescript
const suggestion = await AIService.generateRouteSuggestions(
  30000142,
  30002187
);

console.log(`Main route: ${suggestion.route.jumps} jumps`);
console.log(`Risk: ${suggestion.risk_assessment}`);
console.log(`Alternatives: ${suggestion.alternative_routes.length}`);
```

#### analyzeRouteSafety(systemIds: number[])
Analyzes safety of a route.

**Parameters:**
- `systemIds` (number[]) - Systems in route

**Returns:** `Promise<string>` - Safety assessment

#### suggestShipFit(shipTypeId, purpose, skills?)
Suggests ship fittings.

**Parameters:**
- `shipTypeId` (number) - Ship type ID
- `purpose` ('pvp' | 'pve' | 'exploration' | 'hauling' | 'mining')
- `skills` (Skills, optional) - Character skills

**Returns:** `Promise<ShipFit[]>`

#### analyzeAssetDistribution(assets: any[])
Analyzes asset distribution.

**Parameters:**
- `assets` (any[]) - Asset array

**Returns:** `string` - Analysis text

#### analyzeMarketOrders(orders, marketData)
Analyzes market orders.

**Parameters:**
- `orders` (any[]) - Market orders
- `marketData` (any[]) - Market data

**Returns:** `string` - Analysis text

## Rate Limiting

### ESI API
- Error Error Limit: 100 per second per IP
- Authenticated: 300 per second per character
- Respect `X-ESI-Error-Limit-*` headers

### zkillboard API
- No official rate limit
- Be respectful: ~1 request per second
- Use caching when possible

## Error Handling

### ESI Errors
```typescript
try {
  const data = await ESIService.getCharacterInfo(id);
} catch (error) {
  if (error.response?.status === 403) {
    // Token expired or insufficient scopes
  } else if (error.response?.status === 404) {
    // Resource not found
  } else if (error.response?.status === 420) {
    // Rate limited
  }
}
```

### zkillboard Errors
```typescript
try {
  const data = await ZKillboardService.getSystemKills(id);
} catch (error) {
  // Handle gracefully - service may be down
  console.error('zkillboard unavailable');
}
```

## Best Practices

1. **Cache Responses** - Reduce API calls
2. **Batch Requests** - When possible
3. **Handle Errors** - Always use try-catch
4. **Respect Rate Limits** - Add delays if needed
5. **Token Management** - Refresh before expiry
6. **User Feedback** - Show loading states

## Example Usage

### Complete Character Data Fetch
```typescript
async function loadCharacterData(characterId: number, token: string) {
  ESIService.setAuthToken(token);
  
  const [character, assets, orders, skills] = await Promise.all([
    ESIService.getCharacterInfo(characterId),
    ESIService.getCharacterAssets(characterId),
    ESIService.getCharacterOrders(characterId),
    ESIService.getCharacterSkills(characterId),
  ]);

  return { character, assets, orders, skills };
}
```

### Route Planning with Danger
```typescript
async function planSafeRoute(origin: number, dest: number) {
  // Get route suggestion with AI
  const suggestion = await AIService.generateRouteSuggestions(origin, dest);
  
  // Get detailed danger data
  const dangerMap = await ZKillboardService.getRouteDangerAssessment(
    suggestion.route.systems
  );
  
  // Check for extreme danger
  const extremeSystems = Array.from(dangerMap.entries())
    .filter(([_, data]) => data.danger_rating === 'extreme')
    .map(([id, _]) => id);
    
  if (extremeSystems.length > 0) {
    console.log('WARNING: Extreme danger systems:', extremeSystems);
    console.log('Consider alternative:', suggestion.alternative_routes[0]);
  }
  
  return { suggestion, dangerMap };
}
```

## TypeScript Types

All types are defined in `src/types/index.ts`:

- `Character` - Character information
- `Asset` - Asset data
- `MarketOrder` - Market order
- `SolarSystem` - System information
- `Route` - Route data
- `ZKillboardData` - Danger data
- `AIRouteSuggestion` - AI route suggestion
- `Skills` - Character skills
- `ShipFit` - Ship fitting

## Additional Resources

- [EVE ESI Documentation](https://esi.evetech.net/ui/)
- [zkillboard API Wiki](https://github.com/zKillboard/zKillboard/wiki)
- [EVE Third Party Developers](https://developers.eveonline.com/)
