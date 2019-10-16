CREATE TABLE "user_account" (
	"user_id" serial NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT "user_account_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user" (
	"user_id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"about_me" varchar(3000) NOT NULL,
	"profile_picture_id" varchar(255) NOT NULL,
	"email_address" varchar(255) NOT NULL UNIQUE,
	"mobile" varchar(15) NOT NULL UNIQUE,
	CONSTRAINT "user_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_image" (
	"image_id" serial NOT NULL,
	"key" varchar(255) NOT NULL UNIQUE,
	"access" varchar(255) NOT NULL UNIQUE DEFAULT '"Public"',
	"user_id" bigint NOT NULL UNIQUE,
	CONSTRAINT "user_image_pk" PRIMARY KEY ("image_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_location" (
	"user_id" bigint NOT NULL,
	"latitude" double NOT NULL,
	"longitude" double NOT NULL,
	"current_time" TIMESTAMP NOT NULL,
	CONSTRAINT "user_location_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "project" (
	"project_id" serial NOT NULL,
	"owner_id" bigint NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(3000),
	"external_link" varchar(255),
	"created_at" TIMESTAMP(3000) NOT NULL,
	CONSTRAINT "project_pk" PRIMARY KEY ("project_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "project_comment" (
	"comment_id" serial NOT NULL,
	"commenter_id" bigint NOT NULL,
	"project_id" bigint(3000) NOT NULL,
	"content" varchar(3000) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT "project_comment_pk" PRIMARY KEY ("comment_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "project_follow" (
	"follow_id" serial NOT NULL,
	"follower_id" serial NOT NULL,
	"project_id" serial NOT NULL,
	CONSTRAINT "project_follow_pk" PRIMARY KEY ("follow_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "project_member_requests" (
	"user_id" bigint NOT NULL,
	"project_id" bigint NOT NULL,
	"is_rejected" bool NOT NULL DEFAULT 'false',
	"is_accepted" bool NOT NULL DEFAULT 'false',
	"request_time" TIMESTAMP NOT NULL,
	"response_time" bool
) WITH (
  OIDS=FALSE
);




ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("user_id") REFERENCES "user_account"("user_id");
ALTER TABLE "user" ADD CONSTRAINT "user_fk1" FOREIGN KEY ("profile_picture_id") REFERENCES "user_image"("image_id");

ALTER TABLE "user_image" ADD CONSTRAINT "user_image_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");

ALTER TABLE "user_location" ADD CONSTRAINT "user_location_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");

ALTER TABLE "project" ADD CONSTRAINT "project_fk0" FOREIGN KEY ("owner_id") REFERENCES "user"("user_id");

ALTER TABLE "project_comment" ADD CONSTRAINT "project_comment_fk0" FOREIGN KEY ("commenter_id") REFERENCES "user"("user_id");
ALTER TABLE "project_comment" ADD CONSTRAINT "project_comment_fk1" FOREIGN KEY ("project_id") REFERENCES "project"("project_id");

ALTER TABLE "project_follow" ADD CONSTRAINT "project_follow_fk0" FOREIGN KEY ("follower_id") REFERENCES "user"("user_id");
ALTER TABLE "project_follow" ADD CONSTRAINT "project_follow_fk1" FOREIGN KEY ("project_id") REFERENCES "project"("project_id");

ALTER TABLE "project_member_requests" ADD CONSTRAINT "project_member_requests_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("user_id");
ALTER TABLE "project_member_requests" ADD CONSTRAINT "project_member_requests_fk1" FOREIGN KEY ("project_id") REFERENCES "project"("project_id");
ALTER TABLE "project_member_requests" ADD CONSTRAINT "project_member_requests_fk2" FOREIGN KEY ("is_accepted") REFERENCES "project"("project_id");

