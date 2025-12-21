import { Project, SyntaxKind } from "ts-morph";
import { JsxEmit } from "typescript";

/**
 * Rewrites TypeScript/TSX import paths using AST manipulation
 */
export function rewriteImports(
  sourceCode: string,
  rewriteMap: Record<string, string>,
): string {
  // Create an in-memory TypeScript project
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: JsxEmit.React,
      allowJs: true,
    },
  });

  // Create a source file in memory
  const sourceFile = project.createSourceFile("temp.tsx", sourceCode);

  // Find all import declarations
  const importDeclarations = sourceFile.getImportDeclarations();

  for (const importDecl of importDeclarations) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    // Check if this import matches any of our rewrite rules
    for (const [from, to] of Object.entries(rewriteMap)) {
      if (moduleSpecifier.startsWith(from)) {
        // Rewrite the import path
        const newPath = moduleSpecifier.replace(from, to);
        importDecl.setModuleSpecifier(newPath);
      }
    }
  }

  // Also handle dynamic imports: import("@/registry/ui/...")
  sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const expression = call.getExpression();

    // Check if this is an import() call
    if (expression.getKind() === SyntaxKind.ImportKeyword) {
      const args = call.getArguments();
      if (args.length > 0) {
        const firstArg = args[0];

        // Check if it's a string literal
        if (firstArg.getKind() === SyntaxKind.StringLiteral) {
          const stringLiteral = firstArg.asKind(SyntaxKind.StringLiteral);
          if (stringLiteral) {
            const currentValue = stringLiteral.getLiteralValue();

            // Apply rewrite rules
            for (const [from, to] of Object.entries(rewriteMap)) {
              if (currentValue.startsWith(from)) {
                const newValue = currentValue.replace(from, to);
                stringLiteral.setLiteralValue(newValue);
              }
            }
          }
        }
      }
    }
  });

  // Return the modified source code
  return sourceFile.getFullText();
}

/**
 * Convenience function for the common case of rewriting registry imports
 */
export function rewriteRegistryImports(sourceCode: string): string {
  return rewriteImports(sourceCode, {
    "@/registry/ui/": "@/components/ui/",
    "@/registry/lib/": "@/lib/",
    "@/registry/hooks/": "@/hooks/",
  });
}
