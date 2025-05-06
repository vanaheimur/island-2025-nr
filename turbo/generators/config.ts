import type { PlopTypes } from '@turbo/gen'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('nest:p', {
    description: 'generate the boilerplate needed for a NestJS package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should the package be called?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/config.ts',
        templateFile: 'templates/config.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/eslint.config.mjs',
        templateFile: 'templates/eslint.config.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/index.ts',
        templateFile: 'templates/index.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/{{dashCase name}}.module.ts',
        templateFile: 'templates/module.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/package.json',
        templateFile: 'templates/package.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/{{dashCase name}}.service.ts',
        templateFile: 'templates/service.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/tsconfig.build.json',
        templateFile: 'templates/tsconfig.build.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/tsconfig.json',
        templateFile: 'templates/tsconfig.txt',
      },
      {
        type: 'add',
        path: 'packages/repo-{{dashCase name}}/types.ts',
        templateFile: 'templates/types.txt',
      },
    ],
  })
}
