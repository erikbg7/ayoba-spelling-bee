const BASE_URL = 'https://freebee.fun';

const getRandomChallenge = async () => {
  const response = await fetch(BASE_URL + '/cgi-bin/random');
  const data = await response.json();
  return data;
};

const getDailyChallenge = async () => {
  const response = await fetch(BASE_URL + '/cgi-bin/today');
  const data = await response.json();
  return data;
};

export { getRandomChallenge, getDailyChallenge };
