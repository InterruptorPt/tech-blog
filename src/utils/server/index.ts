import fs from 'fs/promises'
import path from 'path'

export const BLOG_FILES_FOLDER = path.join(process.cwd(), '/content/blog/')

export const doesFileExist = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath)

    return true
  } catch (e) {
    return false
  }
}
