CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`answers` text NOT NULL,
	`score` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `attempts_owner_created` ON `attempts` (`owner`,`created_at`);--> statement-breakpoint
CREATE TABLE `journal` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`situation` text NOT NULL,
	`lesson` text NOT NULL,
	`law` integer,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `journal_owner_created` ON `journal` (`owner`,`created_at`);--> statement-breakpoint
CREATE TABLE `notes` (
	`owner` text NOT NULL,
	`law` integer NOT NULL,
	`body` text NOT NULL,
	`updated_at` text NOT NULL,
	PRIMARY KEY(`owner`, `law`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`owner` text PRIMARY KEY NOT NULL,
	`answers` text NOT NULL,
	`updated_at` text NOT NULL
);
