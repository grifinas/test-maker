import { open, close, write, existsSync, mkdirSync } from 'fs';

export async function saveFile(path: string, content: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.substring(0, path.lastIndexOf('/'));

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    open(`${path}`, 'w', (err, fd) => {
      if (err) {
        reject(err);
        return;
      }
      write(fd, content, (err, fd) => {
        if (err) {
          reject(err);
          return;
        }
        close(fd, () => {
          resolve();
        });
      });
    });
  });
}
