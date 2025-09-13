// index.js
import 'dotenv/config';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const psnApi = require('psn-api');
const fs    = require('fs');

const {
  // Autenticação
  exchangeNpssoForAccessCode,
  exchangeAccessCodeForAuthTokens,
  exchangeRefreshTokenForAuthTokens,

  // Busca genérica
  makeUniversalSearch,

  // Usuários / presença
  getProfileFromUserName,
  getProfileFromAccountId,
  getUserFriendsAccountIds,
  getBasicPresence,
  getUserRegion,
  getProfileShareableLink,

  // Troféus
  getTitleTrophies,
  getTitleTrophyGroups,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  getUserTrophyGroupEarningsForTitle,
  getUserTrophyProfileSummary,
  getUserTrophiesForSpecificTitle,
  getRecentlyPlayedGames,
  getUserPlayedGames
} = psnApi;

// Se quiser a enum de raridade
const { TrophyRarity } = psnApi;

// Mapeamento simples de raridade
const rarityMap = {
  [TrophyRarity.VeryRare]: 'Very Rare',
  [TrophyRarity.UltraRare]: 'Ultra Rare',
  [TrophyRarity.Rare]:      'Rare',
  [TrophyRarity.Common]:    'Common',
};

async function main() {
  // 1) Authenticate
  const accessCode = await exchangeNpssoForAccessCode(process.env.NPSSO);
  const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

  const targetAccountId = process.env.AccountId

  // 3) Lista de jogos com troféus
  const { trophyTitles } = await getUserTitles(
    authorization,
    targetAccountId,
  );

  const games = [];
  for (const title of trophyTitles) {
    // 4) lista de todos troféus do jogo
    const { trophies: titleTrophies } = await getTitleTrophies(
      authorization,
      title.npCommunicationId,
      'all',
      {
        npServiceName:
          title.trophyTitlePlatform.includes('PS5') ? 'trophy2' : 'trophy'
      }
    );

    // 5) troféus conquistados
    const { trophies: earnedTrophies } = await getUserTrophiesEarnedForTitle(
      authorization,
      targetAccountId,
      title.npCommunicationId,
      'all',
      {
        npServiceName:
          title.trophyTitlePlatform.includes('PS5') ? 'trophy2' : 'trophy'
      }
    );

    // 6) merge e normalize
    const merged = mergeTrophyLists(titleTrophies, earnedTrophies);

    games.push({
      gameName:        title.trophyTitleName,
      platform:        title.trophyTitlePlatform,
      image:            title.trophyTitleIconUrl,
      trophyTypeCounts: title.definedTrophies,
      earnedCounts:     title.earnedTrophies,
      trophyList:       merged
    });
  }

  // 7) grava JSON
  fs.writeFileSync(
    './games.json',
    JSON.stringify(games, null, 2),
    'utf8'
  );
  console.log('✅ Arquivo games.json gerado com', games.length, 'jogos.');
}

// junta listas de troféus
function mergeTrophyLists(titleTrophies, earnedTrophies) {
  return earnedTrophies.map(earned => {
    const found = titleTrophies.find(t => t.trophyId === earned.trophyId) || {};
    return normalizeTrophy({ ...found, ...earned });
  });
}

// normaliza cada troféu num objeto plano
function normalizeTrophy(trophy) {
  return {
    isEarned:   !!trophy.earned,
    earnedOn:   trophy.earned ? trophy.earnedDateTime : 'unearned',
    type:       trophy.trophyType,
    rarity:     rarityMap[trophy.trophyRare] || 'Unknown',
    earnedRate: Number(trophy.trophyEarnedRate || 0),
    trophyName: trophy.trophyName,
    trophyDetail: trophy.trophyDetail,
    trophyImg: trophy.trophyIconUrl,
    groupId:    trophy.trophyGroupId
  };
}

main().catch(err => {
  console.error('❌ Erro fatal:', err);
  //process.exit(1);
});
