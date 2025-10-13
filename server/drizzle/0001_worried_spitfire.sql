ALTER TABLE "projects" ALTER COLUMN "features" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "features" SET DEFAULT '[]'::json;