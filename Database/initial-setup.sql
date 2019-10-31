-- Roles to create: vac_postgraphile, vac_anonymous, vac_user

-- Creating Extensions
CREATE EXTENSION IF NOT EXISTS uuid-ossp;
CREATE EXTENSION IF NOT EXISTS pgcrypto; 

-- Creating Schemas
CREATE SCHEMA private;

CREATE TABLE public.user (
	user_id SERIAL NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	about_me VARCHAR(3000) NOT NULL,
	profile_picture_id VARCHAR(255) NOT NULL,
	email_address VARCHAR(255) NOT NULL UNIQUE,
	mobile VARCHAR(15) NOT NULL UNIQUE,
	CONSTRAINT user_pk PRIMARY KEY (user_id)
);

CREATE TABLE private.user_account (
	user_id SERIAL NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	CONSTRAINT user_account_pk PRIMARY KEY (user_id)
);

CREATE TABLE public.user_image (
	image_id SERIAL NOT NULL,
	key VARCHAR(255) NOT NULL UNIQUE,
	access VARCHAR(255) NOT NULL UNIQUE DEFAULT 'public',
	user_id BIGINT NOT NULL UNIQUE,
	CONSTRAINT user_image_pk PRIMARY KEY (image_id)
);

CREATE TABLE public.user_location (
	user_id BIGINT NOT NULL,
	latitude double NOT NULL,
	longitude double NOT NULL,
	current_time TIMESTAMP NOT NULL,
	CONSTRAINT user_location_pk PRIMARY KEY (user_id)
);

CREATE TABLE public.project (
	project_id SERIAL NOT NULL,
	owner_id BIGINT NOT NULL,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(3000),
	external_link VARCHAR(255),
	created_at TIMESTAMP(3000) NOT NULL,
	CONSTRAINT project_pk PRIMARY KEY (project_id)
);

CREATE TABLE public.project_comment (
	comment_id SERIAL NOT NULL,
	commenter_id BIGINT NOT NULL,
	project_id BIGINT(3000) NOT NULL,
	content VARCHAR(3000) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	CONSTRAINT project_comment_pk PRIMARY KEY (comment_id)
);

CREATE TABLE public.project_follow (
	follow_id SERIAL NOT NULL,
	follower_id SERIAL NOT NULL,
	project_id SERIAL NOT NULL,
	CONSTRAINT project_follow_pk PRIMARY KEY (follow_id)
);

CREATE TABLE public.project_member_requests (
	user_id BIGINT NOT NULL,
	project_id BIGINT NOT NULL,
	is_rejected bool NOT NULL DEFAULT 'false',
	is_accepted bool NOT NULL DEFAULT 'false',
	request_time TIMESTAMP NOT NULL,
	response_time bool
);

-- Creating jwt token datatype for Postgraphile 
-- (See: https://www.graphile.org/postgraphile/jwt-guide/) and
-- (See: https://www.graphile.org/postgraphile/postgresql-schema-design/#logging-in)
CREATE TYPE public.jwt_token AS (
	role TEXT,
	user_id INTEGER,
	exp INTEGER
);

-- Foreign Key Constraints
ALTER TABLE public.user ADD CONSTRAINT user_fk0 FOREIGN KEY (user_id) REFERENCES user_account(user_id);
ALTER TABLE public.user ADD CONSTRAINT user_fk1 FOREIGN KEY (profile_picture_id) REFERENCES user_image(image_id);

ALTER TABLE public.user_image ADD CONSTRAINT user_image_fk0 FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE public.user_location ADD CONSTRAINT user_location_fk0 FOREIGN KEY (user_id) REFERENCES user(user_id);

ALTER TABLE public.project ADD CONSTRAINT project_fk0 FOREIGN KEY (owner_id) REFERENCES user(user_id);

ALTER TABLE public.project_comment ADD CONSTRAINT project_comment_fk0 FOREIGN KEY (commenter_id) REFERENCES user(user_id);
ALTER TABLE public.project_comment ADD CONSTRAINT project_comment_fk1 FOREIGN KEY (project_id) REFERENCES project(project_id);

ALTER TABLE public.project_follow ADD CONSTRAINT project_follow_fk0 FOREIGN KEY (follower_id) REFERENCES user(user_id);
ALTER TABLE public.project_follow ADD CONSTRAINT project_follow_fk1 FOREIGN KEY (project_id) REFERENCES project(project_id);

ALTER TABLE public.project_member_requests ADD CONSTRAINT project_member_requests_fk0 FOREIGN KEY (user_id) REFERENCES user(user_id);
ALTER TABLE public.project_member_requests ADD CONSTRAINT project_member_requests_fk1 FOREIGN KEY (project_id) REFERENCES project(project_id);
ALTER TABLE public.project_member_requests ADD CONSTRAINT project_member_requests_fk2 FOREIGN KEY (is_accepted) REFERENCES project(project_id);

-- Documenting Tables
COMMENT ON TABLE public.user IS 'Non-sensitive data of a user';
COMMENT ON TABLE private.user_account IS 'Sensitive user data';
COMMENT ON TABLE public.user_image IS 'An image tied to a user''s personal account';
COMMENT ON TABLE public.user_location IS 'A record of a user''s location at some point in time';
COMMENT ON TABLE public.project IS 'An available project for users to be a part of';
COMMENT ON TABLE public.project_comment IS 'A comment on a project from a user';
COMMENT ON TABLE public.project_member_request IS 'A user request to be a part of a project';

-- Create Functions
CREATE FUNCTION public.register_user(
	email TEXT,
	password TEXT
) RETURNS public.jwt_token AS $$
DECLARE
	user public.user;
	NOW_SECONDS INTEGER;
	MIN_PASSWORD_LENGTH INTEGER;
BEGIN
	MIN_PASSWORD_LENGTH = 6;
	IF char_length(password) < MIN_PASSWORD_LENGTH OR position(' ' in password) > 0 THEN
		RAISE EXCEPTION 'Invalid password. Must not have spaces and contain 6 or more characters';
	ELSE
		IF (SELECT COUNT(*) FROM private.user_account WHERE user_account.email ILIKE $3) > 0 THEN
			RAISE EXCEPTION 'This email address is already in use. Please sign up with a different email address.';
		END IF;

		INSERT INTO private.user_account (user_id, email, password_hash) 
			VALUES (user.user_id, email, crypt(password, gen_salt('bf')));

		NOW_SECONDS = EXTRACT(epoch FROM current_timestamp);
		RETURN ('vac_user', user.user_id, NOW_SECONDS + 7776000)::public.jwt_token;
	END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

-- Grant Privileges Between Users
GRANT vac_anonymous TO vac_postgraphile;
GRANT vac_user TO vac_postgraphile;