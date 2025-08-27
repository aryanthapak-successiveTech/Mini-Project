import path from 'path';
import { fileURLToPath } from 'url';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load all .graphql files inside src/modules recursively
const typesArray = loadFilesSync(path.join(__dirname, '../Modules/**/*.graphql'));

// Merge all type definitions into a single schema
export const typeDefs = mergeTypeDefs(typesArray);


