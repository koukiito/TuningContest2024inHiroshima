import { RowDataPacket } from "mysql2";
import pool from "../../util/mysql";
import { File } from "../../model/types";

export const getFileByFileId = async (
  fileId: string
): Promise<File | undefined> => {
  const [file] = await pool.query<RowDataPacket[]>(
    "SELECT file_name, path FROM file WHERE file_id = ?",
    [fileId]
  );
  if (file.length === 0) {
    return;
  }

  return {
    fileName: file[0].file_name,
    path: file[0].path,
  };
};

export const getResizedFileByFileId = async (
  fileId: string
): Promise<string | undefined> => {
  const [file] = await pool.query<RowDataPacket[]>(
    "SELECT path FROM file_resized WHERE file_id = ?",
    [fileId]
  );
  if (file.length === 0) {
    return;
  }

  return  file[0].path;
};

export const addResizedFileByFileId = async (
  fileId: string,
  path: string
): Promise<void> => {
  const [file] = await pool.query<RowDataPacket[]>(
    "INSERT INTO file_resized (file_id = ?, path = ?)",
    [fileId, path]
  );
  if (file.length === 0) {
    return;
  }

  return;
};
