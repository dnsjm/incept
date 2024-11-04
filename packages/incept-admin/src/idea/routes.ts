//types
import type { Directory } from 'ts-morph';
import type Registry from '@stackpress/incept-spec/dist/Registry';

export default function generate(directory: Directory, registry: Registry) {
  //loop through models
  for (const model of registry.model.values()) {
    const file = `${model.name}/admin/routes.ts`;
    const source = directory.createSourceFile(file, '', { overwrite: true });
    //import type { AllRouter } from '@stackpress/incept-ingest/dist/types';
    source.addImportDeclaration({
      isTypeOnly: true,
      moduleSpecifier: '@stackpress/incept-ingest/dist/types',
      namedImports: [ 'AllRouter' ]
    });
    //import path from 'path';
    source.addImportDeclaration({
      moduleSpecifier: 'path',
      defaultImport: 'path'
    });
    //export default function route(root: string, router: AllRouter) {}
    source.addFunction({
      isDefaultExport: true,
      name: 'route',
      parameters: [
        { name: 'root', type: 'string' },
        { name: 'router', type: 'AllRouter' }
      ],
      statements: `
        router.all(\`\${root}/${model.dash}/search\`, path.resolve(__dirname, 'search'));
        router.all(\`\${root}/${model.dash}/create\`, path.resolve(__dirname, 'create'));
        router.all(\`\${root}/${model.dash}/detail/:id\`, path.resolve(__dirname, 'detail'));
        router.all(\`\${root}/${model.dash}/update/:id\`, path.resolve(__dirname, 'update'));
        router.all(\`\${root}/${model.dash}/remove/:id\`, path.resolve(__dirname, 'remove'));
        router.all(\`\${root}/${model.dash}/restore/:id\`, path.resolve(__dirname, 'restore'));
      `.trim()
    });
  }
};