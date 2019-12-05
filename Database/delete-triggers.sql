-- Note, these are triggers that fire on deletes, NOT to actually delete triggers.
-- Project
DROP TRIGGER IF EXISTS delete_project ON public.project;

CREATE OR REPLACE FUNCTION public.add_job_delete_project() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_project', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_project BEFORE DELETE ON public.project
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_project();

-- Project Comment
DROP TRIGGER IF EXISTS delete_project_comment ON public.project_comment;

CREATE OR REPLACE FUNCTION public.add_job_delete_project_comment() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_project_comment', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_project_comment BEFORE DELETE ON public.project_comment
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_project_comment();

-- Project Follow
DROP TRIGGER IF EXISTS delete_project_follow ON public.project_follow;

CREATE OR REPLACE FUNCTION public.add_job_delete_project_follow() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_project_follow', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_project_follow BEFORE DELETE ON public.project_follow
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_project_follow();

-- Project member
DROP TRIGGER IF EXISTS delete_project_member ON public.project_member;

CREATE OR REPLACE FUNCTION public.add_job_delete_project_member() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_project_member', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_project_member BEFORE DELETE ON public.project_member
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_project_member();

-- Project member request
DROP TRIGGER IF EXISTS delete_project_member_request ON public.project_member_request;

CREATE OR REPLACE FUNCTION public.add_job_delete_project_member_request() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_project_member_request', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_project_member_request BEFORE INSERT ON public.project_member_request
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_project_member_request();

-- Project user
DROP TRIGGER IF EXISTS delete_user ON public.user;

CREATE OR REPLACE FUNCTION public.add_job_delete_user() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_user', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_user BEFORE INSERT ON public.user
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_user();

-- Project user image
DROP TRIGGER IF EXISTS delete_user_image ON public.user_image;

CREATE OR REPLACE FUNCTION public.add_job_delete_user_image() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_user_image', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_user_image BEFORE INSERT ON public.user_image
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_user_image();

-- Project user_location
DROP TRIGGER IF EXISTS delete_user_location ON public.user_location;

CREATE OR REPLACE FUNCTION public.add_job_delete_user_location() RETURNS trigger AS $$
BEGIN
    PERFORM app_jobs.add_job('delete_user_location', row_to_json(OLD));
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_user_location BEFORE INSERT ON public.user_location
    FOR EACH ROW EXECUTE PROCEDURE public.add_job_delete_user_location();

-- Permissions
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA app_jobs TO vac_user, vac_anonymous;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vac_user, vac_anonymous;