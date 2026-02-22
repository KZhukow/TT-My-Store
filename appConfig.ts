import { config as cfg } from 'dotenv';

const envFileNames = {
  local: '.env.local',
};

cfg({ path: [envFileNames.local, '.env'] });

/**
 * Функция для получения значения из переменной окружения
 * @param key Имя ключа
 * @returns Значение переменной
 */
function getEnvData(key: string): string {
  const data = process.env[key];

  if (data === undefined) {
    throw Error(`Ошибка при инициализации параметров приложения.
      Возникла при попытке получить значение параметра ${key} из переменных окружения.
      Возможные причины ошибки:
        1) Переменная ${key} отсутствует в файле окружения`);
  }

  return data;
}

const config = {
  projectName: 'MyStore',
  baseURL: getEnvData('BASE_URL'),
  location: getEnvData('LOCATION'),
};

export default config;
