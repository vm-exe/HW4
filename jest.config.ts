import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy', // Soporte para estilos
  },
  
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignorar paths innecesarios
};

export default config;
