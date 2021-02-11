let dotenv = require('dotenv');

// Set default to "development"
const nodeEnv = process.env.ENV_FILE || 'development';

const dotenv_result = dotenv.config({
    path: `${__dirname}/${nodeEnv}.env`,
});

if (dotenv_result.error) {
    throw dotenv_result.error;
}
