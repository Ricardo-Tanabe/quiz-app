# Quiz-App
O objetivo do projeto é criar um Quiz App.

Link para o [Projeto Quiz App](https://roadmap.sh/projects/quiz-app)

## Requisitos
 - Apresentar um botão "Iniciar" e detalhes sobre o quiz.
 - Após iniciar, exibir a primeira pergunta de múltipla escolha em formato de "card", com as respostas como botões.
 - Ao selecionar uma resposta, os botões devem indicar visualmente (vermelho/verde) se a escolha está correta ou incorreta, mostrando também a resposta certa.
 - Incrementar a pontuação para cada resposta correta.
 - Ao término do quiz, apresentar a pontuação final e um resumo dos resultados.
 - Opcional: Implementar um temporizador de 1 minuto por pergunta; caso o usuário não responda nesse período, avançar para a próxima pergunta e decrementar a pontuação em 1 (Não implementado).

## Ferramentas utilizadas no desenvolvimento

- HTML
- [Tailwind CSS](https://tailwindcss.com/): Framework
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
    - Framework: [Nextjs](https://nextjs.org/)
    - Servidor: [Descrito abaixo](#getting-started)
- [VS Code Studio](https://code.visualstudio.com/)

___

## Next.js default README.md

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
