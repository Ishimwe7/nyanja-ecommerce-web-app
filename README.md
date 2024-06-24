# React E-commerce Web App with TypeScript and Vite

This template provides a minimal setup to get a React e-commerce web application working in Vite.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
  - [Key Components and Pages](#key-components-and-pages)
- [Conclusion](#conclusion)

## Getting Started

### Installation

To create a new project using this template, run the following commands:

```sh
npm create vite@latest my-ecommerce-app --template react-ts
cd my-ecommerce-app
npm install
```

### To run the project

1. Clone this repo first by:
   git clone https://github.com/Ishimwe7/nyanja-ecommerce-web-app.git
2. In root directory access the terminal and run:
   npm run dev

### Hosted Version on netlify:

**https://nyanja-shopping-mall.netlify.app/**

## Project Structure

### Key components and pages

nyanja-ecommerce-web-app/  
├── public/  
│ └── \_redirects  
├── src/  
│ ├── assets/  
│ │ └── pictures/  
│ ├── components/  
│ │ ├── AdminDashboard.tsx  
│ │ ├── footer.tsx  
│ │ ├── header.tsx  
│ │ ├── ProductItem.tsx  
│ │ ├── Cart.tsx  
│ │ ├── loginForm.tsx  
│ │ ├── Orders.tsx  
│ │ ├── ProductPage.tsx  
│ │ ├── CartPage.tsx  
│ │ ├── registration.tsx  
│ │ └── AddProduct.tsx  
│ ├── App.tsx  
│ ├── main.tsx  
│ └── index.css  
├── .eslintrc.js  
├── tsconfig.json  
├── tsconfig.node.json  
├── vite.config.ts  
└── package.json

## Conclusion

This setup provides a solid foundation for building a React e-commerce web application with TypeScript and Vite. By structuring the project as suggested, you can ensure a clean and maintainable codebase.
