/*
  Warnings:

  - You are about to drop the column `buttonUrl` on the `Game` table. All the data in the column will be lost.
  - Added the required column `gamePageUrl` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "logoUrl" TEXT,
    "description" TEXT,
    "gamePageUrl" TEXT NOT NULL,
    "buttonText" TEXT,
    "originalPrice" REAL,
    "currentPrice" REAL,
    "discount" INTEGER,
    "isFavorite" BOOLEAN,
    "displayArea" TEXT NOT NULL
);
INSERT INTO "new_Game" ("buttonText", "currentPrice", "description", "discount", "displayArea", "id", "imageUrl", "isFavorite", "logoUrl", "originalPrice", "title") SELECT "buttonText", "currentPrice", "description", "discount", "displayArea", "id", "imageUrl", "isFavorite", "logoUrl", "originalPrice", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_gamePageUrl_key" ON "Game"("gamePageUrl");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
