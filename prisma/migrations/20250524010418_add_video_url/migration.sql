-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
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
INSERT INTO "new_Game" ("buttonText", "currentPrice", "description", "displayArea", "gamePageUrl", "id", "imageUrl", "isFavorite", "logoUrl", "originalPrice", "title", "videoUrl") SELECT "buttonText", "currentPrice", "description", "displayArea", "gamePageUrl", "id", "imageUrl", "isFavorite", "logoUrl", "originalPrice", "title", "videoUrl" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_gamePageUrl_key" ON "Game"("gamePageUrl");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
