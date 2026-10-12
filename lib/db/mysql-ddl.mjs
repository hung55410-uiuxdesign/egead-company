/**
 * MySQL DDL used by auth bootstrap and seed.
 * Types follow Prisma's MySQL defaults (VARCHAR(191), DATETIME(3), TINYINT(1), JSON).
 */
export const MYSQL_DDL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS \`user\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NOT NULL,
    \`email\` VARCHAR(191) NOT NULL,
    \`emailVerified\` TINYINT(1) NOT NULL DEFAULT 0,
    \`image\` VARCHAR(191) NULL,
    \`role\` VARCHAR(191) NULL DEFAULT 'admin',
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`user_email_key\` (\`email\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`session\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`expiresAt\` DATETIME(3) NOT NULL,
    \`token\` VARCHAR(191) NOT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`ipAddress\` VARCHAR(191) NULL,
    \`userAgent\` VARCHAR(191) NULL,
    \`userId\` VARCHAR(191) NOT NULL,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`session_token_key\` (\`token\`),
    INDEX \`session_userId_idx\` (\`userId\`),
    CONSTRAINT \`session_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`account\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`accountId\` VARCHAR(191) NOT NULL,
    \`providerId\` VARCHAR(191) NOT NULL,
    \`userId\` VARCHAR(191) NOT NULL,
    \`accessToken\` TEXT NULL,
    \`refreshToken\` TEXT NULL,
    \`idToken\` TEXT NULL,
    \`accessTokenExpiresAt\` DATETIME(3) NULL,
    \`refreshTokenExpiresAt\` DATETIME(3) NULL,
    \`scope\` VARCHAR(191) NULL,
    \`password\` VARCHAR(191) NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`account_providerId_accountId_key\` (\`providerId\`, \`accountId\`),
    INDEX \`account_userId_idx\` (\`userId\`),
    CONSTRAINT \`account_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`verification\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`identifier\` VARCHAR(191) NOT NULL,
    \`value\` VARCHAR(191) NOT NULL,
    \`expiresAt\` DATETIME(3) NOT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`category\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NOT NULL,
    \`slug\` VARCHAR(191) NOT NULL,
    \`description\` VARCHAR(191) NULL,
    \`icon\` VARCHAR(191) NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`category_name_key\` (\`name\`),
    UNIQUE KEY \`category_slug_key\` (\`slug\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`post\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`slug\` VARCHAR(191) NOT NULL,
    \`title\` VARCHAR(191) NOT NULL,
    \`subtitle\` VARCHAR(191) NULL,
    \`tag\` VARCHAR(191) NOT NULL DEFAULT 'General',
    \`categoryName\` VARCHAR(191) NOT NULL DEFAULT 'E-Commerce',
    \`categoryId\` VARCHAR(191) NULL,
    \`date\` VARCHAR(191) NOT NULL,
    \`readTime\` VARCHAR(191) NOT NULL DEFAULT '5 mins read',
    \`heroImage\` VARCHAR(191) NOT NULL DEFAULT '/assets/case_brother.jpg',
    \`excerpt\` TEXT NOT NULL,
    \`content\` TEXT NOT NULL,
    \`authorName\` VARCHAR(191) NOT NULL DEFAULT 'E-GEAD Team',
    \`authorRole\` VARCHAR(191) NULL DEFAULT 'Editor',
    \`authorAvatar\` VARCHAR(191) NULL,
    \`authorId\` VARCHAR(191) NULL,
    \`status\` VARCHAR(191) NOT NULL DEFAULT 'draft',
    \`views\` INTEGER NOT NULL DEFAULT 0,
    \`featured\` TINYINT(1) NOT NULL DEFAULT 0,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`post_slug_key\` (\`slug\`),
    INDEX \`post_slug_idx\` (\`slug\`),
    INDEX \`post_status_idx\` (\`status\`),
    INDEX \`post_categoryId_idx\` (\`categoryId\`),
    CONSTRAINT \`post_categoryId_fkey\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT \`post_authorId_fkey\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`team_member\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`name\` VARCHAR(191) NOT NULL,
    \`role\` VARCHAR(191) NOT NULL,
    \`department\` VARCHAR(191) NOT NULL,
    \`location\` VARCHAR(191) NOT NULL,
    \`quote\` TEXT NULL,
    \`image\` VARCHAR(191) NOT NULL,
    \`linkedin\` VARCHAR(191) NULL,
    \`bio\` TEXT NOT NULL,
    \`skills\` JSON NOT NULL,
    \`isLeader\` TINYINT(1) NOT NULL DEFAULT 0,
    \`order\` INTEGER NOT NULL DEFAULT 0,
    \`status\` VARCHAR(191) NOT NULL DEFAULT 'published',
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    INDEX \`team_member_department_idx\` (\`department\`),
    INDEX \`team_member_isLeader_idx\` (\`isLeader\`),
    INDEX \`team_member_status_idx\` (\`status\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`leader_hierarchy\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`leaderId\` VARCHAR(191) NOT NULL,
    \`departmentScope\` VARCHAR(191) NOT NULL,
    \`overview\` TEXT NOT NULL,
    \`childNodes\` JSON NOT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`leader_hierarchy_leaderId_key\` (\`leaderId\`),
    CONSTRAINT \`leader_hierarchy_leaderId_fkey\` FOREIGN KEY (\`leaderId\`) REFERENCES \`team_member\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,

  `CREATE TABLE IF NOT EXISTS \`contact_inquiry\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`firstName\` VARCHAR(191) NOT NULL,
    \`lastName\` VARCHAR(191) NOT NULL,
    \`fullName\` VARCHAR(191) NOT NULL,
    \`company\` VARCHAR(191) NOT NULL,
    \`email\` VARCHAR(191) NOT NULL,
    \`phone\` VARCHAR(191) NULL,
    \`region\` VARCHAR(191) NOT NULL,
    \`message\` TEXT NOT NULL,
    \`status\` VARCHAR(191) NOT NULL DEFAULT 'new',
    \`notes\` TEXT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`),
    INDEX \`contact_inquiry_status_idx\` (\`status\`),
    INDEX \`contact_inquiry_email_idx\` (\`email\`)
  ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
];
