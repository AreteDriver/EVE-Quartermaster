# Developer Guide

## Getting Started

### Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed
- [ ] Text editor (VS Code recommended)
- [ ] ESI application registered
- [ ] Expo Go app (for testing)

### Recommended VS Code Extensions

1. **React Native Tools** - Debugging and IntelliSense
2. **ESLint** - Code quality
3. **Prettier** - Code formatting
4. **TypeScript Hero** - Import management
5. **React Native Snippets** - Code snippets
6. **GitLens** - Git integration
7. **Material Icon Theme** - Better file icons

### Initial Setup Commands

```bash
# Clone repository
git clone https://github.com/AreteDriver/Quartermaster.git
cd Quartermaster

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your ESI Client ID
nano .env  # or use your preferred editor

# Start development server
npm start
```

## Development Workflow

### Daily Development

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Make changes** and test frequently

5. **Commit changes**
   ```bash
   git add .
   git commit -m "Add: description of changes"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request** on GitHub

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/what-changed` - Documentation updates
- `test/test-description` - Test additions

### Commit Message Format

```
Type: Short description (50 chars max)

Longer description if needed explaining:
- What was changed
- Why it was changed
- Any breaking changes

Closes #issue-number
```

**Types:**
- `Add:` New feature or file
- `Fix:` Bug fix
- `Update:` Modify existing feature
- `Remove:` Delete feature or file
- `Refactor:` Code improvement
- `Docs:` Documentation change
- `Test:` Test additions/changes
- `Style:` Code style changes

## Code Organization

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `LoadingSpinner.tsx`)
- **Screens**: `PascalCase.tsx` ending in `Screen` (e.g., `HomeScreen.tsx`)
- **Services**: `PascalCase.ts` ending in `Service` (e.g., `ESIService.ts`)
- **Utils**: `camelCase.ts` (e.g., `formatting.ts`)
- **Types**: `index.ts` in types folder
- **Contexts**: `PascalCase.tsx` ending in `Context` (e.g., `AuthContext.tsx`)

### Component Structure

```typescript
// Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Types/Interfaces
interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

// Component
const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  // State
  const [count, setCount] = useState(0);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handlePress = () => {
    if (onPress) onPress();
  };

  // Render
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
});

// Export
export default MyComponent;
```

### Service Structure

```typescript
// Imports
import axios, { AxiosInstance } from 'axios';
import { MyType } from '../types';

// Constants
const BASE_URL = 'https://api.example.com';

// Class
class MyService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  }

  // Methods
  async fetchData(id: number): Promise<MyType> {
    try {
      const response = await this.client.get(`/data/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

// Export singleton
export default new MyService();
```

## TypeScript Best Practices

### Always Define Types

```typescript
// ✅ Good
interface User {
  id: number;
  name: string;
}

const getUser = (id: number): Promise<User> => {
  // ...
};

// ❌ Bad
const getUser = (id: any): any => {
  // ...
};
```

### Use Proper Type Guards

```typescript
// ✅ Good
if (typeof value === 'string') {
  console.log(value.toUpperCase());
}

// ❌ Bad
console.log((value as string).toUpperCase());
```

### Avoid `any` Type

```typescript
// ✅ Good
const handleResponse = (data: unknown): void => {
  if (isValidData(data)) {
    processData(data);
  }
};

// ❌ Bad
const handleResponse = (data: any): void => {
  processData(data);
};
```

## React Native Best Practices

### Performance

1. **Use React.memo** for expensive components
   ```typescript
   export default React.memo(ExpensiveComponent);
   ```

2. **Use useMemo** for expensive calculations
   ```typescript
   const expensiveValue = useMemo(() => {
     return calculateExpensiveValue(data);
   }, [data]);
   ```

3. **Use useCallback** for handlers
   ```typescript
   const handlePress = useCallback(() => {
     doSomething();
   }, [dependencies]);
   ```

4. **Optimize FlatList**
   ```typescript
   <FlatList
     data={items}
     keyExtractor={(item) => item.id.toString()}
     getItemLayout={(data, index) => ({
       length: ITEM_HEIGHT,
       offset: ITEM_HEIGHT * index,
       index,
     })}
     removeClippedSubviews={true}
     maxToRenderPerBatch={10}
     windowSize={5}
   />
   ```

### Styling

1. **Use StyleSheet.create**
   ```typescript
   const styles = StyleSheet.create({
     container: { flex: 1 },
   });
   ```

2. **Extract common styles**
   ```typescript
   // src/styles/common.ts
   export const colors = {
     primary: '#00d4ff',
     background: '#0a0a0a',
   };
   ```

3. **Responsive design**
   ```typescript
   import { Dimensions } from 'react-native';
   
   const { width, height } = Dimensions.get('window');
   ```

### State Management

1. **Local state for UI**
   ```typescript
   const [isVisible, setIsVisible] = useState(false);
   ```

2. **Context for shared state**
   ```typescript
   const { user } = useAuth();
   ```

3. **Keep state minimal**
   - Don't store derived values
   - Don't duplicate data

## API Integration

### Error Handling Pattern

```typescript
async function fetchData() {
  try {
    setLoading(true);
    const data = await APIService.getData();
    setData(data);
    setError(null);
  } catch (error) {
    console.error('Error:', error);
    setError('Failed to load data');
  } finally {
    setLoading(false);
  }
}
```

### Token Management

```typescript
// Always set token before authenticated calls
ESIService.setAuthToken(accessToken);
const data = await ESIService.getCharacterAssets(characterId);
```

### Rate Limiting

```typescript
// Add delays for non-critical requests
await new Promise(resolve => setTimeout(resolve, 1000));
```

### Caching Strategy

```typescript
// Cache non-changing data
const cachedData = cache.get(key);
if (cachedData && !isExpired(cachedData)) {
  return cachedData.value;
}
```

## Testing

### Unit Test Example

```typescript
import { formatISK } from '../utils/formatting';

