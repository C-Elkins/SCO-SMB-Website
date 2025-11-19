CREATE TABLE IF NOT EXISTS "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"email" varchar(255),
	"role" varchar(20) DEFAULT 'admin',
	"created_at" timestamp DEFAULT now(),
	"last_login" timestamp,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "admin_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"company" varchar(255),
	"address" text,
	"notes" text,
	"total_spent" integer DEFAULT 0,
	"status" varchar(20) DEFAULT 'active',
	"created_at" timestamp DEFAULT now(),
	"last_activity" timestamp,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "download_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"license_key_id" uuid,
	"download_date" timestamp DEFAULT now(),
	"platform" varchar(50),
	"version" varchar(20),
	"ip_address" varchar(45),
	"user_agent" text,
	"success" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "license_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key_code" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'unused' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"created_by" varchar(100),
	"activated_at" timestamp,
	"expires_at" timestamp,
	"download_count" integer DEFAULT 0,
	"max_downloads" integer DEFAULT 3,
	"notes" text,
	"customer_email" varchar(255),
	"customer_name" varchar(255),
	"customer_company" varchar(255),
	CONSTRAINT "license_keys_key_code_unique" UNIQUE("key_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portal_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tech_portal_password_hash" varchar(255),
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "system_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" text NOT NULL,
	"updated_by" varchar(100),
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "system_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "download_logs" ADD CONSTRAINT "download_logs_license_key_id_license_keys_id_fk" FOREIGN KEY ("license_key_id") REFERENCES "public"."license_keys"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
