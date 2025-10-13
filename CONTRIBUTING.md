# Contributing to Lumi UI

## Development Workflow

### Commit Messages
This project uses [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages should follow this format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

### Making Changes

1. Create a feature branch from `main`
2. Make your changes
3. Add a changeset for your changes:
   ```bash
   pnpm changeset
   ```
4. Commit your changes (Husky will automatically run linting and validate your commit message)
5. Push and create a pull request

### Changesets

When you make changes that should be included in the next release, run:

```bash
pnpm changeset
```

This will prompt you to:
- Select which packages have changed
- Choose the type of change (major, minor, patch)
- Write a summary of the changes

### Releasing

Releases are handled by maintainers:

1. Run `pnpm version-packages` to consume changesets and update versions
2. Run `pnpm release` to publish to npm