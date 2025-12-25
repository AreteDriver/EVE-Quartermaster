# Contributing to Quartermaster

First off, thank you for considering contributing to Quartermaster! It's people like you that make Quartermaster such a great tool for the EVE Online community.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to fostering an open and welcoming environment. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots** if relevant
- **Include your environment details**: Device type, OS version, app version

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Add tests** if applicable
4. **Update documentation** if needed
5. **Ensure tests pass** and the app builds successfully
6. **Submit a pull request**

## Development Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

Quick start:
```bash
git clone https://github.com/AreteDriver/Quartermaster.git
cd Quartermaster
npm install
npm start
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid `any` type when possible
- Use meaningful variable and function names

### React/React Native

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types

### Code Style

- Follow the existing code style
- Use ESLint and Prettier
- Run `npm run lint` before committing
- Keep lines under 100 characters when reasonable

### Commit Messages

- Use clear and meaningful commit messages
- Start with a verb in present tense (Add, Fix, Update, etc.)
- Reference issue numbers when applicable

Examples:
```
Add route planning feature
Fix authentication token refresh issue
Update README with new setup instructions
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── navigation/     # Navigation setup
├── screens/        # Screen components
├── services/       # API services
├── types/          # TypeScript definitions
└── utils/          # Utility functions
```

## Testing

- Write unit tests for services and utilities
- Test components with React Testing Library
- Ensure all tests pass before submitting PR

Run tests:
```bash
npm test
```

## API Integration

### ESI API
- Follow ESI API best practices
- Respect rate limits
- Handle errors gracefully
- Cache responses when appropriate

### zkillboard API
- Include User-Agent header
- Be respectful with request frequency
- Handle API unavailability

## Adding New Features

When adding new features:

1. **Plan the feature**: Discuss in an issue first
2. **Design the API**: If adding new services, design clean APIs
3. **Implement incrementally**: Break into smaller commits
4. **Document**: Update README and code comments
5. **Test thoroughly**: Test on both iOS and Android

## Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for architectural changes
- Add JSDoc comments for complex functions
- Update SETUP.md if setup process changes

## Performance Guidelines

- Avoid unnecessary re-renders
- Use React.memo and useMemo appropriately
- Optimize API calls (batching, caching)
- Profile performance with React DevTools
- Keep bundle size reasonable

## Security Guidelines

- Never commit API keys or secrets
- Use environment variables for configuration
- Follow secure storage practices
- Validate all user inputs
- Keep dependencies updated

## Review Process

All submissions require review. We aim to:

- Review PRs within 48 hours
- Provide constructive feedback
- Collaborate on improvements
- Merge when requirements are met

## Questions?

- Open an issue for questions
- Check existing documentation first
- Be specific about what you need help with

## Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Thanked in the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions to Quartermaster help make the EVE Online experience better for everyone. We appreciate your time and effort!
