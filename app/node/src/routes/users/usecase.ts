import { Target, SearchedUser } from "../../model/types";
import {
  getUsersByUserName,
  getUsersByKana,
  getUsersByMail,
  getUsersByDepartmentName,
  getUsersByRoleName,
  getUsersByOfficeName,
  getUsersBySkillName,
  getUsersByGoal,
  getUserIdsByDepartmentName,
  getUserIdsByRoleName,
  getUserIdsByOfficeName,
  getUserIdsBySkillName,
  getUsersFromQuery,
} from "./repository";

export const getUsersByKeyword = async (
  keyword: string,
  targets: Target[]
): Promise<SearchedUser[]> => {
  let users: SearchedUser[] = [];
  for (const target of targets) {
    const oldLen = users.length;
    switch (target) {
      case "userName":
        users = users.concat(await getUsersByUserName(keyword));
        break;
      case "kana":
        users = users.concat(await getUsersByKana(keyword));
        break;
      case "mail":
        users = users.concat(await getUsersByMail(keyword));
        break;
      case "department":
        users = users.concat(await getUsersByDepartmentName(keyword));
        break;
      case "role":
        users = users.concat(await getUsersByRoleName(keyword));
        break;
      case "office":
        users = users.concat(await getUsersByOfficeName(keyword));
        break;
      case "skill":
        users = users.concat(await getUsersBySkillName(keyword));
        break;
      case "goal":
        users = users.concat(await getUsersByGoal(keyword));
        break;
    }
    console.log(`${users.length - oldLen} users found by ${target}`);
  }
  return users;
};

export const getUsersByKeyword_2 = async (
  keyword: string,
  targets: Target[]
): Promise<SearchedUser[]> => {
  let users: SearchedUser[] = [];
  let userIds: string[] = [];
  let query = `SELECT user_id, user_name, kana, entry_date, office_id, user_icon_id FROM user WHERE`;
  const values: any[] = [];

  for (const target of targets) {
    const oldLen = users.length;
    switch (target) {
      case "userName":
        query += ` user_name LIKE ? OR`;
        values.push(`%${keyword}%`);
        //userIds = userIds.concat(await getUserIdsByUserName(keyword));
        break;
      case "kana":
        query += ` kana LIKE ? OR`;
        values.push(`%${keyword}%`);
        //userIds = userIds.concat(await getUserIdsByKana(keyword));
        break;
      case "mail":
        query += ` mail LIKE ? OR`;
        values.push(`%${keyword}%`);
        //userIds = userIds.concat(await getUserIdsByMail(keyword));
        break;
      case "department":
        userIds = userIds.concat(await getUserIdsByDepartmentName(keyword));
        break;
      case "role":
        userIds = userIds.concat(await getUserIdsByRoleName(keyword));
        break;
      case "office":
        userIds = userIds.concat(await getUserIdsByOfficeName(keyword));
        break;
      case "skill":
        userIds = userIds.concat(await getUserIdsBySkillName(keyword));
        break;
      case "goal":
        query += ` goal LIKE ? OR`;
        values.push(`%${keyword}%`);
        //userIds = userIds.concat(await getUserIdsByGoal(keyword));
        break;
    }
    //Remove the last " OR"
    query += ` user_id IN (${userIds.map(() => "?").join(",")})`;
    //query string

    
    console.log(`${users.length - oldLen} users found by ${target}`);
  }
  // Get users by userIds
  users = users.concat(await getUsersFromQuery(query,values));
  
  return users;
};

