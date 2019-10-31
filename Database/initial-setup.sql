-- Roles to create: vac_postgraphile, vac_anonymous, vac_user

-- Creating Extensions
CREATE EXTENSION IF NOT EXISTS uuid-ossp;
CREATE EXTENSION IF NOT EXISTS pgcrypto; 

-- Creating Schemas
CREATE SCHEMA private;

-- Schema permissions
GRANT USAGE ON SCHEMA public TO vac_user, vac_anonymous;

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
	created_at TIMESTAMP DEFAULT NOW(),
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
	created_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT project_pk PRIMARY KEY (project_id)
);

CREATE TABLE public.project_comment (
	comment_id SERIAL NOT NULL,
	commenter_id BIGINT NOT NULL,
	project_id BIGINT(3000) NOT NULL,
	content VARCHAR(3000) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT project_comment_pk PRIMARY KEY (comment_id)
);

CREATE TABLE public.project_follow (
	follow_id SERIAL NOT NULL,
	follower_id SERIAL NOT NULL,
	project_id SERIAL NOT NULL,
	CONSTRAINT project_follow_pk PRIMARY KEY (follow_id)
);

CREATE TABLE public.project_member_requests (
	request_id SERIAL NOT NULL,
	user_id BIGINT NOT NULL,
	project_id BIGINT NOT NULL,
	is_rejected bool NOT NULL DEFAULT 'false',
	is_accepted bool NOT NULL DEFAULT 'false',
	request_time TIMESTAMP NOT NULL,
	response_time bool,
	CONSTRAINT project_member_requests_pk PRIMARY KEY (request_id)
	CONSTRAINT one_per_user_per_project UNIQUE (user_id, project_id)
);

CREATE TABLE public.project_member (
	user_id BIGINT NOT NULL,
	project_id BIGING NOT NULL,
	join_time TIMESTAMP DEFAULT NOW()
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
COMMENT ON TABLE public.project_follow IS 'A user following a project';
COMMENT ON TABLE public.project_member_request IS 'A user request to be a part of a project';

-- Permissions: user
ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;
CREATE POLICY select_user ON public.user FOR SELECT
	USING (true);
    
CREATE POLICY update_user ON public.user FOR UPDATE TO user
	USING (user_id = current_setting('jwt.claims.user_id')::INTEGER);
   
GRANT SELECT ON public.user TO vac_user, vac_anonymous;
GRANT UPDATE ON public.user TO vac_user;

-- Permissions: user_image
ALTER TABLE public.user_image ENABLE ROW LEVEL SECURITY; 
CREATE POLICY select_user_image ON public.user_image FOR SELECT
  USING (true);

CREATE POLICY insert_user_image ON public.user_image FOR INSERT
  WITH CHECK (user_image.user_id = current_setting('jwt.claims.user_id')::INTEGER);

CREATE POLICY delete_user_image ON public.user_image FOR DELETE
  WITH CHECK (user_image.user_id = current_setting('jwt.claims.user_id')::INTEGER); 

GRANT SELECT ON public.user_image TO vac_user, vac_anonymous;
GRANT INSERT, DELETE ON public.user_image TO vac_user;

-- Permissions: user_location
ALTER TABLE public.user_location ENABLE ROW LEVEL SECURITY; 
CREATE POLICY select_user_location ON public.user_location FOR SELECT
  USING (true);

CREATE POLICY insert_user_location ON public.user_location FOR INSERT
  WITH CHECK (user_location.user_id = current_setting('jwt.claims.user_id')::INTEGER); 

GRANT SELECT ON public.user_location TO vac_user, vac_anonymous;
GRANT INSERT ON public.user_location TO vac_user;

-- Permissions: project_follow
ALTER TABLE public.project_follow ENABLE ROW LEVEL SECURITY; 
CREATE POLICY select_project_follow ON public.project_follow FOR SELECT
  USING (true);

CREATE POLICY all_project_follow ON public.project_follow
  USING (project_follow.follower_id = current_setting('jwt.claims.user_id')::INTEGER); 

GRANT SELECT ON public.project_follow TO vac_user, vac_anonymous;
GRANT UPDATE, INSERT, DELETE ON public.project_follow TO vac_user;

-- Permissions: project
ALTER TABLE public.project ENABLE ROW LEVEL SECURITY; 
CREATE POLICY select_project ON public.project FOR SELECT
  USING (true);

CREATE POLICY insert_project ON public.project FOR INSERT
  WITH CHECK (project.owner_id = current_setting('jwt.claims.user_id')::INTEGER); 

GRANT SELECT ON public.user_location TO vac_user, vac_anonymous;
GRANT INSERT ON public.user_location TO vac_user;

-- Permissions: project_comment
ALTER TABLE public.project_comment ENABLE ROW LEVEL SECURITY;
CREATE POLICY select_project_comment ON public.project_comment FOR SELECT 
	USING (true);
    
CREATE POLICY insert_project_comment ON public.project_comment FOR INSERT
    WITH CHECK (project_comment.commenter_id = current_setting('jwt.claims.user_id')::INTEGER);

CREATE POLICY update_project_comment ON public.project_comment FOR UPDATE
	USING (project_comment.commenter_id = current_setting('jwt.claims.user_id')::INTEGER);

CREATE POLICY delete_project_comment ON public.project_comment FOR DELETE
	USING (project_comment.commenter_id = current_setting('jwt.claims.user_id')::INTEGER);

-- Permissions: project_member_request
ALTER TABLE public.project_member_request ENABLE ROW LEVEL SECURITY;
CREATE POLICY select_project_member_request ON public.project_member_request FOR SELECT
	USING (
		SELECT project.owner_id 
		FROM public.project 
		WHERE project.project_id = select_project_member_request.project_id
	) = current_setting('jwt.claims.user_id')::INTEGER);

CREATE POLICY insert_project_member_request ON public.project_member_request FOR INSERT
	WITH CHECK (
		-- You can insert your own requests unless you already a part of the project
		project_member_request.user_id = current_setting('jwt.claims.user_id')::INTEGER
		AND SELECT NOT EXISTS(
			SELECT 1 FROM public.project_member
			WHERE project_member.project_id=project_member_request.project_id
			AND project_member.user_id=current_setting('jwt.claims.user_id')::INTEGER
		)
	);

CREATE POLICY update_project_member_request ON public.project_member_request FOR UPDATE
	USING (
		-- Own request
		project_member_request.user_id = current_setting('jwt.claims.user_id')::INTEGER
		-- Project owner
		OR (
			SELECT project.owner_id 
			FROM public.project 
			WHERE project.project_id = select_project_member_request.project_id
		) = current_setting('jwt.claims.user_id')::INTEGER);
	);

GRANT SELECT, UPDATE, INSERT ON public.project_member_request TO vac_user;

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

-- Function permissions
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM public;
GRANT EXECUTE ON FUNCTION public.register_user(TEXT, TEXT, TEXT, TEXT) TO vac_anonymous;

-- Grant Privileges Between Users
GRANT vac_anonymous TO vac_postgraphile;
GRANT vac_user TO vac_postgraphile;