# Contributing to AI Knowledge Base

Thank you for your interest in contributing to AI Knowledge Base! This document provides guidelines and instructions for contributing.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, Node version, Python version)
- **Error messages** and logs

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** and motivation
- **Proposed solution** or implementation ideas
- **Alternative approaches** you've considered
- **Additional context** or screenshots

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding standards** (see below)
3. **Add tests** for new features
4. **Update documentation** as needed
5. **Ensure all tests pass**
6. **Write clear commit messages**

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- Git
- MongoDB Atlas account (for testing)
- OpenAI API key (for testing)

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ai-knowledge-base.git
cd ai-knowledge-base

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/ai-knowledge-base.git

# Install dependencies
./setup.sh  # or setup.bat on Windows

# Create a feature branch
git checkout -b feature/your-feature-name
```

## 📝 Coding Standards

### TypeScript/JavaScript (Frontend & Backend)

- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused
- Use async/await over promises

**Example:**
```typescript
/**
 * Upload a document and extract text
 * @param file - The PDF file to upload
 * @param userId - The ID of the user uploading
 * @returns Document metadata with chunk count
 */
async uploadDocument(file: File, userId: string): Promise<DocumentMetadata> {
  // Implementation
}
```

### Python (LLM Service)

- Follow PEP 8 style guide
- Use type hints
- Add docstrings for functions
- Keep functions focused
- Use async/await for I/O operations

**Example:**
```python
async def summarize(chunks: List[str]) -> str:
    """
    Generate a comprehensive summary of the document chunks.
    
    Args:
        chunks: List of text chunks from the document
        
    Returns:
        A string containing the summary
        
    Raises:
        Exception: If summarization fails
    """
    # Implementation
```

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(chat): add conversation history
fix(upload): handle large PDF files correctly
docs(readme): update installation instructions
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

### LLM Service Tests
```bash
cd llm-service
pytest
```

## 📚 Documentation

When adding new features:

1. Update relevant `.md` files
2. Add inline code comments
3. Update API documentation
4. Add examples if applicable

## 🎨 UI/UX Guidelines

- Follow existing design patterns
- Ensure responsive design
- Test on multiple screen sizes
- Use TailwindCSS utility classes
- Maintain accessibility standards (WCAG 2.1)

## 🔍 Code Review Process

1. **Self-review** your code before submitting
2. **Ensure CI passes** all checks
3. **Request review** from maintainers
4. **Address feedback** promptly
5. **Keep discussions** professional and constructive

## 🐛 Debugging Tips

### Frontend Debugging
```bash
# Enable verbose logging
DEBUG=* npm run dev
```

### Backend Debugging
```typescript
// Use NestJS logger
private readonly logger = new Logger(ClassName.name);
this.logger.debug('Debug message');
```

### LLM Service Debugging
```python
# Use logging
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.debug("Debug message")
```

## 🚀 Feature Development Workflow

1. **Discuss** the feature in an issue first
2. **Design** the implementation
3. **Implement** with tests
4. **Document** the changes
5. **Submit** a pull request
6. **Iterate** based on feedback

## 📋 Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Commit messages follow conventions
- [ ] PR description is clear and complete

## 🎯 Priority Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- [ ] Additional file format support (DOCX, TXT)
- [ ] Enhanced error handling
- [ ] Performance optimizations
- [ ] Mobile responsiveness improvements
- [ ] Accessibility improvements

### Medium Priority
- [ ] Multi-language support
- [ ] Document organization features
- [ ] Export functionality
- [ ] Advanced search filters
- [ ] User preferences/settings

### Nice to Have
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Drag-and-drop improvements
- [ ] Animation enhancements
- [ ] Custom themes

## 🏗 Architecture Decisions

When proposing architectural changes:

1. **Document** your reasoning
2. **Consider** maintainability
3. **Evaluate** performance impact
4. **Discuss** with maintainers first
5. **Provide** migration path if needed

## 📞 Getting Help

- **Questions?** Open a GitHub Discussion
- **Stuck?** Comment on your PR
- **Bug?** Create an issue

## 🎓 Resources

### Frontend
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Backend
- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

### LLM Service
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangChain Documentation](https://python.langchain.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## ✨ Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Given credit for their contributions

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AI Knowledge Base! 🎉
