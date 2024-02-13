import { Target, SearchedUser } from "../../model/types";
import {
  getUserIdsByUserName,
  getUserIdsByKana,
  getUserIdsByMail,
  getUserIdsByDepartmentName,
  getUserIdsByRoleName,
  getUserIdsByOfficeName,
  getUserIdsBySkillName,
  getUserIdsByGoal,
  getUsersByUserIdsSorted,
} from "./repository";
// import {
//   getUsersByUserName,
//   getUsersByKana,
//   getUsersByMail,
//   getUsersByDepartmentName,
//   getUsersByRoleName,
//   getUsersByOfficeName,
//   getUsersBySkillName,
//   getUsersByGoal,
// } from "./repository";

// export const getUsersByKeyword = async (
//   keyword: string,
//   targets: Target[]
// ): Promise<SearchedUser[]> => {
//   let users: SearchedUser[] = [];
//   for (const target of targets) {
//     const oldLen = users.length;
//     switch (target) {
//       case "userName":
//         users = users.concat(await getUsersByUserName(keyword));
//         break;
//       case "kana":
//         users = users.concat(await getUsersByKana(keyword));
//         break;
//       case "mail":
//         users = users.concat(await getUsersByMail(keyword));
//         break;
//       case "department":
//         users = users.concat(await getUsersByDepartmentName(keyword));
//         break;
//       case "role":
//         users = users.concat(await getUsersByRoleName(keyword));
//         break;
//       case "office":
//         users = users.concat(await getUsersByOfficeName(keyword));
//         break;
//       case "skill":
//         users = users.concat(await getUsersBySkillName(keyword));
//         break;
//       case "goal":
//         users = users.concat(await getUsersByGoal(keyword));
//         break;
//     }
//     console.log(`${users.length - oldLen} users found by ${target}`);
//   }
//   return users;
// };


// --- Additonal

export const getUsersByKeyword = async (
  keyword: string,
  targets: Target[]
): Promise<SearchedUser[]> => {
  let users: SearchedUser[] = [];
  let userIds: string[] = [];

  // プロミスを格納する配列
  const promises: Promise<string[]>[] = [];

  for (const target of targets) {
    // 各ターゲットに対する非同期処理を追加
    switch (target) {
      case "userName":
        promises.push(getUserIdsByUserName(keyword));
        break;
      case "kana":
        promises.push(getUserIdsByKana(keyword));
        break;
      case "mail":
        promises.push(getUserIdsByMail(keyword));
        break;
      case "department":
        promises.push(getUserIdsByDepartmentName(keyword));
        break;
      case "role":
        promises.push(getUserIdsByRoleName(keyword));
        break;
      case "office":
        promises.push(getUserIdsByOfficeName(keyword));
        break;
      case "skill":
        promises.push(getUserIdsBySkillName(keyword));
        break;
      case "goal":
        promises.push(getUserIdsByGoal(keyword));
        break;
    }
  }

  // すべての非同期処理を並列に実行
  const results = await Promise.all(promises);

  // 取得したユーザーIDを結合する
  userIds = results.reduce((acc, val) => acc.concat(val), []);

  // ユーザーIDを用いてユーザー情報を取得
  users = await getUsersByUserIdsSorted(userIds);

  return users;
};







// import { Target, SearchedUser } from "../../model/types";
// import {
//   getUserIdsByUserName,
//   getUserIdsByKana,
//   getUserIdsByMail,
//   getUserIdsByDepartmentName,
//   getUserIdsByRoleName,
//   getUserIdsByOfficeName,
//   getUserIdsBySkillName,
//   getUserIdsByGoal,
//   getUsersByUserIdsSorted,
// } from "./repository";
// // import {
// //   getUsersByUserName,
// //   getUsersByKana,
// //   getUsersByMail,
// //   getUsersByDepartmentName,
// //   getUsersByRoleName,
// //   getUsersByOfficeName,
// //   getUsersBySkillName,
// //   getUsersByGoal,
// // } from "./repository";

// // export const getUsersByKeyword = async (
// //   keyword: string,
// //   targets: Target[]
// // ): Promise<SearchedUser[]> => {
// //   let users: SearchedUser[] = [];
// //   for (const target of targets) {
// //     const oldLen = users.length;
// //     switch (target) {
// //       case "userName":
// //         users = users.concat(await getUsersByUserName(keyword));
// //         break;
// //       case "kana":
// //         users = users.concat(await getUsersByKana(keyword));
// //         break;
// //       case "mail":
// //         users = users.concat(await getUsersByMail(keyword));
// //         break;
// //       case "department":
// //         users = users.concat(await getUsersByDepartmentName(keyword));
// //         break;
// //       case "role":
// //         users = users.concat(await getUsersByRoleName(keyword));
// //         break;
// //       case "office":
// //         users = users.concat(await getUsersByOfficeName(keyword));
// //         break;
// //       case "skill":
// //         users = users.concat(await getUsersBySkillName(keyword));
// //         break;
// //       case "goal":
// //         users = users.concat(await getUsersByGoal(keyword));
// //         break;
// //     }
// //     console.log(`${users.length - oldLen} users found by ${target}`);
// //   }
// //   return users;
// // };


// // --- Additonal

// export const getUsersByKeyword = async (
//   keyword: string,
//   targets: Target[]
// ): Promise<SearchedUser[]> => {
//   let users: SearchedUser[] = [];
//   let userIds: string[] = [];
  
//   for (const target of targets) {
//     const oldLen = users.length;
//     switch (target) {
//       case "userName":
//         userIds = userIds.concat(await getUserIdsByUserName(keyword));
//         break;
//       case "kana":
//         userIds = userIds.concat(await getUserIdsByKana(keyword));
//         break;
//       case "mail":
//         userIds = userIds.concat(await getUserIdsByMail(keyword));
//         break;
//       case "department":
//         userIds = userIds.concat(await getUserIdsByDepartmentName(keyword));
//         break;
//       case "role":
//         userIds = userIds.concat(await getUserIdsByRoleName(keyword));
//         break;
//       case "office":
//         userIds = userIds.concat(await getUserIdsByOfficeName(keyword));
//         break;
//       case "skill":
//         userIds = userIds.concat(await getUserIdsBySkillName(keyword));
//         break;
//       case "goal":
//         userIds = userIds.concat(await getUserIdsByGoal(keyword));
//         break;
//     }
//     console.log(`${users.length - oldLen} users found by ${target}`);
//   }
//   users = await getUsersByUserIdsSorted(userIds);
//   return users;
// };