describe('formatISK', () => {
  it('formats billions correctly', () => {
    expect(formatISK(1500000000)).toBe('1.50B ISK');
  });

  it('formats millions correctly', () => {
    expect(formatISK(2500000)).toBe('2.50M ISK');
  });
});
```

### Component Test Example

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('handles press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <MyComponent title="Test" onPress={onPress} />
    );
    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Debugging

### React Native Debugger

1. Open developer menu (shake device or Cmd+D/Ctrl+D)
2. Select "Debug JS Remotely"
3. Open Chrome DevTools
4. Use console, breakpoints, etc.

### Console Logging

```typescript
// Development only
if (__DEV__) {
  console.log('Debug info:', data);
}
```

### Network Debugging

```typescript
// Log all API calls
axios.interceptors.request.use(request => {
  console.log('Request:', request.url);
  return request;
});
```

## Common Issues & Solutions

### Issue: "Unable to resolve module"

**Solution:**
```bash
npm start -- --reset-cache
```

### Issue: Metro bundler errors

**Solution:**
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

### Issue: iOS build fails

**Solution:**
```bash
cd ios
pod install
cd ..
npm run ios
```

### Issue: Authentication not working

**Check:**
1. ESI Client ID is correct
2. Callback URL matches exactly
3. All required scopes enabled
4. Token not expired

### Issue: API calls failing

**Check:**
1. Network connectivity
2. Token is set: `ESIService.setAuthToken(token)`
3. ESI API is online
4. Rate limits not exceeded

## Performance Optimization

### Profile App Performance

1. Enable Performance Monitor
2. Check for unnecessary re-renders
3. Use React DevTools Profiler
4. Monitor memory usage

### Reduce Bundle Size

1. Remove unused dependencies
2. Use dynamic imports
3. Optimize images
4. Enable Hermes engine

### Optimize Images

```typescript
<Image
  source={require('./image.png')}
  resizeMode="cover"
  style={{ width: 100, height: 100 }}
/>
```

## Security Checklist

- [ ] No API keys in code
- [ ] Use environment variables
- [ ] Secure token storage
- [ ] Validate user inputs
- [ ] Use HTTPS only
- [ ] Handle errors gracefully
- [ ] Don't log sensitive data
- [ ] Keep dependencies updated

## Pre-Commit Checklist

- [ ] Code compiles without errors
- [ ] Tests pass
- [ ] ESLint shows no errors
- [ ] Code is formatted (Prettier)
- [ ] No console.logs in production code
- [ ] Comments explain complex logic
- [ ] Types are properly defined
- [ ] Documentation updated if needed

## Release Checklist

- [ ] All tests pass
- [ ] Version number updated
- [ ] CHANGELOG updated
- [ ] Documentation reviewed
- [ ] Build succeeds (iOS and Android)
- [ ] App tested on real devices
- [ ] Performance acceptable
- [ ] No memory leaks
- [ ] Error tracking configured
- [ ] Analytics configured

## Resources

### Official Documentation
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)

### EVE Online Development
- [ESI Documentation](https://esi.evetech.net/ui/)
- [EVE Developers](https://developers.eveonline.com/)
- [zkillboard API](https://github.com/zKillboard/zKillboard/wiki)

### Tools
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/)
- [Reactotron](https://github.com/infinitered/reactotron)

### Community
- [EVE Developers Discord](https://discord.gg/eveonline)
- [React Native Community](https://www.reactnative.dev/community/overview)
- [Expo Forums](https://forums.expo.dev/)

## Tips & Tricks

💡 **Hot Reload**: Save files to see changes instantly
💡 **Component Inspector**: Shake device → "Show Element Inspector"
💡 **Fast Refresh**: Preserves state during edits
💡 **Remote Debugging**: Use Chrome DevTools
💡 **Performance Monitor**: Shake device → "Performance Monitor"

## Next Steps

1. Read through all documentation
2. Set up development environment
3. Make a small test change
4. Create your first feature branch
5. Submit your first PR

Happy coding! 🚀
